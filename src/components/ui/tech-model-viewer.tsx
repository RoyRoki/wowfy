"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

interface TechModelViewerProps {
    modelPath: string | null;
    onHide: () => void;
    autoHideDuration?: number;
}

function Model({ path, isExiting, scrollRotation }: { path: string; isExiting: boolean; scrollRotation: number }) {
    const { scene } = useGLTF(path);
    const modelRef = useRef<THREE.Group>(null);
    const rotationProgress = useRef(0);
    const initialScale = useRef<number>(1);
    const initialPosition = useRef<THREE.Vector3>(new THREE.Vector3());
    const isSetup = useRef(false);

    useEffect(() => {
        if (modelRef.current && !isSetup.current) {
            // First pivot point: Center the model using bounding box
            const box = new THREE.Box3().setFromObject(modelRef.current);
            const center = box.getCenter(new THREE.Vector3());
            modelRef.current.position.sub(center);

            // Scale to fit - calculate base scale
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            let scale = 2 / maxDim;

            // Apply consistent model-specific scale adjustments
            // Calibrated to ensure all models appear at similar visual size
            if (path.includes('react_logo')) {
                scale *= 0.8; // Next.js React logo
            } else if (path.includes('flutter')) {
                scale *= 1.2; // Flutter logo - slightly bigger
            } else if (path.includes('gopher')) {
                scale *= 0.9; // Golang Gopher
            }

            // Store the scale to lock it
            initialScale.current = scale;
            modelRef.current.scale.setScalar(scale);

            // Second pivot point: Apply model-specific position adjustments
            // This is done AFTER scaling to ensure proper positioning
            if (path.includes('gopher')) {
                // Gopher needs adjustment on all axes to show front view centered
                modelRef.current.position.x += 0; // Center horizontally
                modelRef.current.position.y += 0.1; // Move up slightly
                modelRef.current.position.z += 0; // Bring forward to show front
            }

            // Store the final position to lock it
            initialPosition.current.copy(modelRef.current.position);
            isSetup.current = true;
        }
    }, [scene, path]);

    // Smooth rotation animation on appear, disappear, and scroll
    useFrame((state, delta) => {
        if (!modelRef.current) return;

        // Lock the scale and position to prevent changes during interaction
        if (isSetup.current) {
            modelRef.current.scale.setScalar(initialScale.current);
            modelRef.current.position.copy(initialPosition.current);
        }

        if (isExiting) {
            // Exit rotation (reverse)
            rotationProgress.current = Math.max(0, rotationProgress.current - delta * 2);
            modelRef.current.rotation.y = rotationProgress.current * Math.PI * 2;
        } else if (rotationProgress.current < 1) {
            // Entry rotation
            rotationProgress.current = Math.min(1, rotationProgress.current + delta * 2);
            modelRef.current.rotation.y = rotationProgress.current * Math.PI * 2;
        } else {
            // After entry animation completes, apply scroll-based rotation
            modelRef.current.rotation.y = scrollRotation;
        }
    });

    return <primitive ref={modelRef} object={scene.clone()} />;
}

function Scene({ modelPath, isExiting, scrollRotation, onInteractionStart, onInteractionEnd }: {
    modelPath: string;
    isExiting: boolean;
    scrollRotation: number;
    onInteractionStart: () => void;
    onInteractionEnd: () => void;
}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controlsRef = useRef<any>(null);
    const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!controlsRef.current) return;

        const handleStart = () => {
            onInteractionStart();
            // Clear the end timeout if it exists
            if (interactionTimeoutRef.current) {
                clearTimeout(interactionTimeoutRef.current);
            }
        };

        const handleEnd = () => {
            // Wait a bit after interaction ends to ensure user has stopped
            if (interactionTimeoutRef.current) {
                clearTimeout(interactionTimeoutRef.current);
            }
            interactionTimeoutRef.current = setTimeout(() => {
                onInteractionEnd();
            }, 500); // 500ms delay after last interaction
        };

        const controls = controlsRef.current;
        controls.addEventListener('start', handleStart);
        controls.addEventListener('end', handleEnd);

        return () => {
            controls.removeEventListener('start', handleStart);
            controls.removeEventListener('end', handleEnd);
            if (interactionTimeoutRef.current) {
                clearTimeout(interactionTimeoutRef.current);
            }
        };
    }, [onInteractionStart, onInteractionEnd]);

    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <spotLight position={[0, 10, 0]} intensity={0.8} />

            <Suspense fallback={null}>
                <Model path={modelPath} isExiting={isExiting} scrollRotation={scrollRotation} />
            </Suspense>

            <OrbitControls
                ref={controlsRef}
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                maxPolarAngle={Math.PI}
                minPolarAngle={0}
            />
        </>
    );
}

