import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as random from 'maath/random/dist/maath-random.esm';

function Stars(props) {
  const ref = useRef();
  const sphere = useMemo(() => random.inSphere(new Float32Array(8000), { radius: 1.5 }), []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffd700"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingHearts() {
  const hearts = useRef();
  
  useFrame((state) => {
    hearts.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <group ref={hearts}>
      {[...Array(30)].map((_, i) => (
        <Sphere
          key={i}
          position={[
            Math.sin(i * 2) * 3,
            Math.cos(i * 3) * 3,
            Math.sin(i * 1.5) * 3
          ]}
          args={[0.05, 16, 16]}
        >
          <meshStandardMaterial 
            color="#ff69b4" 
            emissive="#ff1493" 
            emissiveIntensity={0.8}
            metalness={0.3}
            roughness={0.2}
          />
        </Sphere>
      ))}
    </group>
  );
}

function AnimatedSphere() {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
      <MeshDistortMaterial
        color="#764ba2"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.3}
      />
    </Sphere>
  );
}

function HeroSection({ onScroll }) {
  return (
    <div className="hero-section">
      <Canvas camera={{ position: [0, 0, 1] }} className="hero-canvas">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color="#ff69b4" intensity={1} />
        <Stars />
        <FloatingHearts />
        <AnimatedSphere />
      </Canvas>
      
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hero-text"
        >
          <motion.h1 
            className="hero-title"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 1, 
              delay: 0.7,
              type: "spring",
              stiffness: 100
            }}
          >
            Our First
            <br />
            <motion.span 
              className="highlight"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255, 215, 0, 0.5)",
                  "0 0 40px rgba(255, 215, 0, 0.8)",
                  "0 0 20px rgba(255, 215, 0, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              New Year
            </motion.span>
            <br />
            Together
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            2025 ✨
          </motion.p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: 1.8,
            type: "spring",
            stiffness: 200
          }}
          className="scroll-btn"
          onClick={onScroll}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)"
          }}
          whileTap={{ scale: 0.9 }}
        >
          Begin Our Journey ❤️
        </motion.button>

        <motion.div
          className="floating-hearts-ui"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 20 + 10}px`
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ 
                y: -1000, 
                opacity: [0, 1, 1, 0],
                x: [0, Math.random() * 50 - 25]
              }}
              transition={{ 
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            >
              ❤️
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;
