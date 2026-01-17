"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float, Environment, useProgress, Html } from "@react-three/drei";
import * as THREE from "three";

// Loader component
function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 border-2 border-[var(--color-accent)]/20 border-t-[var(--color-accent)] rounded-full animate-spin" />
                <span className="text-sm text-[var(--color-text-muted)]">
                    {progress.toFixed(0)}%
                </span>
            </div>
        </Html>
    );
}

interface DeviceModelProps {
    modelPath: string;
    screenTexture?: string;
    mousePosition: { x: number; y: number };
    rotationIntensity?: number;
}

function DeviceModel({
    modelPath,
    screenTexture,
    mousePosition,
    rotationIntensity = 0.3,
}: DeviceModelProps) {
    const meshRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF(modelPath);
    const { viewport } = useThree();

    // Target rotation based on mouse
    const targetRotation = useRef({ x: 0, y: 0 });

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Calculate target rotation from mouse position
        targetRotation.current.y = mousePosition.x * rotationIntensity;
        targetRotation.current.x = -mousePosition.y * rotationIntensity * 0.5;

        // Smooth lerp to target
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            targetRotation.current.y,
            delta * 3
        );
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            targetRotation.current.x,
            delta * 3
        );
    });

    // Clone the scene to avoid shared state issues
    const clonedScene = scene.clone();

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={meshRef}>
                <primitive object={clonedScene} scale={1} />
            </group>
        </Float>
    );
}

interface DeviceMockup3DProps {
    deviceType: "laptop" | "phone";
    screenTexture?: string;
    className?: string;
}

export function DeviceMockup3D({
    deviceType,
    screenTexture,
    className = "",
}: DeviceMockup3DProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const modelPath = deviceType === "laptop" ? "/3d/laptop.glb" : "/3d/iphone_16_-_free.glb";

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };

    if (!isClient) {
        return (
            <div className={`${className} flex items-center justify-center bg-[var(--color-surface)]/50`}>
                <div className="w-16 h-16 border-2 border-[var(--color-accent)]/20 border-t-[var(--color-accent)] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <Canvas
                dpr={[1, 2]}
                camera={{
                    position: deviceType === "laptop" ? [0, 0, 4] : [0, 0, 6],
                    fov: 45,
                }}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={<Loader />}>
                    <ambientLight intensity={0.6} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
                    <spotLight
                        position={[0, 10, 5]}
                        angle={0.3}
                        penumbra={1}
                        intensity={1}
                        color="#a855f7"
                    />
                    <DeviceModel
                        modelPath={modelPath}
                        screenTexture={screenTexture}
                        mousePosition={mousePosition}
                    />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}

// Preload models
useGLTF.preload("/3d/laptop.glb");
useGLTF.preload("/3d/iphone_16_-_free.glb");
