'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SvgRevealText } from '@/components/ui/svg-reveal-text';
import { InteractiveDotGrid } from '@/components/ui/interactive-dot-grid';
import { cn } from '@/lib/utils';
import services from '@/data/what-we-build.json';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type Service = {
    id: string;
    code: string;
    category: string;
    accent: keyof typeof ACCENTS;
    title: string;
    description: string;
    features: string[];
    image?: string;
};

const list = services as Service[];

const ACCENTS = {
    violet: { rgb: '139,92,246', text: 'text-violet-400', border: 'border-violet-500/30' },
    cyan: { rgb: '6,182,212', text: 'text-cyan-400', border: 'border-cyan-500/30' },
    amber: { rgb: '245,158,11', text: 'text-amber-400', border: 'border-amber-500/30' },
    emerald: { rgb: '16,185,129', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    rose: { rgb: '244,63,94', text: 'text-rose-400', border: 'border-rose-500/30' },
} as const;

const ACCENT_KEYS = Object.keys(ACCENTS) as (keyof typeof ACCENTS)[];

export function WhatWeBuild() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const trackWrapRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
    const glowRefs = useRef<Partial<Record<keyof typeof ACCENTS, HTMLDivElement | null>>>({});
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const prevIndexRef = useRef(0);
    const prevAccentKeyRef = useRef<keyof typeof ACCENTS | undefined>(list[0]?.accent);

    // Cross-fade the ambient glow to the active card's accent color — kept minimal.
    useEffect(() => {
        const activeKey = list[activeIndex]?.accent;
        prevIndexRef.current = activeIndex;

        if (!activeKey || activeKey === prevAccentKeyRef.current) return;

        const outgoingKey = prevAccentKeyRef.current;
        const incomingEl = glowRefs.current[activeKey];
        const outgoingEl = outgoingKey ? glowRefs.current[outgoingKey] : null;
        prevAccentKeyRef.current = activeKey;

        if (!incomingEl) return;

        gsap.to(incomingEl, { opacity: 1, duration: 0.8, ease: 'power1.inOut', overwrite: 'auto' });
        if (outgoingEl) {
            gsap.to(outgoingEl, { opacity: 0, duration: 0.8, ease: 'power1.inOut', overwrite: 'auto' });
        }
    }, [activeIndex]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            });

            const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
            const track = trackRef.current;
            const wrap = trackWrapRef.current;
            if (!track || !wrap || panels.length === 0) return;

            const lastIndex = panels.length - 1;
            let currentIdx = 0;
            let animating = false;
            let st: ScrollTrigger;

            // Step exactly one card at a time — locked while transitioning, so a
            // single scroll gesture can never skip a card or leave a blended state.
            const stepTo = (idx: number) => {
                idx = gsap.utils.clamp(0, lastIndex, idx);
                if (idx === currentIdx || animating) return;
                animating = true;
                currentIdx = currentIdx + (idx > currentIdx ? 1 : -1);
                setActiveIndex(currentIdx);

                gsap.to(track, {
                    x: -currentIdx * wrap.clientWidth,
                    duration: 0.5,
                    ease: 'power3.inOut',
                    overwrite: 'auto',
                    onComplete: () => {
                        animating = false;
                        // Catch up one more step if the user scrolled further while locked.
                        const target = Math.round(st.progress * lastIndex);
                        if (target !== currentIdx) stepTo(target);
                    },
                });

                panels.forEach((panel, i) => {
                    const dist = Math.min(Math.abs(currentIdx - i), 1);
                    gsap.to(panel, {
                        opacity: gsap.utils.interpolate(1, 0.12, dist),
                        scale: gsap.utils.interpolate(1, 0.86, dist),
                        filter: `blur(${dist * 8}px)`,
                        duration: 0.5,
                        ease: 'power3.inOut',
                        overwrite: 'auto',
                    });
                });
            };

            st = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: () => '+=' + lastIndex * window.innerHeight,
                pin: true,
                scrub: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (animating) return;
                    const target = Math.round(self.progress * lastIndex);
                    if (target !== currentIdx) stepTo(target);
                },
            });

            scrollTriggerRef.current = st;
        }, sectionRef);

        return () => {
            ctx.revert();
            scrollTriggerRef.current = null;
        };
    }, []);

    // Keep the active tab scrolled into view within the tab strip.
    useEffect(() => {
        const container = tabsRef.current;
        const tab = container?.querySelector<HTMLElement>(`[data-tab-index="${activeIndex}"]`);
        if (!container || !tab) return;
        const cRect = container.getBoundingClientRect();
        const tRect = tab.getBoundingClientRect();
        container.scrollBy({
            left: tRect.left - cRect.left - (container.clientWidth - tab.clientWidth) / 2,
            behavior: 'smooth',
        });
    }, [activeIndex]);

    const goToIndex = (idx: number) => {
        const st = scrollTriggerRef.current;
        if (!st) return;
        const lastIndex = list.length - 1;
        const target = st.start + (idx / lastIndex) * (st.end - st.start);
        gsap.to(window, { duration: 1, scrollTo: { y: target }, ease: 'power2.inOut' });
    };

    return (
        <div ref={sectionRef} className="relative flex h-screen w-full flex-col overflow-hidden bg-[var(--color-background)]">
            {/* Dots background — dots near the cursor get pushed away */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 size-full">
                <InteractiveDotGrid spacing={14} radius={1} influence={140} maxPush={32} />
            </div>

            {/* Ambient glow — cross-fades to match the active card's accent */}
            <div aria-hidden className="absolute inset-0 -z-10 isolate contain-strict">
                {ACCENT_KEYS.map((key) => (
                    <div
                        key={key}
                        ref={(el) => {
                            glowRefs.current[key] = el;
                        }}
                        className="absolute inset-0"
                        style={{
                            opacity: list[0]?.accent === key ? 1 : 0,
                            background: `radial-gradient(circle at 8% 15%, rgba(${ACCENTS[key].rgb},0.22) 0%, transparent 40%), radial-gradient(circle at 92% 90%, rgba(${ACCENTS[key].rgb},0.14) 0%, transparent 38%)`,
                        }}
                    />
                ))}
            </div>

            <section className="mx-auto flex h-full w-full max-w-6xl flex-col px-4 pt-20 pb-8 md:pt-24">
                {/* Heading */}
                <div ref={headingRef} className="mx-auto mb-6 max-w-2xl shrink-0 text-center">
                    <p className="text-xs font-mono tracking-[0.2em] text-white/40 uppercase mb-3">
                        What We Build
                    </p>
                    <h2 className="link text-3xl font-extrabold tracking-tight md:text-5xl text-white">
                        Pick your{" "}
                        <SvgRevealText text="launchpad" />
                    </h2>
                </div>

                {/* Tab strip */}
                <nav aria-label="Service navigation" className="mx-auto w-full max-w-4xl shrink-0 border-b border-white/8 px-6 md:px-10">
                    <div
                        ref={tabsRef}
                        className="flex items-center gap-0 overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {list.map((s, i) => {
                            const isActive = activeIndex === i;
                            return (
                                <button
                                    key={s.id}
                                    type="button"
                                    data-tab-index={i}
                                    aria-current={isActive ? 'true' : undefined}
                                    onClick={() => goToIndex(i)}
                                    className={cn(
                                        '-mb-px inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-4 py-4 text-sm transition-colors',
                                        isActive ? 'border-white text-white' : 'border-transparent text-white/40 hover:text-white/70',
                                    )}
                                >
                                    <span className="font-mono text-xs">{s.code}</span>
                                    <span className="hidden sm:inline">{s.category}</span>
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Horizontal, scroll-driven card track */}
                <div className="mx-auto mt-6 min-h-0 w-full max-w-4xl flex-1 px-6 md:px-10">
                    <div ref={trackWrapRef} className="relative h-full w-full overflow-hidden">
                        <div ref={trackRef} className="flex h-full w-full will-change-transform">
                            {list.map((s, i) => {
                                const accent = ACCENTS[s.accent] ?? ACCENTS.violet;
                                return (
                                <div
                                    key={s.id}
                                    ref={(el) => {
                                        panelRefs.current[i] = el;
                                    }}
                                    className="h-full w-full shrink-0 px-1"
                                >
                                    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.02]">
                                        {/* Banner — visual only, no text baked in */}
                                        <div className="relative min-h-0 flex-[1.3] overflow-hidden">
                                            {s.image ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={s.image} alt="" className="size-full object-cover" />
                                            ) : (
                                                <div
                                                    aria-hidden="true"
                                                    className="size-full"
                                                    style={{
                                                        background: `radial-gradient(circle at 25% 30%, rgba(${accent.rgb},0.22), transparent 55%), radial-gradient(circle at 80% 75%, rgba(${accent.rgb},0.22), transparent 50%), var(--color-background-alt)`,
                                                    }}
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
                                        </div>

                                        <div className="relative shrink-0 p-5 md:p-8">
                                            <div className="flex items-start justify-between gap-4 mb-3 md:mb-5">
                                                <Badge
                                                    variant="outline"
                                                    className={cn('font-mono text-[10px] tracking-widest', accent.border, accent.text)}
                                                >
                                                    <span className="hidden sm:inline">{s.code} · </span>
                                                    {s.category}
                                                </Badge>
                                                <a
                                                    href="https://wa.me/919800881300"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hidden shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white sm:flex"
                                                >
                                                    Let&apos;s Talk <ArrowUpRight className="size-3" />
                                                </a>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-2">
                                                {s.title}
                                            </h3>
                                            <p className="text-sm text-white/50 leading-relaxed mb-4 max-w-xl">
                                                {s.description}
                                            </p>

                                            <ul className="grid gap-2 sm:grid-cols-3 sm:gap-4">
                                                {s.features.map((f, fi) => (
                                                    <li key={fi} className="text-xs md:text-sm text-white/60 leading-relaxed">
                                                        — {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
