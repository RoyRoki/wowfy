"use client";

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Rocket,
    Palette,
    Code2,
    TestTube2,
    PartyPopper,
    ArrowUpRight,
    Zap,
} from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// ============================================
// TYPE DEFINITIONS
// ============================================

interface Phase {
    id: string;
    title: string;
    icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
    description: string;
    color: string;
    energy: number;
}

interface GalleryCard {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
}

interface ImmersiveScrollExperienceProps {
    phases?: Phase[];
    galleryCards?: GalleryCard[];
    showDebug?: boolean;
}

// ============================================
// DEFAULT DATA
// ============================================

const defaultPhases: Phase[] = [
    {
        id: 'planning',
        title: 'PLANNING',
        icon: Rocket,
        description: 'Strategic vision mapping and goal alignment',
        color: '#a855f7',
        energy: 20,
    },
    {
        id: 'design',
        title: 'DESIGN',
        icon: Palette,
        description: 'Visual identity and UX architecture',
        color: '#06b6d4',
        energy: 40,
    },
    {
        id: 'development',
        title: 'DEVELOPMENT',
        icon: Code2,
        description: 'Engineering excellence and code craftsmanship',
        color: '#22c55e',
        energy: 60,
    },
    {
        id: 'testing',
        title: 'TESTING',
        icon: TestTube2,
        description: 'Quality assurance and performance optimization',
        color: '#eab308',
        energy: 80,
    },
    {
        id: 'release',
        title: 'RELEASE',
        icon: PartyPopper,
        description: 'Launch celebration and market deployment',
        color: '#ec4899',
        energy: 100,
    },
];

const defaultGalleryCards: GalleryCard[] = [
    {
        id: '1',
        title: 'Spatial Commerce',
        subtitle: 'E-Commerce Platform',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop',
    },
    {
        id: '2',
        title: 'Neural Dashboard',
        subtitle: 'Analytics Suite',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=800&fit=crop',
    },
    {
        id: '3',
        title: 'Quantum Portfolio',
        subtitle: 'Creative Showcase',
        imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=800&fit=crop',
    },
    {
        id: '4',
        title: 'Cyber Identity',
        subtitle: 'Brand System',
        imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=600&h=800&fit=crop',
    },
    {
        id: '5',
        title: 'Meta Experience',
        subtitle: 'Immersive App',
        imageUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=600&h=800&fit=crop',
    },
];

// ============================================
// 3D COMPONENTS
// ============================================

const AnimatedBlob = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[2.5, 4]} />
                <MeshDistortMaterial
                    color="#1a1a2e"
                    speed={3}
                    distort={0.4}
                    roughness={0.2}
                    metalness={0.9}
                />
            </mesh>
        </Float>
    );
};

const ParticleField = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const { viewport } = useThree();

    const particles = useMemo(() => {
        const count = 200;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * viewport.width * 2;
            positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }

        return positions;
    }, [viewport]);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#6366f1"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};

// ============================================
// SECTION 1: SPATIAL AGENCY INTRO
// ============================================

