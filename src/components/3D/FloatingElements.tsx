import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry({ position, geometry, color }: { position: [number, number, number], geometry: THREE.BufferGeometry, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} geometry={geometry}>
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </Float>
  );
}

function Scene() {
  const geometries = useMemo(() => [
    { geo: new THREE.BoxGeometry(1, 1, 1), pos: [-4, 2, -2] as [number, number, number], color: "#a855f7" },
    { geo: new THREE.SphereGeometry(0.8, 16, 16), pos: [4, -2, -3] as [number, number, number], color: "#06b6d4" },
    { geo: new THREE.OctahedronGeometry(1), pos: [-3, -3, -4] as [number, number, number], color: "#8b5cf6" },
    { geo: new THREE.TorusGeometry(0.8, 0.3, 8, 16), pos: [3, 3, -2] as [number, number, number], color: "#0ea5e9" },
    { geo: new THREE.ConeGeometry(0.8, 1.5, 6), pos: [0, 4, -5] as [number, number, number], color: "#7c3aed" },
  ], []);

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06b6d4" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {geometries.map((item, index) => (
        <FloatingGeometry
          key={index}
          position={item.pos}
          geometry={item.geo}
          color={item.color}
        />
      ))}
    </>
  );
}

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default FloatingElements;