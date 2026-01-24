# React Three Fiber (R3F)

React renderer for Three.js. Add 3D to your site without leaving React.

---

## Installation

```bash
npm install three @react-three/fiber @react-three/drei
```

---

## Basic Setup

### Canvas
```tsx
import { Canvas } from "@react-three/fiber"

function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </Canvas>
  )
}
```

### Full Screen Background
```tsx
<div className="fixed inset-0 -z-10">
  <Canvas>
    <Scene />
  </Canvas>
</div>
```

---

## Essential Drei Helpers

```tsx
import { 
  OrbitControls,    // Camera controls
  PerspectiveCamera,
  Environment,      // HDR lighting
  Float,            // Floating animation
  Text,             // 3D text
  useGLTF,          // Load 3D models
  useTexture,       // Load textures
  Stars,            // Star field
  Sparkles,         // Sparkle particles
} from "@react-three/drei"
```

---

## Common Components

### Orbit Controls (Interactive camera)
```tsx
<Canvas>
  <OrbitControls 
    enableZoom={false}
    autoRotate 
    autoRotateSpeed={0.5}
  />
  {/* Scene */}
</Canvas>
```

### 3D Model
```tsx
import { useGLTF } from "@react-three/drei"

function Model() {
  const { scene } = useGLTF("/models/laptop.glb")
  return <primitive object={scene} scale={0.5} />
}

// Preload model
useGLTF.preload("/models/laptop.glb")
```

### Floating Element
```tsx
import { Float } from "@react-three/drei"

<Float
  speed={2}
  rotationIntensity={1}
  floatIntensity={1}
>
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color="#5a67d8" />
  </mesh>
</Float>
```

### 3D Text
```tsx
import { Text } from "@react-three/drei"

<Text
  fontSize={1}
  color="white"
  anchorX="center"
  anchorY="middle"
  font="/fonts/Inter-Bold.woff"
>
  Hello World
</Text>
```

---

## Backgrounds & Effects

### Stars
```tsx
import { Stars } from "@react-three/drei"

<Canvas>
  <Stars 
    radius={100} 
    depth={50} 
    count={5000} 
    factor={4} 
    fade 
  />
</Canvas>
```

### Sparkles
```tsx
import { Sparkles } from "@react-three/drei"

<Sparkles 
  count={100}
  size={2}
  speed={0.4}
  opacity={0.8}
  scale={10}
/>
```

### Environment (Lighting)
```tsx
import { Environment } from "@react-three/drei"

<Canvas>
  <Environment preset="city" /> {/* studio, city, forest, etc. */}
  {/* Scene */}
</Canvas>
```

---

## Animation with useFrame

```tsx
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

function RotatingBox() {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.3
  })
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6366f1" />
    </mesh>
  )
}
```

### Scroll-based Animation
```tsx
import { useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

function ScrollScene() {
  const scroll = useScroll()
  const meshRef = useRef()
  
  useFrame(() => {
    const offset = scroll.offset // 0 to 1
    meshRef.current.rotation.y = offset * Math.PI * 2
    meshRef.current.position.y = offset * -5
  })
  
  return <mesh ref={meshRef}>{/* ... */}</mesh>
}

// Wrap with ScrollControls
<Canvas>
  <ScrollControls pages={3}>
    <ScrollScene />
  </ScrollControls>
</Canvas>
```

---

## Performance

### Suspense Loading
```tsx
import { Suspense } from "react"

<Canvas>
  <Suspense fallback={null}>
    <Model />
  </Suspense>
</Canvas>
```

### Performance Settings
```tsx
<Canvas
  dpr={[1, 2]}  // Limit pixel ratio
  performance={{ min: 0.5 }} // Adaptive performance
  gl={{ antialias: false }}  // Disable if not needed
>
```

### Disable on Mobile
```tsx
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

{!isMobile && (
  <Canvas>
    <Scene />
  </Canvas>
)}
```

---

## Hero Section Pattern

```tsx
function HeroScene() {
  return (
    <div className="h-screen relative">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Stars />
          <Float speed={2}>
            <Sphere args={[2, 32, 32]}>
              <meshStandardMaterial 
                color="#6366f1" 
                wireframe 
              />
            </Sphere>
          </Float>
          <OrbitControls enableZoom={false} autoRotate />
        </Canvas>
      </div>
      
      {/* HTML Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-6xl font-bold text-white">
          Welcome
        </h1>
      </div>
    </div>
  )
}
```

---

## With GSAP

```tsx
import gsap from "gsap"
import { useRef, useEffect } from "react"

function AnimatedMesh() {
  const meshRef = useRef()
  
  useEffect(() => {
    gsap.to(meshRef.current.position, {
      y: 2,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    })
  }, [])
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  )
}
```

---

## Common Patterns

### Globe
```tsx
import { Sphere, OrbitControls } from "@react-three/drei"

<Canvas>
  <OrbitControls enableZoom={false} autoRotate />
  <ambientLight />
  <Sphere args={[1, 64, 64]}>
    <meshStandardMaterial 
      map={useTexture("/earth.jpg")}
    />
  </Sphere>
</Canvas>
```

### Particles
```tsx
import { Points, PointMaterial } from "@react-three/drei"
import * as random from "maath/random"

function Particles() {
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  )
  
  return (
    <Points positions={sphere}>
      <PointMaterial 
        size={0.015} 
        color="#ffffff" 
        transparent 
        opacity={0.8}
      />
    </Points>
  )
}
```

---

## Best Practices

- ✅ Use Suspense for model loading
- ✅ Limit dpr on mobile
- ✅ Use Drei helpers over raw Three.js
- ✅ Dispose resources on unmount
- ✅ Disable on low-end devices
- ❌ Don't use heavy models without compression
- ❌ Don't forget lighting

---

## Resources

- Docs: [docs.pmnd.rs/react-three-fiber](https://docs.pmnd.rs/react-three-fiber)
- Drei: [github.com/pmndrs/drei](https://github.com/pmndrs/drei)
- Examples: [codesandbox.io/s/r3f-examples](https://codesandbox.io/examples/package/@react-three/fiber)
