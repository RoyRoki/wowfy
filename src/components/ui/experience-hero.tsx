"use client";

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useMobileDetect } from '@/hooks/useMobileDetect';

const LiquidBackground = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
    }), []);

    useFrame((state) => {
        const { clock, mouse } = state;
        if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(mouse, 0.05);
        }
    });

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                transparent
                uniforms={uniforms}
                vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
                fragmentShader={`
          uniform float uTime; uniform vec2 uMouse; varying vec2 vUv;
          void main() {
            vec2 uv = vUv; float t = uTime * 0.15;
            vec2 m = uMouse * 0.1;
            float color = smoothstep(0.0, 1.0, (sin(uv.x * 8.0 + t + m.x * 12.0) + sin(uv.y * 6.0 - t + m.y * 12.0)) * 0.5 + 0.5);
            gl_FragColor = vec4(mix(vec3(0.005), vec3(0.05), color), 1.0);
          }
        `}
            />
        </mesh>
    );
};

const Monolith = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
        }
    });
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[13, 1]} />
                <MeshDistortMaterial color="#0a0a0a" speed={4} distort={0.4} roughness={0.05} metalness={1.0} />
            </mesh>
        </Float>
    );
};

export const ExperienceHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const { isMobile, isTouchDevice } = useMobileDetect();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(revealRef.current,
                { filter: "blur(30px)", opacity: 0, scale: 1.02 },
                { filter: "blur(0px)", opacity: 1, scale: 1, duration: 2.2, ease: "expo.out" }
            );

            gsap.from(".command-cell", {
                x: 60, opacity: 0, stagger: 0.1, duration: 1.5, ease: "power4.out", delay: 1, clearProps: "all"
            });

            // Magnetic CTA — desktop only
            if (!isTouchDevice) {
                const handleMouseMove = (e: MouseEvent) => {
                    if (!ctaRef.current) return;
                    const rect = ctaRef.current.getBoundingClientRect();
                    const dist = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
                    if (dist < 150) {
                        gsap.to(ctaRef.current, { x: (e.clientX - (rect.left + rect.width / 2)) * 0.4, y: (e.clientY - (rect.top + rect.height / 2)) * 0.4, duration: 0.6 });
                    } else {
                        gsap.to(ctaRef.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
                    }
                };
                window.addEventListener("mousemove", handleMouseMove);
                return () => window.removeEventListener("mousemove", handleMouseMove);
            }
        }, containerRef);
        return () => ctx.revert();
    }, [isTouchDevice]);

    return (
        <section ref={containerRef} className="relative min-h-screen w-full bg-[#020202] flex flex-col selection:bg-white selection:text-black overflow-hidden">
            {/* Background: Canvas on desktop, CSS gradient on mobile */}
            {isMobile || isTouchDevice ? (
                <div className="fixed inset-0 z-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at 30% 50%, rgba(30,30,40,1) 0%, rgba(2,2,2,1) 70%)',
                    }}
                />
            ) : (
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
                        <ambientLight intensity={0.4} />
                        <spotLight position={[50, 50, 50]} intensity={3} />
                        <LiquidBackground />
                        <Monolith />
                    </Canvas>
                </div>
            )}

            <div ref={revealRef} className="relative z-10 w-full flex flex-col md:flex-row p-8 md:p-14 lg:p-20 min-h-screen items-center md:items-stretch gap-10">
                <div className="flex-1 min-w-0 flex flex-col justify-between pb-12 md:pb-8 w-full">
                    <div className="flex items-center gap-3">
                        <div className="relative w-2.5 h-2.5 bg-white rounded-full">
                            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30" />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-white tracking-[0.2em] uppercase">ROKIROY DIGITAL</span>
                    </div>

                    <div className="max-w-5xl lg:-translate-y-8 pr-12">
                        <h1 className="text-[clamp(3rem,8vw,10rem)] font-black leading-[0.9] tracking-tighter text-white uppercase italic-none font-display mb-6">
                            Digital <br /> <span className="text-outline">Excellence</span>
                        </h1>
                        <p className="font-mono text-[13px] text-white/80 uppercase tracking-[0.15em] max-w-xl leading-relaxed border-l-2 border-white/20 pl-6">
                            Premium Digital Experiences. <span className="text-white font-bold">Unbeatable Indian Pricing.</span>
                            <br /><br />
                            Awwwards-quality design. Solid engineering. <br />
                            Fraction of the cost of western agencies.
                        </p>
                    </div>

                    <a
                        ref={ctaRef}
                        href="https://wa.me/919800881300"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit flex items-center gap-6 group lg:-translate-y-20"
                    >
                        <div className="w-14 h-14 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-[#25D366] transition-all duration-500 overflow-hidden">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor" className="text-white group-hover:text-white transition-colors duration-500"/>
                            </svg>
                        </div>
                        <span className="font-mono text-[11px] font-bold text-white uppercase tracking-[0.2em]">Chat on WhatsApp</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ExperienceHero;
