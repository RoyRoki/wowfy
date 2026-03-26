'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckIcon, SparklesIcon, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import servicesData from '@/data/what-we-build.json';

gsap.registerPlugin(ScrollTrigger);

type Service = {
    id: string;
    badge: string;
    hook: string;
    description: string;
    features: string[];
    stack: string[];
    timeline: string;
    featured: boolean;
};

function FilledCheck() {
    return (
        <div className="bg-primary text-primary-foreground rounded-full p-0.5 shrink-0">
            <CheckIcon className="size-3" strokeWidth={3} />
        </div>
    );
}

function StackTag({ label }: { label: string }) {
    return (
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/50 font-mono">
            {label}
        </span>
    );
}

function ServiceCard({ service, className }: { service: Service; className?: string }) {
    return (
        <div
            className={cn(
                'wwb-card group relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.03]',
                'transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.05]',
                className,
            )}
        >
            {/* Featured grid overlay */}
            {service.featured && (
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/8 via-transparent to-transparent" />
                    <div
                        aria-hidden="true"
                        className={cn(
                            'absolute inset-0',
                            'bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)]',
                            'bg-[size:24px_24px]',
                            '[mask-image:radial-gradient(ellipse_at_top_right,white_20%,transparent_70%)]',
                        )}
                    />
                </div>
            )}

            <div className="relative flex h-full flex-col p-6">
                {/* Top row */}
                <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="font-mono text-[10px] tracking-widest">
                            {service.badge}
                        </Badge>
                        {service.featured && (
                            <Badge variant="outline" className="hidden lg:flex text-[10px] border-violet-500/30 text-violet-400">
                                <SparklesIcon className="me-1 size-3" /> Most Popular
                            </Badge>
                        )}
                    </div>
                    <a
                        href="https://wa.me/919800881300"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
                    >
                        Let&apos;s Talk <ArrowUpRight className="size-3" />
                    </a>
                </div>

                {/* Hook */}
                <h3 className="text-xl font-bold text-white leading-snug mb-2">
                    {service.hook}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/45 leading-relaxed mb-5">
                    {service.description}
                </p>

                {/* Features */}
                <ul className="grid gap-2.5 mb-6">
                    {service.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-white/60">
                            <FilledCheck />
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>

                {/* Bottom row */}
                <div className="mt-auto flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                        {service.stack.map((s) => (
                            <StackTag key={s} label={s} />
                        ))}
                    </div>
                    <span className="shrink-0 text-xs text-white/30 font-mono">{service.timeline}</span>
                </div>
            </div>
        </div>
    );
}

function RefactorBanner({ service }: { service: Service }) {
    return (
        <div className="wwb-card group relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.05]">
            {/* Subtle background glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent" />
            </div>

            <div className="relative flex flex-col gap-6 p-6 lg:flex-row lg:items-center">
                {/* Left: badge + hook + desc */}
                <div className="lg:w-[45%]">
                    <Badge variant="secondary" className="font-mono text-[10px] tracking-widest mb-4">
                        {service.badge}
                    </Badge>
                    <h3 className="text-xl font-bold text-white leading-snug mb-2">
                        {service.hook}
                    </h3>
                    <p className="text-sm text-white/45 leading-relaxed">
                        {service.description}
                    </p>
                </div>

                {/* Right: features + meta */}
                <div className="lg:w-[35%]">
                    <ul className="grid gap-2.5">
                        {service.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-2.5 text-sm text-white/60">
                                <FilledCheck />
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA */}
                <div className="flex flex-col items-start gap-3 lg:w-[20%] lg:items-end">
                    <div className="flex flex-wrap gap-1.5">
                        {service.stack.map((s) => (
                            <StackTag key={s} label={s} />
                        ))}
                    </div>
                    <span className="text-xs text-white/30 font-mono">{service.timeline}</span>
                    <a
                        href="https://wa.me/919800881300"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
                    >
                        Let&apos;s Talk <ArrowUpRight className="size-3.5 ml-0.5" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export function WhatWeBuild() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    const cards = servicesData.filter((s) => s.id !== 'refactor') as Service[];
    const refactor = servicesData.find((s) => s.id === 'refactor') as Service;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: 'top 82%',
                    toggleActions: 'play none none reverse',
                },
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
            });

            gsap.from('.wwb-card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
                y: 60,
                opacity: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Grid col spans: landing(4), business(8), mvp(8), mobile(4)
    const colSpans: Record<string, string> = {
        landing: 'lg:col-span-4',
        business: 'lg:col-span-8',
        mvp: 'lg:col-span-8',
        mobile: 'lg:col-span-4',
    };

    return (
        <div ref={sectionRef} className="relative flex size-full min-h-screen items-center justify-center overflow-hidden py-24 bg-[var(--color-background)]">
            {/* Dots background */}
            <div
                aria-hidden="true"
                className={cn(
                    'absolute inset-0 -z-10 size-full',
                    'bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)]',
                    'bg-[size:14px_14px]',
                )}
            />

            {/* Ambient glow */}
            <div aria-hidden className="absolute inset-0 isolate -z-10 opacity-25 contain-strict">
                <div className="absolute top-1/3 right-0 h-[600px] w-[400px] translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,transparent_70%)]" />
                <div className="absolute bottom-1/4 left-0 h-[500px] w-[350px] -translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.08)_0%,transparent_70%)]" />
            </div>

            <section className="mx-auto w-full max-w-6xl px-4">
                {/* Heading */}
                <div ref={headingRef} className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="text-xs font-mono tracking-[0.2em] text-white/40 uppercase mb-3">
                        What We Build
                    </p>
                    <h2 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-white">
                        Pick your launchpad
                    </h2>
                    <p className="text-white/40 mt-4 text-sm md:text-base leading-relaxed">
                        From scroll-stopping landing pages to full-stack products — we build
                        what your vision demands. No templates. No shortcuts. Just craft.
                    </p>
                </div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-12">
                    {cards.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            className={colSpans[service.id]}
                        />
                    ))}
                </div>

                {/* Refactor banner */}
                {refactor && (
                    <div className="mt-3">
                        <RefactorBanner service={refactor} />
                    </div>
                )}
            </section>
        </div>
    );
}