export function TechModelViewer({ modelPath, onHide, autoHideDuration = 3000 }: TechModelViewerProps) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [isInteracting, setIsInteracting] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [scrollRotation, setScrollRotation] = useState(0);
    const isScrolling = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const lastInteractionTime = useRef<number>(0);

    // Keep track of latest isInteracting state for event listeners
    const isInteractingRef = useRef(isInteracting);
    useEffect(() => {
        isInteractingRef.current = isInteracting;
    }, [isInteracting]);

    const startTimer = useRef(() => {
        // Placeholder, will be updated
    });

    // Memoize startTimer logic
    const startTimerLogic = useEffect(() => {
        startTimer.current = () => {
            // Clear any existing timer
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            // Set new timer
            timerRef.current = setTimeout(() => {
                setIsExiting(true);
                // Give time for exit animation
                setTimeout(() => {
                    onHide();
                    setIsExiting(false);
                }, 500);
            }, autoHideDuration);
        };
    }, [autoHideDuration, onHide]);

    // Simple wrapper to call the current ref
    const triggerTimer = () => {
        startTimer.current();
    }

    const handleInteractionStart = () => {
        setIsInteracting(true);
        lastInteractionTime.current = Date.now();
        // Clear timer when user starts interacting
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    const handleInteractionEnd = () => {
        setIsInteracting(false);
        // Restart timer when user stops interacting
        triggerTimer();
    };

    useEffect(() => {
        if (!modelPath) {
            // Clean up state when no model is visible
            setTimeout(() => setScrollRotation(0), 0);
            isScrolling.current = false;
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
                scrollTimeout.current = null;
            }
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            return;
        }

        // Scroll event handler - only active when model is visible
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            // Mark as scrolling
            isScrolling.current = true;

            // Update rotation based on scroll delta (bidirectional)
            setScrollRotation((prev) => prev + e.deltaY * 0.005);

            // Clear auto-hide timer while scrolling
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            // Reset scrolling state after a delay
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
            scrollTimeout.current = setTimeout(() => {
                isScrolling.current = false;
                // Restart timer after scrolling stops
                if (!isInteractingRef.current) {
                    triggerTimer();
                }
            }, 500);
        };

        // Add wheel event listener only when model is visible
        window.addEventListener('wheel', handleWheel, { passive: false });

        // Start timer if not interacting or scrolling
        if (!isInteractingRef.current && !isScrolling.current) {
            triggerTimer();
        }

        return () => {
            // Clean up listener when model changes or is hidden
            window.removeEventListener('wheel', handleWheel);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [modelPath]); // Only trigger on modelPath change. Using refs for others.

    return (
        <AnimatePresence mode="wait">
            {modelPath && (
                <motion.div
                    key={modelPath}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                >
                    <Canvas
                        camera={{ position: [0, 0, 5], fov: 50 }}
                        dpr={[1, 2]}
                        gl={{ antialias: true, alpha: true }}
                    >
                        <Scene
                            modelPath={modelPath}
                            isExiting={isExiting}
                            scrollRotation={scrollRotation}
                            onInteractionStart={handleInteractionStart}
                            onInteractionEnd={handleInteractionEnd}
                        />
                    </Canvas>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Preload models
export function preloadModels(paths: string[]) {
    paths.forEach((path) => {
        useGLTF.preload(path);
    });
}
