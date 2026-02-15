"use client";

import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import { SectionHeader } from "@/components/ui/section-header";
import whyUsData from "@/data/why-us.json";
import { useMobileDetect } from "@/hooks/useMobileDetect";

export function WhyUs() {
    const { hero, valueProposition, location, accessibility } = whyUsData;
    const { isMobile, isTouchDevice } = useMobileDetect();

    return (
        <section className="hidden md:flex relative min-h-screen bg-black text-white overflow-hidden items-start justify-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />

            {/* Top Fade */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

            {/* Particle Text Effect - Desktop only (heavy canvas rendering) */}
            {!isMobile && !isTouchDevice && (
                <div className="absolute inset-0 z-10">
                    <ParticleTextEffect words={hero.particleWords} />
                </div>
            )}

            {/* Mobile: Subtle animated gradient background instead of particle canvas */}
            {(isMobile || isTouchDevice) && (
                <div className="absolute inset-0 z-10 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background: 'radial-gradient(ellipse at 40% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 60%), radial-gradient(ellipse at 60% 40%, rgba(236, 72, 153, 0.2) 0%, transparent 60%)',
                        }}
                    />
                </div>
            )}

            {/* Section Header - Content Layer */}
            <div className="relative z-20 px-4 pt-20 w-full text-center pointer-events-none">
                <SectionHeader
                    title={hero.title}
                    gradientText={hero.highlightedWord}
                    center
                    className="mb-8"
                >
                    <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-medium text-white/90">
                            {valueProposition.headline} <span className="text-[var(--color-text-muted)]">{valueProposition.subheadline}</span>
                        </h3>

                        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                            {valueProposition.description}
                        </p>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mt-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-m font-medium text-white/80">
                                {location.label} <strong className="text-white">{location.city}</strong> &bull; {location.servingLabel} <strong className="text-white">{location.targetAudience}</strong>
                            </span>
                        </div>
                    </div>
                </SectionHeader>
            </div>

            {/* Bottom Instruction Text */}
            <div className="absolute bottom-8 left-0 right-0 z-20 text-center pointer-events-none">
                <p className="text-gray-500 text-sm md:text-base">
                    {isMobile || isTouchDevice ? "" : accessibility.instruction}
                </p>
            </div>

            {/* Decorative Elements — reduced blur on mobile */}
            <div className={`absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full ${isMobile ? 'blur-xl' : 'blur-3xl'}`} />
            <div className={`absolute bottom-20 right-10 w-40 h-40 bg-pink-500/10 rounded-full ${isMobile ? 'blur-xl' : 'blur-3xl'}`} />
        </section>
    );
}
