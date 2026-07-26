"use client";

import { useRef, useState, useCallback, useEffect, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { usePageContext } from "./FullPageScroll";
import * as THREE from "three";

const emptySubscribe = () => () => {};
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/* ── THREE.Timer Wrapper (Replaces deprecated THREE.Clock) ───────── */
class TimerWrapper {
  constructor() {
    this.timer = new THREE.Timer();
    this.autoStart = true;
    this.running = true;
  }
  get elapsedTime() {
    this.timer.update();
    return this.timer.getElapsed();
  }
  getElapsedTime() {
    this.timer.update();
    return this.timer.getElapsed();
  }
  getDelta() {
    this.timer.update();
    return this.timer.getDelta();
  }
  start() {
    this.timer.reset();
  }
  stop() {}
}

/* ── 3D Cord & Handle Mesh Scene ──────────────────────────────────── */
function SwitchScene({ pullProgress, dragging, pulled }) {
  const handleRef = useRef();
  const cordRef = useRef();
  const glowRef = useRef();

  const currentPull = useRef(0);
  const targetPull = useRef(0);

  useFrame((state, delta) => {
    targetPull.current = pullProgress;

    // Lerp pull value for natural spring elasticity
    currentPull.current = THREE.MathUtils.lerp(
      currentPull.current,
      targetPull.current,
      dragging ? 0.35 : 0.15
    );

    const pullY = -currentPull.current * 1.8;

    if (handleRef.current) {
      handleRef.current.position.y = 1.0 + pullY;

      // Realistic 3D rotation & wobble
      if (!pulled) {
        const elapsed = state.clock.elapsedTime || state.clock.getElapsedTime();
        handleRef.current.rotation.x = THREE.MathUtils.lerp(
          handleRef.current.rotation.x,
          dragging ? 0.35 : Math.sin(elapsed * 2) * 0.08,
          0.1
        );
        handleRef.current.rotation.z = THREE.MathUtils.lerp(
          handleRef.current.rotation.z,
          Math.cos(elapsed * 1.5) * 0.05,
          0.1
        );
        handleRef.current.rotation.y += delta * (dragging ? 2.5 : 0.6);
      }
    }

    // Stretch 3D cord
    if (cordRef.current) {
      const cordLen = 2.2 + Math.abs(pullY);
      cordRef.current.scale.set(1, cordLen, 1);
      cordRef.current.position.y = 2.2 - cordLen / 2;
    }

    // Acid-lime point light intensity under tension
    if (glowRef.current) {
      glowRef.current.intensity = THREE.MathUtils.lerp(
        glowRef.current.intensity,
        0.4 + currentPull.current * 4.5,
        0.2
      );
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -2, -3]} intensity={0.9} color="#ebff00" />
      <pointLight
        ref={glowRef}
        position={[0, 0, 0.5]}
        color="#ebff00"
        intensity={0.5}
        distance={6}
      />

      {/* Ceiling Mount / Anchor */}
      <mesh position={[0, 2.25, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.1, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* 3D Stretching Cord */}
      <mesh ref={cordRef} position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.03, 0.035, 1, 16]} />
        <meshStandardMaterial
          color="#ebff00"
          emissive="#ebff00"
          emissiveIntensity={0.35}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* 3D Brutalist Metallic Torus Handle */}
      <group ref={handleRef} position={[0, 1.0, 0]}>
        {/* Outer Heavy Metallic Ring */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[0.45, 0.12, 32, 64]} />
          <meshStandardMaterial
            color="#222222"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* Inner Glowing Acid-Lime Inset Ring */}
        <mesh>
          <torusGeometry args={[0.45, 0.04, 16, 32]} />
          <meshBasicMaterial color="#ebff00" />
        </mesh>

        {/* Central Wireframe Crystal Core */}
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.22, 2]} />
          <meshStandardMaterial
            color="#ebff00"
            emissive="#ebff00"
            emissiveIntensity={0.85}
            wireframe
          />
        </mesh>
      </group>
    </group>
  );
}

/* ── Main PullSwitch Component ─────────────────────────────────────── */
export default function PullSwitch() {
  const { current, total, goTo } = usePageContext();
  const isLastPage = current === total - 1;

  const mounted = useHasMounted();
  const [dragging, setDragging] = useState(false);
  const [pulled, setPulled] = useState(false);
  const [pullProgress, setPullProgress] = useState(0); // 0.0 to 1.0
  const [customClock] = useState(() => new TimerWrapper());

  const dragStartY = useRef(0);

  const PULL_THRESHOLD = 90; // px to trigger
  const MAX_PULL = 130; // px max drag

  const onPullComplete = useCallback(() => {
    setPulled(true);

    setTimeout(() => {
      goTo(0);
      setTimeout(() => {
        setPulled(false);
        setPullProgress(0);
      }, 1000);
    }, 400);
  }, [goTo]);

  const handlePointerDown = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
    dragStartY.current = e.clientY;

    if (e.target.setPointerCapture) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch {
        /* fallback */
      }
    }
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      if (!dragging || pulled) return;

      const delta = e.clientY - dragStartY.current;
      const rawPull = Math.max(0, Math.min(delta, MAX_PULL));
      const progress = rawPull / PULL_THRESHOLD;

      setPullProgress(progress);
    },
    [dragging, pulled]
  );

  const handlePointerUp = useCallback(() => {
    if (!dragging) return;
    setDragging(false);

    if (pullProgress >= 1.0 && !pulled) {
      onPullComplete();
    } else {
      setPullProgress(0);
    }
  }, [dragging, pullProgress, pulled, onPullComplete]);

  if (!isLastPage || !mounted) return null;

  return (
    <div
      className="pull-switch-3d"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: "fixed",
        bottom: 10,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 150,
        width: 180,
        height: 190,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        touchAction: "none",
        userSelect: "none",
        cursor: dragging ? "grabbing" : "grab",
      }}
    >
      {/* Label */}
      <span
        className="label-mono--xs"
        style={{
          position: "absolute",
          top: 10,
          color: "#ebff00",
          opacity: pullProgress >= 1 ? 1 : 0.5 + pullProgress * 0.5,
          letterSpacing: "0.12em",
          pointerEvents: "none",
          transition: "opacity 0.2s, transform 0.2s",
          transform: pullProgress >= 1 ? "scale(1.1)" : "scale(1)",
          textShadow: pullProgress >= 1 ? "0 0 10px rgba(235,255,0,0.8)" : "none",
        }}
      >
        {pulled ? "SNAPPING ↻" : pullProgress >= 1 ? "RELEASE ↻" : "PULL ↓"}
      </span>

      {/* 3D Canvas */}
      <div style={{ width: "100%", height: 160, pointerEvents: "none" }}>
        <Canvas
          clock={customClock}
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <SwitchScene
            pullProgress={pullProgress}
            dragging={dragging}
            pulled={pulled}
          />
        </Canvas>
      </div>
    </div>
  );
}
