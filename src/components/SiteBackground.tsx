import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { TextureLoader, type Mesh } from "three";
import moonTex from "@/assets/moon-texture.jpg.asset.json";

function Moon() {
  const ref = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, moonTex.url);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.2, 128, 128]} />
      <meshStandardMaterial
        map={texture}
        roughness={1}
        metalness={0}
        emissive="#1a1a2a"
        emissiveIntensity={0.08}
      />
    </mesh>
  );
}

/**
 * Fixed full-viewport 3D interactive moon background.
 * Drag to rotate. Sits behind every page with a dark legibility overlay.
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 3, 5]} intensity={2.2} color="#f5f0ff" />
        <directionalLight position={[-6, -2, -3]} intensity={0.25} color="#6d5bff" />
        <Suspense fallback={null}>
          <Stars radius={80} depth={40} count={2500} factor={3} saturation={0} fade speed={0.5} />
          <Moon />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>
      {/* Legibility overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/85" />
      <div className="pointer-events-none absolute inset-0 bg-background/20" />
    </div>
  );
}
