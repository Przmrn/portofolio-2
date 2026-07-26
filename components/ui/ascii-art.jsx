"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useId,
} from "react";
import { motion, useInView } from "framer-motion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const ASCII_CHARSETS = {
  standard: " .,:;i1tfLCG08@",
  blocks: " ░▒▓█",
  binary: " 01",
  dots: " ·•●",
  minimal: " .:░▒",
  dense: " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  arrows: " ←↑→↓↔↕↖↗↘↙",
  stars: " ·✦✧★",
  hash: " -=#",
  pipes: " |/─\\│",
  braille: " ⠁⠃⠇⠏⠟⠿⡿⣿",
  circles: " ○◔◑◕●",
  squares: " ▢▣▤▥▦▧▨▩",
  hearts: " ♡♥",
  math: " +-×÷=≠≈∞",
  brutalist: " .:-=+*#%@",
  clean: "  .:+#@",
};

const isCharsetPreset = (value) => {
  return value in ASCII_CHARSETS;
};

const resolveCharset = (charset) => {
  if (isCharsetPreset(charset)) {
    return ASCII_CHARSETS[charset];
  }
  return charset;
};

const resolveCssColor = (color, element) => {
  if (!color) return color;

  if (color.startsWith("var(")) {
    if (!element) return "#ffffff";

    const tempDiv = document.createElement("div");
    tempDiv.style.color = color;
    element.appendChild(tempDiv);
    const computedColor = getComputedStyle(tempDiv).color;
    element.removeChild(tempDiv);
    return computedColor || "#ffffff";
  }

  return color;
};

const parseColor = (colorStr) => {
  if (!colorStr) return { r: 255, g: 255, b: 255 };

  if (colorStr.startsWith("#")) {
    let hex = colorStr.slice(1);
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("");
    }
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  }

  const rgbMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }

  const colors = {
    black: { r: 0, g: 0, b: 0 },
    white: { r: 255, g: 255, b: 255 },
    red: { r: 255, g: 0, b: 0 },
    green: { r: 0, g: 255, b: 0 },
    blue: { r: 0, g: 0, b: 255 },
    yellow: { r: 255, g: 255, b: 0 },
  };
  return colors[colorStr.toLowerCase()] || { r: 255, g: 255, b: 255 };
};

const clamp01 = (value) => Math.max(0, Math.min(1, value));

const mixRgb = (from, to, amount) => {
  const t = clamp01(amount);
  return {
    r: Math.round(from.r + (to.r - from.r) * t),
    g: Math.round(from.g + (to.g - from.g) * t),
    b: Math.round(from.b + (to.b - from.b) * t),
  };
};