const SpatialIntro = React.forwardRef<HTMLDivElement>((_, ref) => {
    const textRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Magnetic CTA effect
        const handleMouseMove = (e: MouseEvent) => {
            if (!ctaRef.current) return;
            const rect = ctaRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

            if (dist < 150) {
                gsap.to(ctaRef.current, {
                    x: (e.clientX - centerX) * 0.3,
                    y: (e.clientY - centerY) * 0.3,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            } else {
                gsap.to(ctaRef.current, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.3)',
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            ref={ref}
            className="spatial-intro relative min-h-screen w-full flex items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #030305 0%, #0a0a12 100%)' }}
        >
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={0.3} />
                    <spotLight position={[10, 10, 10]} intensity={1} />
                    <spotLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
                    <AnimatedBlob />
                    <ParticleField />
                </Canvas>
            </div>

            {/* Grain Overlay */}
            <div
                className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Gradient Vignette */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
                }}
            />

            {/* Content */}
            <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
                {/* Badge */}
                <div className="intro-badge inline-flex items-center gap-2 mb-8 opacity-0">
                    <div className="relative w-2 h-2 bg-purple-500 rounded-full">
                        <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-50" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-white/60 tracking-[0.3em] uppercase">
                        DIGITAL STUDIO
                    </span>
                </div>

                {/* Main Text */}
                <div ref={textRef} className="intro-text overflow-hidden">
                    <h1 className="text-[clamp(3rem,12vw,12rem)] font-black leading-[0.85] tracking-tighter text-white uppercase">
                        <span className="block intro-line-1 opacity-0 translate-y-full">CREATIVE</span>
                        <span
                            className="block intro-line-2 opacity-0 translate-y-full"
                            style={{
                                WebkitTextStroke: '2px rgba(255,255,255,0.8)',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            AGENCY
                        </span>
                    </h1>
                </div>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="intro-subtitle mt-8 font-mono text-sm text-white/40 uppercase tracking-[0.25em] max-w-md mx-auto opacity-0"
                >
                    We engineer immersive digital experiences through spatial logic and advanced WebGL
                </p>

                {/* CTA */}
                <button
                    ref={ctaRef}
                    className="intro-cta mt-12 inline-flex items-center gap-4 group opacity-0"
                >
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                        <ArrowUpRight
                            size={22}
                            className="text-white group-hover:text-black transition-colors duration-500"
                        />
                    </div>
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-[0.2em]">
                        Start a Project
                    </span>
                </button>
            </div>
        </section>
    );
});

SpatialIntro.displayName = 'SpatialIntro';

// ============================================
// SECTION 2: RADIAL TIMELINE
// ============================================

interface RadialTimelineProps {
    phases: Phase[];
    progress: number;
    activeIndex: number;
}

const RadialTimelineSection = React.forwardRef<HTMLDivElement, RadialTimelineProps>(
    ({ phases, progress, activeIndex }, ref) => {
        const orbitRadius = 180;
        const activePhase = phases[activeIndex] || phases[0];
        const ActiveIcon = activePhase.icon;

        return (
            <section
                ref={ref}
                className="radial-timeline relative min-h-screen w-full flex items-center justify-center overflow-hidden"
                style={{ background: '#030305' }}
            >
                {/* Orbit Container */}
                <div className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px]">
                    {/* Orbit Ring */}
                    <div
                        className="absolute inset-0 rounded-full border border-white/10"
                        style={{
                            boxShadow: '0 0 60px rgba(99, 102, 241, 0.1), inset 0 0 60px rgba(99, 102, 241, 0.05)',
                        }}
                    />

                    {/* Progress Arc */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="50%" stopColor="#6366f1" />
                                <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="50%"
                            cy="50%"
                            r="48%"
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray={`${progress * 301.6} 301.6`}
                            className="transition-all duration-300"
                            style={{
                                filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.5))',
                            }}
                        />
                    </svg>

                    {/* Center Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <div
                            className="timeline-center w-32 h-32 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center gap-2"
                            style={{
                                background: `radial-gradient(circle, ${activePhase.color}20 0%, transparent 70%)`,
                                border: `2px solid ${activePhase.color}40`,
                                boxShadow: `0 0 60px ${activePhase.color}30`,
                            }}
                        >
                            <ActiveIcon size={32} className="text-white" style={{ color: activePhase.color }} />
                            <span className="font-mono text-xs font-bold text-white tracking-wider">
                                {activePhase.title}
                            </span>
                        </div>
                    </div>

                    {/* Phase Nodes */}
                    {phases.map((phase, index) => {
                        const angle = (index / phases.length) * 360 - 90;
                        const radian = (angle * Math.PI) / 180;
                        const x = Math.cos(radian) * orbitRadius;
                        const y = Math.sin(radian) * orbitRadius;
                        const isActive = index === activeIndex;
                        const isPast = index < activeIndex;
                        const Icon = phase.icon;

                        return (
                            <div
                                key={phase.id}
                                className={`timeline-node absolute top-1/2 left-1/2 transition-all duration-500 ${isActive ? 'z-30' : 'z-10'
                                    }`}
                                style={{
                                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isActive ? 1.3 : isPast ? 1.1 : 1
                                        })`,
                                }}
                            >
                                {/* Glow Ring */}
                                {isActive && (
                                    <div
                                        className="absolute inset-0 rounded-full animate-ping"
                                        style={{
                                            background: `${phase.color}30`,
                                            transform: 'scale(1.5)',
                                        }}
                                    />
                                )}

                                {/* Node */}
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive
                                        ? 'bg-white border-white'
                                        : isPast
                                            ? 'bg-white/20 border-white/40'
                                            : 'bg-black/40 border-white/20'
                                        }`}
                                    style={
                                        isActive
                                            ? { boxShadow: `0 0 30px ${phase.color}` }
                                            : undefined
                                    }
                                >
                                    <Icon
                                        size={18}
                                        className={isActive ? 'text-black' : isPast ? 'text-white' : 'text-white/60'}
                                    />
                                </div>

                                {/* Label */}
                                <span
                                    className={`absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-semibold tracking-wider transition-all duration-300 ${isActive ? 'text-white' : 'text-white/40'
                                        }`}
                                >
                                    {phase.title}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Energy Bar */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64">
                    <div className="flex justify-between items-center mb-2">
                        <span className="flex items-center gap-1 text-white/60 font-mono text-xs">
                            <Zap size={12} />
                            Energy Level
                        </span>
                        <span className="font-mono text-xs text-white">{Math.round(progress * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                                width: `${progress * 100}%`,
                                background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%)',
                                boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
                            }}
                        />
                    </div>
                </div>

                {/* Phase Description Card */}
                <div
                    className="timeline-card absolute bottom-32 md:bottom-40 left-1/2 -translate-x-1/2 w-80 p-4 rounded-xl border border-white/10 backdrop-blur-xl"
                    style={{ background: 'rgba(0,0,0,0.6)' }}
                >
                    <p className="text-white/70 text-sm text-center">{activePhase.description}</p>
                </div>
            </section>
        );
    }
);

RadialTimelineSection.displayName = 'RadialTimelineSection';

// ============================================
// SECTION 3: HORIZONTAL GALLERY
// ============================================

interface HorizontalGalleryProps {
    cards: GalleryCard[];
}

const HorizontalGallerySection = React.forwardRef<HTMLDivElement, HorizontalGalleryProps>(
    ({ cards }, ref) => {
        return (
            <section
                ref={ref}
                className="horizontal-gallery relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(180deg, #030305 0%, #0a0a0f 100%)' }}
            >
                {/* Header */}
                <div className="gallery-header absolute top-20 left-0 right-0 text-center px-6 z-20">
                    <h2 className="text-[clamp(2rem,6vw,5rem)] font-black leading-tight tracking-tighter text-white uppercase">
                        Crafting Immersive
                        <br />
                        <span className="text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                            Digital Experiences
                        </span>
                    </h2>
                </div>

                {/* Cards Strip */}
                <div className="gallery-strip-wrapper w-full overflow-hidden">
                    <div className="gallery-strip flex gap-6 md:gap-8 px-8">
                        {cards.map((card, index) => (
                            <div
                                key={card.id}
                                className="gallery-card flex-shrink-0 w-[280px] md:w-[320px] lg:w-[380px] group"
                            >
                                <div
                                    className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-purple-500/50"
                                    style={{
                                        boxShadow: '0 0 40px rgba(0,0,0,0.5)',
                                    }}
                                >
                                    {/* Glow Effect on Hover */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                                        style={{
                                            background:
                                                'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
                                        }}
                                    />

                                    {/* Image */}
                                    <img
                                        src={card.imageUrl}
                                        alt={card.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                        <span className="font-mono text-xs text-purple-400 uppercase tracking-wider">
                                            {card.subtitle}
                                        </span>
                                        <h3 className="mt-1 text-xl font-bold text-white">{card.title}</h3>
                                    </div>

                                    {/* Index Badge */}
                                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center z-20">
                                        <span className="font-mono text-xs font-bold text-white">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="gallery-cta absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                    <button className="px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-purple-400 hover:text-white transition-all duration-300">
                        Explore Work
                    </button>
                    <button className="px-6 py-3 rounded-full border border-white/30 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all duration-300">
                        View All
                    </button>
                </div>
            </section>
        );
    }
);

HorizontalGallerySection.displayName = 'HorizontalGallerySection';

// ============================================
// PROGRESS DEBUG OVERLAY
// ============================================

const ProgressDebug = ({ progress, section }: { progress: number; section: string }) => (
    <div className="fixed top-4 right-4 z-50 p-4 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 font-mono text-xs text-white">
        <div className="mb-2">
            Section: <span className="text-purple-400">{section}</span>
        </div>
        <div className="mb-2">
            Progress: <span className="text-cyan-400">{(progress * 100).toFixed(1)}%</span>
        </div>
        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                style={{ width: `${progress * 100}%` }}
            />
        </div>
    </div>
);

// ============================================
// MAIN COMPONENT
// ============================================

export function ImmersiveScrollExperience({
    phases = defaultPhases,
    galleryCards = defaultGalleryCards,
    showDebug = false,
}: ImmersiveScrollExperienceProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    const [debugInfo, setDebugInfo] = useState({ progress: 0, section: 'intro' });
    const [timelineProgress, setTimelineProgress] = useState(0);
    const [activePhaseIndex, setActivePhaseIndex] = useState(0);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            // ========================================
            // SECTION 1: SPATIAL INTRO ANIMATIONS
            // ========================================

            const introTl = gsap.timeline({
                scrollTrigger: {
                    trigger: introRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    onUpdate: (self) => {
                        if (showDebug) {
                            setDebugInfo({ progress: self.progress, section: 'intro' });
                        }
                    },
                },
            });

            // Badge fade in
            introTl.to('.intro-badge', {
                opacity: 1,
                duration: 0.1,
            }, 0);

            // Text lines reveal
            introTl.to('.intro-line-1', {
                opacity: 1,
                y: 0,
                duration: 0.15,
                ease: 'power3.out',
            }, 0.05);

            introTl.to('.intro-line-2', {
                opacity: 1,
                y: 0,
                duration: 0.15,
                ease: 'power3.out',
            }, 0.12);

            // Subtitle fade in
            introTl.to('.intro-subtitle', {
                opacity: 1,
                duration: 0.1,
            }, 0.2);

            // CTA fade in
            introTl.to('.intro-cta', {
                opacity: 1,
                duration: 0.1,
            }, 0.25);

            // Fade out at end
            introTl.to(['.intro-badge', '.intro-line-1', '.intro-line-2', '.intro-subtitle', '.intro-cta'], {
                opacity: 0,
                y: -50,
                duration: 0.3,
                stagger: 0.02,
            }, 0.7);

            // ========================================
            // SECTION 2: RADIAL TIMELINE ANIMATIONS
            // ========================================

            const timelineTl = gsap.timeline({
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: 'top top',
                    end: '+=200%',
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    onUpdate: (self) => {
                        setTimelineProgress(self.progress);
                        const newIndex = Math.min(
                            phases.length - 1,
                            Math.floor(self.progress * phases.length)
                        );
                        setActivePhaseIndex(newIndex);

                        if (showDebug) {
                            setDebugInfo({ progress: self.progress, section: 'timeline' });
                        }
                    },
                },
            });

            // Timeline center pulse
            timelineTl.fromTo(
                '.timeline-center',
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.2 },
                0
            );

            // Timeline nodes stagger in
            timelineTl.fromTo(
                '.timeline-node',
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.15, stagger: 0.03 },
                0.1
            );

            // Timeline card fade in
            timelineTl.fromTo(
                '.timeline-card',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.15 },
                0.3
            );

            // ========================================
            // SECTION 3: HORIZONTAL GALLERY ANIMATIONS
            // ========================================

            const galleryTl = gsap.timeline({
                scrollTrigger: {
                    trigger: galleryRef.current,
                    start: 'top top',
                    end: '+=250%',
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    onUpdate: (self) => {
                        if (showDebug) {
                            setDebugInfo({ progress: self.progress, section: 'gallery' });
                        }
                    },
                },
            });

            // Header fade in
            galleryTl.fromTo(
                '.gallery-header',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.15 },
                0
            );

            // Cards horizontal scroll
            galleryTl.fromTo(
                '.gallery-strip',
                { xPercent: 0 },
                { xPercent: -60, ease: 'none', duration: 0.7 },
                0.1
            );

            // Individual card parallax (subtle y movement)
            gsap.utils.toArray('.gallery-card').forEach((card, i) => {
                galleryTl.fromTo(
                    card as Element,
                    { y: i % 2 === 0 ? 30 : -30 },
                    { y: i % 2 === 0 ? -30 : 30, ease: 'none', duration: 0.7 },
                    0.1
                );
            });

            // CTA buttons fade in
            galleryTl.fromTo(
                '.gallery-cta',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.1 },
                0.2
            );
        }, containerRef);

        return () => ctx.revert();
    }, [phases.length, showDebug]);

    return (
        <div ref={containerRef} className="immersive-scroll-experience">
            {showDebug && <ProgressDebug progress={debugInfo.progress} section={debugInfo.section} />}

            <SpatialIntro ref={introRef} />
            <RadialTimelineSection
                ref={timelineRef}
                phases={phases}
                progress={timelineProgress}
                activeIndex={activePhaseIndex}
            />
            <HorizontalGallerySection ref={galleryRef} cards={galleryCards} />
        </div>
    );
}

export default ImmersiveScrollExperience;
