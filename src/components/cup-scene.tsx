"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { MathUtils } from "three";

function Cup({ reduced = false }: { reduced?: boolean }) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.26 - 0.22, 4.2, delta);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, state.pointer.y * -0.1 + 0.04, 4.2, delta);
    group.current.position.y = MathUtils.damp(group.current.position.y, Math.sin(state.clock.elapsedTime * 0.8) * 0.035, 3, delta);
  });

  return (
    <group ref={group} rotation={[0.04, -0.22, -0.025]} scale={0.92}>
      <mesh castShadow position={[0, -0.08, 0]}>
        <cylinderGeometry args={[1.18, 0.94, 3.25, 64, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#384BFF" roughness={0.6} metalness={0.02} />
      </mesh>
      <mesh castShadow position={[0, -0.08, 0]} rotation={[0, Math.PI, 0]}>
        <cylinderGeometry args={[1.18, 0.94, 3.25, 64, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#FF6548" roughness={0.6} metalness={0.02} />
      </mesh>
      <mesh castShadow position={[0, 1.58, 0]}>
        <cylinderGeometry args={[1.34, 1.22, 0.32, 64]} />
        <meshStandardMaterial color="#F3F0E8" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[0, 1.78, 0]}>
        <cylinderGeometry args={[1.18, 1.28, 0.22, 64]} />
        <meshStandardMaterial color="#F3F0E8" roughness={0.72} />
      </mesh>
      <mesh position={[0, 1.9, 0]}>
        <torusGeometry args={[0.84, 0.16, 16, 64]} />
        <meshStandardMaterial color="#E7E2D7" roughness={0.78} />
      </mesh>
      <mesh castShadow position={[0, -1.76, 0]}>
        <cylinderGeometry args={[0.98, 0.95, 0.22, 64]} />
        <meshStandardMaterial color="#141416" roughness={0.58} />
      </mesh>
      <mesh position={[0, -0.08, 1.175]}>
        <boxGeometry args={[0.045, 3.18, 0.02]} />
        <meshStandardMaterial color="#F3F0E8" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default function CupScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      aria-label="Трёхмерная демонстрация двухцветного фирменного стакана"
      role="img"
      camera={{ position: [0, 0.25, 6.7], fov: 31 }}
      dpr={[1, 1.5]}
      frameloop={reduced ? "demand" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows
    >
      <ambientLight intensity={1.25} />
      <directionalLight position={[4, 6, 5]} intensity={3.2} castShadow />
      <pointLight position={[-3, 1, 3]} color="#DDE3FF" intensity={8} />
      <pointLight position={[3, 0, -1]} color="#FF6548" intensity={5} />
      <Cup reduced={reduced} />
      <ContactShadows position={[0, -2.02, 0]} opacity={0.3} scale={5.5} blur={2.4} far={4} />
    </Canvas>
  );
}