const rgbToCss = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`;

const MATRIX_CHARSET = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";

export const AsciiArt = ({
  src,
  resolution = 80,
  charset = "standard",
  color = "#ffffff",
  backgroundColor = "transparent",
  inverted = false,
  colored = false,
  animated = true,
  animationStyle = "fade",
  animationDuration = 1,
  fontFamily = "monospace",
  className = "",
  style = {},
  animateOnView = true,
  objectFit = "cover",
  spotlightRadius = 180,
  spotlightColor = "#ebff00",
  hoverStrength = 24,
  fontWeight = 500,
}) => {
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    hover: 0,
    isHovered: false,
  });
  const prefersReducedMotionRef = useRef(false);
  const uniqueId = useId();
  const [asciiData, setAsciiData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const shouldStartAnimation = animated && animateOnView ? isInView : animated;
  const shouldShowStatic = !animated || animationStyle === "none";

  const resolvedCharset = resolveCharset(charset);
  const effectiveCharset = inverted
    ? resolvedCharset.split("").reverse().join("")
    : resolvedCharset;

  const defaultColor = inverted ? "#ffffff" : "#000000";
  const textColor = color || defaultColor;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      prefersReducedMotionRef.current = motionQuery.matches;
    };

    updateMotionPreference();
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", updateMotionPreference);
    } else {
      motionQuery.addListener(updateMotionPreference);
    }

    return () => {
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener("change", updateMotionPreference);
      } else {
        motionQuery.removeListener(updateMotionPreference);
      }
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (isCancelled) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Canvas context not available");
        return;
      }

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const imgAspect = imgWidth / imgHeight;
      const charAspectRatio = 0.55;

      const cols = resolution;
      const rows = Math.floor(cols * charAspectRatio);

      canvas.width = cols;
      canvas.height = rows;

      const visualAspect = 1.0;

      let sx = 0,
        sy = 0,
        sw = imgWidth,
        sh = imgHeight;

      if (objectFit === "cover") {
        if (imgAspect > visualAspect) {
          sw = imgHeight * visualAspect;
          sx = (imgWidth - sw) / 2;
        } else {
          sh = imgWidth / visualAspect;
          sy = (imgHeight - sh) / 2;
        }
      } else if (objectFit === "contain") {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, cols, rows);

        let dw, dh, dx, dy;
        if (imgAspect > visualAspect) {
          dw = cols;
          dh = (cols / imgAspect) * charAspectRatio;
          dx = 0;
          dy = (rows - dh) / 2;
        } else {
          dh = rows;
          dw = (rows * imgAspect) / charAspectRatio;
          dx = (cols - dw) / 2;
          dy = 0;
        }
        ctx.drawImage(img, dx, dy, dw, dh);
      }

      if (objectFit !== "contain") {
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      }

      let imageData;
      try {
        imageData = ctx.getImageData(0, 0, cols, rows);
      } catch (e) {
        setError("Unable to read image data (CORS issue)");
        return;
      }

      const data = imageData.data;
      const result = [];

      for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < cols; x++) {
          const idx = (y * cols + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          
          let charIndex;
          if (a < 20 || brightness > 0.94) {
            charIndex = 0;
          } else if (brightness < 0.08) {
            charIndex = effectiveCharset.length - 1;
          } else {
            charIndex = Math.floor(brightness * (effectiveCharset.length - 1));
          }

          const char = effectiveCharset[charIndex] || " ";

          row.push({ char, r, g, b });
        }
        result.push(row);
      }

      setAsciiData(result);
      setIsLoaded(true);
    };

    img.onerror = () => {
      if (isCancelled) return;
      setError("Failed to load image");
    };

    return () => {
      isCancelled = true;
    };
  }, [src, resolution, effectiveCharset, objectFit]);

  const drawCanvas = useCallback(
    (progress = 1, matrixProgress = undefined) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container || asciiData.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      if (containerWidth === 0 || containerHeight === 0) return;

      canvas.width = containerWidth * dpr;
      canvas.height = containerHeight * dpr;
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;
      ctx.scale(dpr, dpr);

      const resolvedBgColor = resolveCssColor(backgroundColor, container);
      const resolvedTextColor = resolveCssColor(textColor, container);
      const resolvedSpotlightColor = resolveCssColor(spotlightColor, container);
      const baseTextRgb = parseColor(resolvedTextColor);
      const spotlightRgb = parseColor(resolvedSpotlightColor);
      const pointer = mouseRef.current;
      const isReducedMotion = prefersReducedMotionRef.current;
      const pointerEase = isReducedMotion ? 1 : 0.16;
      const hoverEase = isReducedMotion ? 1 : 0.12;

      pointer.x += (pointer.targetX - pointer.x) * pointerEase;
      pointer.y += (pointer.targetY - pointer.y) * pointerEase;
      pointer.hover += ((pointer.isHovered ? 1 : 0) - pointer.hover) * hoverEase;

      if (pointer.hover < 0.001) {
        pointer.hover = 0;
      }

      if (resolvedBgColor !== "transparent") {
        ctx.fillStyle = resolvedBgColor;
        ctx.fillRect(0, 0, containerWidth, containerHeight);
      } else {
        ctx.clearRect(0, 0, containerWidth, containerHeight);
      }

      const rows = asciiData.length;
      const cols = asciiData[0]?.length || 0;
      if (cols === 0) return;

      const charWidth = containerWidth / cols;
      const charHeight = containerHeight / rows;
      const fontSize = Math.min(charWidth * 1.8, charHeight * 1.2);

      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const totalChars = rows * cols;
      const revealedChars = Math.floor(progress * totalChars);

      let charIndex = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const pixel = asciiData[y][x];
          const cx = x * charWidth + charWidth / 2;
          const cy = y * charHeight + charHeight / 2;

          if (animationStyle === "typewriter" && charIndex >= revealedChars) {
            charIndex++;
            continue;
          }

          let displayChar = pixel.char;
          let displayColor = colored
            ? `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`
            : resolvedTextColor;

          let drawX = cx;
          let drawY = cy;

          if (pointer.hover > 0) {
            const dx = cx - pointer.x;
            const dy = cy - pointer.y;
            const distSq = dx * dx + dy * dy;
            const radiusSq = spotlightRadius * spotlightRadius;

            if (distSq < radiusSq) {
              const dist = Math.sqrt(distSq);
              const falloff = Math.pow(1 - dist / spotlightRadius, 2);
              const hoverMix = falloff * pointer.hover;
              const push = isReducedMotion
                ? 0
                : Math.sin(hoverMix * Math.PI * 0.5) * hoverStrength;

              drawX += (dx / (dist || 1)) * push;
              drawY += (dy / (dist || 1)) * push * 0.38;

              const baseRgb = colored
                ? { r: pixel.r, g: pixel.g, b: pixel.b }
                : baseTextRgb;
              displayColor = rgbToCss(mixRgb(baseRgb, spotlightRgb, hoverMix));
            }
          }

          if (animationStyle === "matrix" && matrixProgress !== undefined) {
            const charProgress = (x * 0.02 + y * 0.01) / 2;
            if (matrixProgress < charProgress) {
              charIndex++;
              continue;
            } else if (matrixProgress < charProgress + 0.15) {
              displayChar =
                MATRIX_CHARSET[
                  Math.floor(Math.random() * MATRIX_CHARSET.length)
                ];
              displayColor = "#00ff00";
            }
          }

          ctx.fillStyle = displayColor;
          ctx.globalAlpha = animationStyle === "fade" ? progress : 1;
          ctx.fillText(displayChar, drawX, drawY);

          charIndex++;
        }
      }

      ctx.globalAlpha = 1;
    },
    [
      asciiData,
      backgroundColor,
      colored,
      textColor,
      fontFamily,
      fontWeight,
      animationStyle,
      spotlightColor,
      spotlightRadius,
      hoverStrength,
    ]
  );

  const updatePointer = useCallback((event) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const nextX = event.clientX - rect.left;
    const nextY = event.clientY - rect.top;
    const pointer = mouseRef.current;

    pointer.targetX = nextX;
    pointer.targetY = nextY;
    pointer.isHovered = true;

    if (pointer.x < -999 || pointer.y < -999) {
      pointer.x = nextX;
      pointer.y = nextY;
    }
  }, []);

  const clearPointer = useCallback(() => {
    mouseRef.current.isHovered = false;
  }, []);

  useEffect(() => {
    if (!isLoaded || asciiData.length === 0) return;

    let startTime = performance.now();
    let frameId;

    const duration =
      animationStyle === "fade"
        ? animationDuration * 1000
        : animationStyle === "typewriter"
          ? asciiData.length * asciiData[0]?.length * 2
          : animationStyle === "matrix"
            ? 3000
            : 1000;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (shouldShowStatic || !shouldStartAnimation) {
        drawCanvas(1);
      } else if (animationStyle === "matrix") {
        drawCanvas(1, progress);
      } else {
        drawCanvas(progress);
      }

      if (progress >= 1 && !hasAnimated) {
        setHasAnimated(true);
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [
    isLoaded,
    shouldStartAnimation,
    shouldShowStatic,
    animationStyle,
    animationDuration,
    drawCanvas,
    asciiData,
    hasAnimated,
  ]);

  useIsomorphicLayoutEffect(() => {
    if (!isLoaded || asciiData.length === 0) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    drawCanvas(1);
  }, [isLoaded, asciiData, drawCanvas]);

  useEffect(() => {
    if (!isLoaded || asciiData.length === 0) return;

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      drawCanvas(1);
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [isLoaded, asciiData, drawCanvas]);

  if (error) {
    return (
      <div
        className={className}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "red", fontSize: "14px", fontFamily: "monospace", ...style }}
      >
        Error: {error}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className={className}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#888", fontSize: "14px", fontFamily: "monospace", backgroundColor, ...style }}
      >
        [LOADING ASCII ART...]
      </div>
    );
  }

  const canvasElement = (
    <canvas
      key={uniqueId}
      id={`ascii-canvas-${uniqueId}`}
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
      aria-label="Interactive ASCII art rendering of image"
      role="img"
    />
  );

  if (animationStyle === "fade" && animated && !hasAnimated) {
    return (
      <motion.div
        ref={containerRef}
        className={className}
        style={{ overflow: "hidden", backgroundColor, cursor: "crosshair", ...style }}
        initial={{ opacity: 0 }}
        animate={shouldStartAnimation ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: animationDuration * 0.3 }}
        onPointerMove={updatePointer}
        onPointerEnter={updatePointer}
        onPointerLeave={clearPointer}
      >
        {canvasElement}
      </motion.div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ overflow: "hidden", backgroundColor, cursor: "crosshair", ...style }}
      onPointerMove={updatePointer}
      onPointerEnter={updatePointer}
      onPointerLeave={clearPointer}
    >
      {canvasElement}
    </div>
  );
};

export const AsciiArtStatic = (props) => {
  return <AsciiArt {...props} animated={false} animationStyle="none" />;
};
