'use client';
import { useRef, useMemo, useState, useEffect } from 'react';

/* ─── WebGL detection ─── */
function canUseWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const c = document.createElement('canvas');
    return !!(
      c.getContext('webgl2') ||
      c.getContext('webgl') ||
      c.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

/* ─── Three.js blob (only imported when WebGL works) ─── */
function WebGLBlobs() {
  const { Canvas, useFrame } = require('@react-three/fiber');
  const { MeshDistortMaterial } = require('@react-three/drei');

  function Blob({ position, color, scale, speed = 0.3, distort = 0.4 }) {
    const meshRef = useRef();
    const initialPos = useMemo(() => [...position], [position]);

    useFrame(({ clock }) => {
      const t = clock.getElapsedTime() * speed;
      meshRef.current.position.x = initialPos[0] + Math.sin(t) * 0.4;
      meshRef.current.position.y = initialPos[1] + Math.cos(t * 0.8) * 0.3;
      meshRef.current.position.z = initialPos[2] + Math.sin(t * 0.6) * 0.2;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
      meshRef.current.rotation.y = Math.cos(t * 0.4) * 0.1;
    });

    return (
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.08}
          metalness={0.92}
          distort={distort}
          speed={speed * 3}
        />
      </mesh>
    );
  }

  const blobs = [
    { position: [-3.5,  1.0, -3  ], color: '#3a3a3a', scale: 1.6, speed: 0.22, distort: 0.45 },
    { position: [ 3.2, -1.2, -4  ], color: '#2e2e2e', scale: 1.4, speed: 0.18, distort: 0.50 },
    { position: [ 0.8,  2.8, -3.5], color: '#404040', scale: 1.1, speed: 0.25, distort: 0.40 },
    { position: [-2.0, -2.5, -3  ], color: '#353535', scale: 1.3, speed: 0.20, distort: 0.55 },
    { position: [ 4.0,  2.0, -5  ], color: '#3a3a3a', scale: 1.0, speed: 0.15, distort: 0.35 },
    { position: [-4.0,  2.8, -4  ], color: '#2a2a2a', scale: 0.9, speed: 0.28, distort: 0.40 },
    { position: [ 1.5, -3.0, -3.5], color: '#444444', scale: 0.7, speed: 0.30, distort: 0.50 },
    { position: [-0.5, -0.5, -5  ], color: '#303030', scale: 1.8, speed: 0.12, distort: 0.30 },
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <directionalLight position={[8, 10, 6]}  intensity={5.0} color="#ffffff" />
      <directionalLight position={[-6,  4, 2]} intensity={1.2} color="#d0d8e0" />
      <directionalLight position={[0,  -6, 2]} intensity={0.6} color="#E8E0D0" />
      <ambientLight intensity={0.08} />
      {blobs.map((blob, i) => (
        <Blob key={i} {...blob} />
      ))}
    </Canvas>
  );
}

/* ─── CSS-only fallback blobs ─── */
const cssBlobData = [
  { x: '18%', y: '15%', size: 260, delay: 0,   dur: 18, color: '#3a3a3a' },
  { x: '65%', y: '22%', size: 200, delay: 2,   dur: 22, color: '#2e2e2e' },
  { x: '42%', y: '55%', size: 320, delay: 1,   dur: 20, color: '#353535' },
  { x: '78%', y: '60%', size: 180, delay: 3,   dur: 16, color: '#404040' },
  { x: '25%', y: '72%', size: 220, delay: 1.5, dur: 24, color: '#2a2a2a' },
  { x: '55%', y: '10%', size: 160, delay: 4,   dur: 19, color: '#444444' },
  { x: '85%', y: '42%', size: 140, delay: 2.5, dur: 21, color: '#303030' },
  { x: '10%', y: '45%', size: 280, delay: 0.5, dur: 17, color: '#383838' },
];

function CSSBlobs() {
  return (
    <>
      <style>{`
        @keyframes blob-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25%      { transform: translate(30px, -20px) scale(1.05); }
          50%      { transform: translate(-20px, 15px) scale(0.95); }
          75%      { transform: translate(15px, 25px) scale(1.02); }
        }
      `}</style>
      {cssBlobData.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, ${b.color}ee, ${b.color}cc 60%, ${b.color}88)`,
            filter: 'blur(2px)',
            animation: `blob-float ${b.dur}s ease-in-out ${b.delay}s infinite`,
            opacity: 0.85,
          }}
        />
      ))}
    </>
  );
}

/* ─── Main export ─── */
export default function MetaballScene({ visible }) {
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setWebgl(canUseWebGL());
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.2s ease',
      }}
    >
      {webgl ? <WebGLBlobs /> : <CSSBlobs />}
    </div>
  );
}