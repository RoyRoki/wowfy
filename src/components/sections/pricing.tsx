'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BentoPricing } from '@/components/ui/bento-pricing';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function PricingSection() {
    const headingRef = useRef<HTMLDivElement>(null);
    const pricingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate heading fade in from bottom
            gsap.from(headingRef.current, {
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            // Animate pricing cards with stagger
            gsap.from(pricingRef.current, {
                scrollTrigger: {
                    trigger: pricingRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
                y: 60,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative flex size-full min-h-screen items-center justify-center overflow-hidden py-24 bg-[var(--color-background)]">
            {/* Dots Pattern Background */}
            <div
                aria-hidden="true"
                className={cn(
                    'absolute inset-0 -z-10 size-full',
                    'bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]',
                    'bg-[size:12px_12px]',
                )}
            />

            <div
                aria-hidden
                className="absolute inset-0 isolate -z-10 opacity-30 contain-strict"
            >
                <div className="absolute top-0 left-0 h-[800px] w-[350px] -translate-y-[350px] -rotate-45 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,rgba(139,92,246,0.02)_50%,transparent_100%)]" />
                <div className="absolute top-0 left-0 h-[800px] w-[240px] translate-x-[5%] -translate-y-1/2 -rotate-45 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.04)_0%,transparent_100%)]" />
                <div className="absolute top-0 left-0 h-[800px] w-[240px] -translate-y-[350px] -rotate-45 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.04)_0%,transparent_100%)]" />
            </div>

            <section className="mx-auto w-full max-w-5xl p-4">
                {/* Heading */}
                <div ref={headingRef} className="mx-auto mb-10 max-w-2xl text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-white">
                        Data-Driven Growth
                    </h1>
                    <p className="text-[var(--color-text-muted)] mt-4 text-sm md:text-base">
                        Are you tired of using outdated tools and insights that hold your
                        team back? We built our pricing around modern teams, so you can
                        focus on what matters most.
                    </p>
                </div>
                <div ref={pricingRef}>
                    <BentoPricing />
                </div>
            </section>
        </div>
    );
}
