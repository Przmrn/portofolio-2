/*!
 * VANTA.TOPOLOGY v0.5.24 — p5-based flow-field effect.
 *
 * Cleaned & formatted from the minified vendor bundle. Line breaks and
 * indentation restored; identifiers intentionally kept as-is so the logic
 * stays byte-for-byte equivalent to the original.
 *
 * Behaviour patches (motion fixes, marked PATCH below):
 *  - PATCH 1: fade the canvas every frame so trails never saturate static.
 *  - PATCH 2: rotate sampled flow vectors over time so the field evolves.
 *
 * Upstream: https://github.com/tengbao/vanta (MIT)
 */
(function (root, factory) {
  if (typeof exports === "object" && typeof module === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    exports._vantaEffect = factory();
  } else {
    root._vantaEffect = factory();
  }
})(
  typeof self !== "undefined" ? self : this,
  () =>
    (() => {
      "use strict";

      // ---- minimal bundler helpers (kept verbatim) ----
      var e = {
        d: (t, s) => {
          for (var i in s) {
            if (e.o(s, i) && !e.o(t, i)) {
              Object.defineProperty(t, i, { enumerable: true, get: s[i] });
            }
          }
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
        r: (e) => {
          if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
          }
          Object.defineProperty(e, "__esModule", { value: true });
        },
      };
      var t = {};
      e.r(t);
      e.d(t, { default: () => u });

      // ---- shared helpers ----
      Number.prototype.clamp = function (e, t) {
        return Math.min(Math.max(this, e), t);
      };

      // number (e.g. 0xbebebe) -> "#bebebe"; strings pass through
      const s = (e) =>
        typeof e === "number"
          ? "#" + ("00000" + e.toString(16)).slice(-6)
          : e;

      // deep-dispose a three.js scene graph (used by destroy())
      function i(e) {
        for (; e.children && e.children.length > 0; ) {
          i(e.children[0]);
          e.remove(e.children[0]);
        }
        if (e.geometry) {
          e.geometry.dispose();
        }
        if (e.material) {
          Object.keys(e.material).forEach((t) => {
            if (
              e.material[t] &&
              e.material[t] !== null &&
              typeof e.material[t].dispose === "function"
            ) {
              e.material[t].dispose();
            }
          });
          e.material.dispose();
        }
      }

      // ---- globals / registry ----
      const o = typeof window === "object";
      let n = (o && window.THREE) || {};
      if (o && !window.VANTA) {
        window.VANTA = {};
      }
      const r = (o && window.VANTA) || {};
      r.register = (e, t) => (r[e] = (e) => new t(e));
      r.version = "0.5.24";

      const h = function () {
        Array.prototype.unshift.call(arguments, "[VANTA]");
        return console.error.apply(this, arguments);
      };

      // ================================================================
      // VantaBase — lifecycle shared by every effect (three.js or p5)
      // ================================================================
      r.VantaBase = class {
        constructor(e = {}) {
          if (!o) {
            return false;
          }
          r.current = this;

          this.windowMouseMoveWrapper =
            this.windowMouseMoveWrapper.bind(this);
          this.windowTouchWrapper = this.windowTouchWrapper.bind(this);
          this.windowGyroWrapper = this.windowGyroWrapper.bind(this);
          this.resize = this.resize.bind(this);
          this.animationLoop = this.animationLoop.bind(this);
          this.restart = this.restart.bind(this);

          const t =
            typeof this.getDefaultOptions === "function"
              ? this.getDefaultOptions()
              : this.defaultOptions;
          this.options = Object.assign(
            {
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200,
              minWidth: 200,
              scale: 1,
              scaleMobile: 1,
            },
            t
          );

          if (e instanceof HTMLElement || typeof e === "string") {
            e = { el: e };
          }
          Object.assign(this.options, e);

          if (this.options.THREE) {
            n = this.options.THREE;
          }
          this.el = this.options.el;

          if (this.el == null) {
            h('Instance needs "el" param!');
          } else if (!(this.options.el instanceof HTMLElement)) {
            const selector = this.el;
            this.el = document.querySelector(selector);
            if (!this.el) {
              h("Cannot find element", selector);
              return;
            }
          }

          this.prepareEl();
          this.initThree();
          this.setSize();

          try {
            this.init();
          } catch (e) {
            h("Init error", e);
            if (this.renderer && this.renderer.domElement) {
              this.el.removeChild(this.renderer.domElement);
            }
            if (this.options.backgroundColor) {
              console.log("[VANTA] Falling back to backgroundColor");
              this.el.style.background = s(this.options.backgroundColor);
            }
            return;
          }

          this.initMouse();
          this.resize();
          this.animationLoop();

          const add = window.addEventListener;
          add("resize", this.resize);
          window.requestAnimationFrame(this.resize);

          if (this.options.mouseControls) {
            add("scroll", this.windowMouseMoveWrapper);
            add("mousemove", this.windowMouseMoveWrapper);
          }
          if (this.options.touchControls) {
            add("touchstart", this.windowTouchWrapper);
            add("touchmove", this.windowTouchWrapper);
          }
          if (this.options.gyroControls) {
            add("deviceorientation", this.windowGyroWrapper);
          }
        }

        setOptions(e = {}) {
          Object.assign(this.options, e);
          this.triggerMouseMove();
        }

        // Wrap stray text nodes and lift children above the canvas.
        prepareEl() {
          if (typeof Node !== "undefined" && Node.TEXT_NODE) {
            for (let e = 0; e < this.el.childNodes.length; e++) {
              const textNode = this.el.childNodes[e];
              if (textNode.nodeType === Node.TEXT_NODE) {
                const wrapper = document.createElement("span");
                wrapper.textContent = textNode.textContent;
                textNode.parentElement.insertBefore(wrapper, textNode);
                textNode.remove();
              }
            }
          }
          for (let e = 0; e < this.el.children.length; e++) {
            const child = this.el.children[e];
            if (getComputedStyle(child).position === "static") {
              child.style.position = "relative";
            }
            if (getComputedStyle(child).zIndex === "auto") {
              child.style.zIndex = 1;
            }
          }
          if (getComputedStyle(this.el).position === "static") {
            this.el.style.position = "relative";
          }
        }

        applyCanvasStyles(canvas, extra = {}) {
          Object.assign(canvas.style, {
            position: "absolute",
            zIndex: 0,
            top: 0,
            left: 0,
            background: "",
          });
          Object.assign(canvas.style, extra);
          canvas.classList.add("vanta-canvas");
        }

        initThree() {
          if (n.WebGLRenderer) {
            this.renderer = new n.WebGLRenderer({
              alpha: true,
              antialias: true,
            });
            this.el.appendChild(this.renderer.domElement);
            this.applyCanvasStyles(this.renderer.domElement);
            if (isNaN(this.options.backgroundAlpha)) {
              this.options.backgroundAlpha = 1;
            }
            this.scene = new n.Scene();
          } else {
            // p5-based effects (like TOPOLOGY) don't need three.js.
            console.warn("[VANTA] No THREE defined on window");
          }
        }

        getCanvasElement() {
          if (this.renderer) {
            return this.renderer.domElement;
          }
          if (this.p5renderer) {
            return this.p5renderer.canvas;
          }
          return void 0;
        }

        getCanvasRect() {
          const canvas = this.getCanvasElement();
          return !!canvas && canvas.getBoundingClientRect();
        }

        windowMouseMoveWrapper(e) {
          const rect = this.getCanvasRect();
          if (!rect) {
            return false;
          }
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
            this.mouseX = x;
            this.mouseY = y;
            if (!this.options.mouseEase) {
              this.triggerMouseMove(x, y);
            }
          }
        }

        windowTouchWrapper(e) {
          const rect = this.getCanvasRect();
          if (!rect) {
            return false;
          }
          if (e.touches.length === 1) {
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
              this.mouseX = x;
              this.mouseY = y;
              if (!this.options.mouseEase) {
                this.triggerMouseMove(x, y);
              }
            }
          }
        }

        windowGyroWrapper(e) {
          const rect = this.getCanvasRect();
          if (!rect) {
            return false;
          }
          const x = Math.round(2 * e.alpha) - rect.left;
          const y = Math.round(2 * e.beta) - rect.top;
          if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
            this.mouseX = x;
            this.mouseY = y;
            if (!this.options.mouseEase) {
              this.triggerMouseMove(x, y);
            }
          }
        }

        triggerMouseMove(e, t) {
          if (e === void 0 && t === void 0) {
            if (this.options.mouseEase) {
              e = this.mouseEaseX;
              t = this.mouseEaseY;
            } else {
              e = this.mouseX;
              t = this.mouseY;
            }
          }
          if (this.uniforms) {
            this.uniforms.iMouse.value.x = e / this.scale;
            this.uniforms.iMouse.value.y = t / this.scale;
          }
          const nx = e / this.width;
          const ny = t / this.height;
          if (typeof this.onMouseMove === "function") {
            this.onMouseMove(nx, ny);
          }
        }

        setSize() {
          if (!this.scale) {
            this.scale = 1;
          }
          const isMobile =
            typeof navigator !== "undefined" &&
            (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            ) ||
              window.innerWidth < 600);
          if (isMobile && this.options.scaleMobile) {
            this.scale = this.options.scaleMobile;
          } else if (this.options.scale) {
            this.scale = this.options.scale;
          }
          this.width = Math.max(this.el.offsetWidth, this.options.minWidth);
          this.height = Math.max(this.el.offsetHeight, this.options.minHeight);
        }

        initMouse() {
          const atDefault =
            (!this.mouseX && !this.mouseY) ||
            (this.mouseX === this.options.minWidth / 2 &&
              this.mouseY === this.options.minHeight / 2);
          if (atDefault) {
            this.mouseX = this.width / 2;
            this.mouseY = this.height / 2;
            this.triggerMouseMove(this.mouseX, this.mouseY);
          }
        }

        resize() {
          this.setSize();
          if (this.camera) {
            this.camera.aspect = this.width / this.height;
            if (typeof this.camera.updateProjectionMatrix === "function") {
              this.camera.updateProjectionMatrix();
            }
          }
          if (this.renderer) {
            this.renderer.setSize(this.width, this.height);
            this.renderer.setPixelRatio(window.devicePixelRatio / this.scale);
          }
          if (typeof this.onResize === "function") {
            this.onResize();
          }
        }

        isOnScreen() {
          const h = this.el.offsetHeight;
          const rect = this.el.getBoundingClientRect();
          const scrollTop =
            window.pageYOffset ||
            (document.documentElement || document.body.parentNode || document.body)
              .scrollTop;
          const elTop = rect.top + scrollTop;
          return (
            elTop - window.innerHeight <= scrollTop && scrollTop <= elTop + h
          );
        }

        animationLoop() {
          if (!this.t) {
            this.t = 0;
          }
          if (!this.t2) {
            this.t2 = 0;
          }
          const now = performance.now();
          if (this.prevNow) {
            let frameDelta = (now - this.prevNow) / (1e3 / 60);
            frameDelta = Math.max(0.2, Math.min(frameDelta, 5));
            this.t += frameDelta;
            this.t2 += (this.options.speed || 1) * frameDelta;
            if (this.uniforms) {
              this.uniforms.iTime.value = 0.016667 * this.t2;
            }
          }
          this.prevNow = now;

          if (this.options.mouseEase) {
            this.mouseEaseX = this.mouseEaseX || this.mouseX || 0;
            this.mouseEaseY = this.mouseEaseY || this.mouseY || 0;
            if (
              Math.abs(this.mouseEaseX - this.mouseX) +
                Math.abs(this.mouseEaseY - this.mouseY) >
              0.1
            ) {
              this.mouseEaseX += 0.05 * (this.mouseX - this.mouseEaseX);
              this.mouseEaseY += 0.05 * (this.mouseY - this.mouseEaseY);
              this.triggerMouseMove(this.mouseEaseX, this.mouseEaseY);
            }
          }

          if (this.isOnScreen() || this.options.forceAnimate) {
            if (typeof this.onUpdate === "function") {
              this.onUpdate();
            }
            if (this.scene && this.camera) {
              this.renderer.render(this.scene, this.camera);
              this.renderer.setClearColor(
                this.options.backgroundColor,
                this.options.backgroundAlpha
              );
            }
            if (this.fps && this.fps.update) {
              this.fps.update();
            }
            if (typeof this.afterRender === "function") {
              this.afterRender();
            }
          }
          this.req = window.requestAnimationFrame(this.animationLoop);
        }

        restart() {
          if (this.scene) {
            while (this.scene.children.length) {
              this.scene.remove(this.scene.children[0]);
            }
          }
          if (typeof this.onRestart === "function") {
            this.onRestart();
          }
          this.init();
        }

        init() {
          if (typeof this.onInit === "function") {
            this.onInit();
          }
        }

        destroy() {
          if (typeof this.onDestroy === "function") {
            this.onDestroy();
          }
          const remove = window.removeEventListener;
          remove("touchstart", this.windowTouchWrapper);
          remove("touchmove", this.windowTouchWrapper);
          remove("scroll", this.windowMouseMoveWrapper);
          remove("mousemove", this.windowMouseMoveWrapper);
          remove("deviceorientation", this.windowGyroWrapper);
          remove("resize", this.resize);
          window.cancelAnimationFrame(this.req);

          const scene = this.scene;
          if (scene && scene.children) {
            i(scene);
          }
          if (this.renderer) {
            if (this.renderer.domElement) {
              this.el.removeChild(this.renderer.domElement);
            }
            this.renderer = null;
            this.scene = null;
          }
          if (r.current === this) {
            r.current = null;
          }
        }
      };

      // ================================================================
      // p5-based effect base (canvas + lifecycle around a p5 instance)
      // ================================================================
      const VantaBase = r.VantaBase;
      let p5ref = (typeof window === "object" && window.p5) || false;

      class P5Base extends VantaBase {
        constructor(e) {
          p5ref = e.p5 || p5ref;
          super(e);
          this.mode = "p5";
        }

        initP5(p5instance) {
          const effect = this;
          const canvas = p5instance.createCanvas(effect.width, effect.height);
          canvas.parent(effect.el);
          effect.applyCanvasStyles(p5instance.canvas, {
            background: s(effect.options.backgroundColor),
          });
          effect.p5renderer = canvas;
          effect.p5canvas = p5instance.canvas;
          effect.p5 = p5instance;
        }

        restart() {
          if (this.p5 && typeof this.p5 === "object") {
            this.p5.remove();
          }
          super.restart();
        }

        destroy() {
          if (this.p5 && typeof this.p5 === "object") {
            this.p5.remove();
          }
          super.destroy();
        }

        resize() {
          super.resize();
          if (this.p5 && this.p5.resizeCanvas) {
            this.p5.resizeCanvas(this.width, this.height);
          }
        }
      }

      // ================================================================
      // TOPOLOGY — flow-field particles over drifting noise
      // ================================================================
      let TopologyP5 = (typeof window === "object" && window.p5) || false;

      class Topology extends P5Base {
        static initClass() {
          this.prototype.p5 = true;
          this.prototype.defaultOptions = {
            color: 9016910,
            backgroundColor: 8738,
          };
        }

        constructor(e) {
          TopologyP5 = e.p5 || TopologyP5;
          super(e);
        }

        onInit() {
          const effect = this;

          new TopologyP5(function (t) {
            let effectW = effect.width;
            let effectH = effect.height;
            let cols = (effectW + 200) / 10;
            let rows = (effectH + 200) / 10;
            let flowGrid = [];
            let particles = [];
            let time = 0;

            // Sample the noise field around a circle and return the
            // dominant gradient direction at (x, y).
            function sampleFlow(x, y, radius) {
              let strongest = 0;
              let weakest = 1;
              let peak = t.createVector(0, 0);
              let trough = t.createVector(0, 0);
              for (let a = 0; a < 100; a++) {
                const angle = (a / 100) * t.TAU;
                const probe = t.createVector(
                  x + t.cos(angle) * radius,
                  y + t.sin(angle) * radius
                );
                const value = t.noise(probe.x, probe.y);
                if (value > strongest) {
                  strongest = value;
                  peak.x = probe.x;
                  peak.y = probe.y;
                }
                if (value < weakest) {
                  weakest = value;
                  trough.x = probe.x;
                  trough.y = probe.y;
                }
              }
              const flow = t.createVector(
                trough.x - peak.x,
                trough.y - peak.y
              );
              flow.normalize().mult(strongest - weakest);
              return flow;
            }

            // Positive modulo (always >= 0).
            function wrap(value, max) {
              return ((value % max) + max) % max;
            }

            t.setup = function () {
              effect.initP5(t);
              t.smooth();
              t.noStroke();

              // Seed the particle swarm.
              (function seedParticles() {
                for (let e = 0; e < 4500; e++) {
                  const sx = t.random(t.width + 200);
                  const sy = t.random(t.height + 200);
                  particles.push({
                    prev: t.createVector(sx, sy),
                    pos: t.createVector(sx, sy),
                    vel: t.createVector(0, 0),
                    acc: t.createVector(0, 0),
                    col: t.random(255),
                    seed: e,
                  });
                }
              })();

              // Precompute the static flow grid (10px cells + margin).
              (function buildFlowGrid() {
                for (let row = 0; row < rows; row++) {
                  const cells = [];
                  for (let col = 0; col < cols; col++) {
                    cells.push(sampleFlow(0.003 * col, 0.003 * row, 0.1));
                  }
                  flowGrid.push(cells);
                }
              })();
            };

            t.draw = function () {
              // PATCH 1 — fade previous trails every frame so the canvas
              // never saturates into a static image.
              t.background(255, 255, 255, 7);

              t.translate(-100, -100);

              // Advance every particle along the flow field.
              (function updateParticles() {
                for (let i = 0; i < 4500; i++) {
                  const p = particles[i];
                  const gx = t.constrain(p.pos.x, 0, t.width + 200);
                  const gy = t.constrain(p.pos.y, 0, t.height + 200);
                  // FIX — clamp into the grid: the canvas may grow after
                  // the grid was built once in setup (window resize /
                  // rotation). Without this the lookup returns undefined
                  // and reading .x throws.
                  const col = t.constrain(t.floor(gx / 10), 0, cols - 1);
                  const row = t.constrain(t.floor(gy / 10), 0, rows - 1);
                  const rowCells = flowGrid[row];
                  // Last-resort guard: coast straight instead of throwing
                  // even if the grid is somehow stale.
                  const flow =
                    (rowCells && rowCells[col]) || t.createVector(0, 0);

                  p.prev.x = p.pos.x;
                  p.prev.y = p.pos.y;

                  // PATCH 2 — rotate the sampled flow vector over time so
                  // the field keeps evolving instead of repeating itself.
                  const angled = t.createVector(
                    flow.x * t.cos(2 * time) - flow.y * t.sin(2 * time),
                    flow.x * t.sin(2 * time) + flow.y * t.cos(2 * time)
                  );

                  p.pos.x = wrap(p.pos.x + p.vel.x, t.width + 200);
                  p.pos.y = wrap(p.pos.y + p.vel.y, t.height + 200);
                  p.vel.add(p.acc).normalize().mult(2.2);
                  p.acc = t.createVector(0, 0);
                  p.acc.add(angled).mult(3);
                }
              })();

              // Stroke the segments the particles just travelled.
              (function drawParticles() {
                t.strokeWeight(1);
                t.stroke(hexToRgba(effect.options.color, 0.05));
                for (let e = 0; e < particles.length; e++) {
                  const dist = TopologyP5.Vector.dist(
                    particles[e].prev,
                    particles[e].pos
                  );
                  if (dist < 10) {
                    t.line(
                      particles[e].prev.x,
                      particles[e].prev.y,
                      particles[e].pos.x,
                      particles[e].pos.y
                    );
                  }
                }
              })();

              time += 0.002;
            };

            // "#bebebe" + alpha -> "rgba(190,190,190,alpha)"
            function hexToRgba(hexNumber, alpha = 1) {
              const hex = s(hexNumber);
              const match =
                /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
              const rgb = match
                ? {
                    r: parseInt(match[1], 16),
                    g: parseInt(match[2], 16),
                    b: parseInt(match[3], 16),
                  }
                : null;
              return (
                "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + alpha + ")"
              );
            }
          });
        }
      }
      Topology.initClass();

      const u = r.register("TOPOLOGY", Topology);
      return t;
    })()
);
