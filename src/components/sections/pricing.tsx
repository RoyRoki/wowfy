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
        <div className="bg-[radial-gradient(35%_80%_at_50%_0%,--theme(--color-foreground/.1),transparent)] relative flex size-full min-h-screen items-center justify-center overflow-hidden py-24">
            {/* Dots */}
            <div
                aria-hidden="true"
                className={cn(
                    'absolute inset-0 -z-10 size-full',
                    'bg-[radial-gradient(color-mix(in_oklab,--theme(--color-foreground/.2)30%,transparent)_1px,transparent_1px)]',
                    'bg-[size:12px_12px]',
                )}
            />

            <div
                aria-hidden
                className="absolute inset-0 isolate -z-10 opacity-80 contain-strict"
            >
                <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
                <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
                <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
            </div>

            <section className="mx-auto w-full max-w-5xl p-4">
                {/* Heading */}
                <div ref={headingRef} className="mx-auto mb-10 max-w-2xl text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl">
                        Data-Driven Growth
                    </h1>
                    <p className="text-muted-foreground mt-4 text-sm md:text-base">
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
