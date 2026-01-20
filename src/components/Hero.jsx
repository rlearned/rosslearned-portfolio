import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'

// Floating 3D Shapes
const FloatingShape = ({ position, scale, color, speed = 1, distort = 0.3 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.2) * 0.3
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

// Torus Shape
const FloatingTorus = ({ position, scale, color, speed = 1 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3
    }
  })

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.4, 32, 100]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.4}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
    </Float>
  )
}

// Particles
const Particles = ({ count = 200 }) => {
  const mesh = useRef()
  const { viewport } = useThree()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 3
      const y = (Math.random() - 0.5) * viewport.height * 3
      const z = (Math.random() - 0.5) * 10 - 5
      temp.push({ x, y, z })
    }
    return temp
  }, [count, viewport])

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    particles.forEach((particle, i) => {
      pos[i * 3] = particle.x
      pos[i * 3 + 1] = particle.y
      pos[i * 3 + 2] = particle.z
    })
    return pos
  }, [particles, count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Mouse-reactive camera
const CameraRig = () => {
  const { camera, mouse } = useThree()
  
  useFrame(() => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02
    camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })

  return null
}

// 3D Scene
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[10, -10, 5]} intensity={0.5} color="#a855f7" />
      
      <CameraRig />
      <Particles count={150} />
      
      {/* Large background sphere */}
      <FloatingShape
        position={[-4, 2, -8]}
        scale={2.5}
        color="#8b5cf6"
        speed={0.5}
        distort={0.4}
      />
      
      {/* Medium sphere */}
      <FloatingShape
        position={[4, -1, -6]}
        scale={1.5}
        color="#a855f7"
        speed={0.7}
        distort={0.3}
      />
      
      {/* Small sphere */}
      <FloatingShape
        position={[2, 3, -4]}
        scale={0.8}
        color="#c084fc"
        speed={1}
        distort={0.2}
      />
      
      {/* Torus */}
      <FloatingTorus
        position={[-3, -2, -5]}
        scale={1.2}
        color="#8b5cf6"
        speed={0.4}
      />
      
      {/* Another Torus */}
      <FloatingTorus
        position={[5, 1, -7]}
        scale={0.9}
        color="#a855f7"
        speed={0.6}
      />
    </>
  )
}

const Hero = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-navy/80 z-[1]" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-deep-navy/50 z-[1]" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ y, opacity }}
      >
        {/* Glassmorphic Card */}
        <motion.div
          className="glass p-8 md:p-12 lg:p-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        >
          {/* Name */}
          <motion.h1
            className="hero-title mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="gradient-text">Ross Learned</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Software Engineer & University Student
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="hero-subtitle text-white/70 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Building innovative, scalable software solutions with real-world impact
          </motion.p>

          {/* Easter Egg - Long.MAX_VALUE */}
          <motion.a
            href="https://9223372036854775807.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-white/30 hover:text-accent-purple transition-colors duration-300 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            title="Long.MAX_VALUE"
          >
            9223372036854775807
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-white/50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
