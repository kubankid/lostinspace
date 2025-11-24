import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { LayoutProvider } from './LayoutContext';

function StarField({ count = 1000 }) {
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.random() * 100 - 50;
      const y = Math.random() * 100 - 50;
      const z = Math.random() * 100 - 50;
      temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, x, y, z } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      // Move particles towards camera to simulate flying
      particle.z += 0.1;
      if (particle.z > 20) particle.z = -50;

      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshPhongMaterial color="#ffffff" />
      </instancedMesh>
    </>
  );
}

function Scene({ setLeftNode, setCenterNode, setRightNode }) {
  // Hardcoded values based on user approval
  const camPos = [2, 2.5, 32];
  const camFov = 50;
  const orbitTarget = [2, 1, 0];

  const centerPos = [1, 1, 0]; // Shifted +1 on X
  const centerRot = [0, 0, 0];
  const centerScale = 1.2;

  // Adjusted positions to align with the edge of the dealer table (blue border)
  // User-specified positions, shifted +1 on X
  const leftPos = [-14, 2.5, 5];
  const leftRot = [0, Math.PI / 6, 0];
  const leftScale = 1;

  const rightPos = [17, 2.5, 5];
  const rightRot = [0, -Math.PI / 6, 0];
  const rightScale = 1;

  return (
    <>
      <PerspectiveCamera makeDefault position={camPos} fov={camFov} />
      <OrbitControls
        target={orbitTarget}
        enableZoom={false}
        enablePan={false}
        minDistance={32}
        maxDistance={32}
        minPolarAngle={Math.PI / 2.2}
        maxPolarAngle={Math.PI / 2.2}
        minAzimuthAngle={0}
        maxAzimuthAngle={0}
      />

      {/* Atmosphere */}
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 10, 40]} />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, 10, -10]} intensity={1} color="#ff00ff" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />

      {/* StarField Background */}
      <StarField />

      {/* Center Screen Frame */}
      <mesh position={centerPos} rotation={centerRot} scale={[centerScale * 8.2, centerScale * 7.2, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} wireframe />
      </mesh>

      {/* Center Screen */}
      <Html
        transform
        position={centerPos}
        rotation={centerRot}
        scale={centerScale}
        style={{
          width: '800px',
          height: '700px',
          background: 'rgba(0, 0, 0, 0.95)',
          borderRadius: '4px',
          border: '2px solid #00ffff',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
          overflow: 'hidden'
        }}
      >
        <div ref={setCenterNode} style={{ width: '100%', height: '100%', overflowY: 'auto' }} />
      </Html>

      {/* Left Screen Frame */}
      <mesh position={leftPos} rotation={leftRot} scale={[leftScale * 4.2, leftScale * 6.2, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} wireframe />
      </mesh>

      {/* Left Screen (Shop) */}
      <Html
        transform
        position={leftPos}
        rotation={leftRot}
        scale={leftScale}
        style={{
          width: '400px',
          height: '600px',
          background: 'rgba(0, 0, 0, 0.95)',
          borderRadius: '4px',
          border: '2px solid #ff00ff',
          boxShadow: '0 0 20px rgba(255, 0, 255, 0.5)',
          overflow: 'hidden'
        }}
      >
        <div ref={setLeftNode} style={{ width: '100%', height: '100%', overflowY: 'auto' }} />
      </Html>

      {/* Right Screen Frame */}
      <mesh position={rightPos} rotation={rightRot} scale={[rightScale * 5.2, rightScale * 6.2, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} wireframe />
      </mesh>

      {/* Right Screen (Stats) */}
      <Html
        transform
        position={rightPos}
        rotation={rightRot}
        scale={rightScale}
        style={{
          width: '500px',
          height: '600px',
          background: 'rgba(0, 0, 0, 0.95)',
          borderRadius: '4px',
          border: '2px solid #00ff00',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)',
          overflow: 'hidden'
        }}
      >
        <div ref={setRightNode} style={{ width: '100%', height: '100%', overflowY: 'auto' }} />
      </Html>
    </>
  );
}

function Room({ children }) {
  const [leftNode, setLeftNode] = useState(null);
  const [centerNode, setCenterNode] = useState(null);
  const [rightNode, setRightNode] = useState(null);

  return (
    <LayoutProvider value={{ leftNode, centerNode, rightNode }}>
      <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
        <Canvas gl={{ antialias: true }}>
          <Scene
            setLeftNode={setLeftNode}
            setCenterNode={setCenterNode}
            setRightNode={setRightNode}
          />
        </Canvas>
        {/* Render children (Game) outside Canvas so it can use DOM portals */}
        {children}
      </div>
    </LayoutProvider>
  );
}

export default Room;
