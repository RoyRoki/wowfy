'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowUpRight, MessageCircle, Rocket } from 'lucide-react';
import Link from 'next/link';
import { SvgRevealText } from '@/components/ui/svg-reveal-text';
import { InteractiveDotGrid } from '@/components/ui/interactive-dot-grid';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import productsData from '@/data/products.json';
import type { Product } from '@/types/data';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const list = productsData as Product[];

const WHATSAPP_NUMBER = '919800881300';
const BUILD_TOGETHER_MESSAGE = "Hi! I have a product idea and I'd like to partner with Wowfy to build it.";

function hexToRgb(hex: string): string {
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean, 16);
    return `${(bigint >> 16) & 255},${(bigint >> 8) & 255},${bigint & 255}`;
}

export function Products() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const trackWrapRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
    const glowRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [activeIndex, setActiveIndex] = useState(0);
    const [buildTogether, setBuildTogether] = useState(false);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const prevAccentRef = useRef<string | undefined>(list[0]?.accentColor);

    // Cross-fade the ambient glow to the active card's accent color.
    useEffect(() => {
        const activeAccent = list[activeIndex]?.accentColor;
        if (!activeAccent || activeAccent === prevAccentRef.current) return;

        const outgoingAccent = prevAccentRef.current;
        const incomingEl = glowRefs.current[activeAccent];
        const outgoingEl = outgoingAccent ? glowRefs.current[outgoingAccent] : null;
        prevAccentRef.current = activeAccent;

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

    const handleBuildToggle = (value: boolean) => {
        setBuildTogether(value);
        if (value) {
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(BUILD_TOGETHER_MESSAGE)}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div ref={sectionRef} className="relative flex h-screen w-full flex-col overflow-hidden bg-[var(--color-background)]">
            {/* Dots background */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 size-full">
                <InteractiveDotGrid spacing={14} radius={1} influence={140} maxPush={32} />
            </div>

            {/* Ambient glow — cross-fades to match the active card's accent */}
            <div aria-hidden className="absolute inset-0 -z-10 isolate contain-strict">
                {list.map((p) => (
                    <div
                        key={p.id}
                        ref={(el) => {
                            glowRefs.current[p.accentColor] = el;
                        }}
                        className="absolute inset-0"
                        style={{
                            opacity: list[0]?.accentColor === p.accentColor ? 1 : 0,
                            background: `radial-gradient(circle at 8% 15%, rgba(${hexToRgb(p.accentColor)},0.22) 0%, transparent 40%), radial-gradient(circle at 92% 90%, rgba(${hexToRgb(p.accentColor)},0.14) 0%, transparent 38%)`,
                        }}
                    />
                ))}
            </div>

            <section className="mx-auto flex h-full w-full max-w-6xl flex-col px-4 pt-6 pb-8 sm:pt-10 md:pt-24">
                {/* Heading */}
                <div ref={headingRef} className="mx-auto mb-3 max-w-2xl shrink-0 text-center sm:mb-4">
                    <p className="text-xs font-mono tracking-[0.2em] text-white/40 uppercase mb-2 sm:mb-3">
                        My Products
                    </p>
                    <h2 className="link text-2xl font-extrabold tracking-tight sm:text-3xl md:text-5xl text-white">
                        Proof, not just{' '}
                        <SvgRevealText text="promises" />
                    </h2>
                </div>

                {/* Build-together bar — desktop only, mobile is tight on vertical space */}
                <div className="mx-auto mb-6 hidden w-full max-w-2xl shrink-0 items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 sm:flex [@media(max-height:700px)]:!hidden">
                    <span className="flex items-center gap-2 text-xs md:text-sm text-white/60">
                        <MessageCircle size={14} className="text-emerald-400" />
                        Got a product idea? I&apos;m ready to partner.
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="hidden sm:inline text-xs text-white/40">
                            {buildTogether ? "Let's talk" : 'Flip it'}
                        </span>
                        <Switch checked={buildTogether} onCheckedChange={handleBuildToggle} />
                    </div>
                </div>

                {/* Tab strip */}
                <nav aria-label="Product navigation" className="mx-auto w-full max-w-4xl shrink-0 border-b border-white/8 px-6 md:px-10">
                    <div
                        ref={tabsRef}
                        className="flex items-center gap-0 overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {list.map((p, i) => {
                            const isActive = activeIndex === i;
                            return (
                                <button
                                    key={p.id}
                                    type="button"
                                    data-tab-index={i}
                                    aria-current={isActive ? 'true' : undefined}
                                    onClick={() => goToIndex(i)}
                                    className={cn(
                                        '-mb-px inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm transition-colors sm:py-4',
                                        isActive ? 'border-white text-white' : 'border-transparent text-white/40 hover:text-white/70',
                                    )}
                                >
                                    <span className="font-mono text-xs">{p.code}</span>
                                    <span className="hidden sm:inline">{p.name}</span>
                                    {p.status === 'upcoming' && (
                                        <Rocket size={11} className="text-white/40" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Horizontal, scroll-driven card track */}
                <div className="mx-auto mt-4 min-h-0 w-full max-w-4xl flex-1 px-6 sm:mt-6 md:px-10">
                    <div ref={trackWrapRef} className="relative h-full w-full overflow-hidden">
                        <div ref={trackRef} className="flex h-full w-full will-change-transform">
                            {list.map((p, i) => {
                                const rgb = hexToRgb(p.accentColor);
                                const isLive = p.status === 'live';
                                return (
                                    <div
                                        key={p.id}
                                        ref={(el) => {
                                            panelRefs.current[i] = el;
                                        }}
                                        className="h-full w-full shrink-0 px-1"
                                    >
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.02]">
                                            {/* Banner — on short viewports it becomes the full card
                                                background (blurred/darkened) instead of a shrinking top
                                                strip, so there's always room for the text. */}
                                            <Link
                                                href={`/products/${p.id}`}
                                                className="group/banner relative min-h-0 flex-[1.3] overflow-hidden block [@media(max-height:700px)]:absolute [@media(max-height:700px)]:inset-0 [@media(max-height:700px)]:flex-none"
                                            >
                                                {p.images?.hero ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={p.images.hero}
                                                        alt={p.name}
                                                        className="size-full object-cover transition-transform duration-500 group-hover/banner:scale-105 [@media(max-height:700px)]:blur-md [@media(max-height:700px)]:scale-110"
                                                    />
                                                ) : (
                                                    <div
                                                        aria-hidden="true"
                                                        className="size-full"
                                                        style={{
                                                            background: `radial-gradient(circle at 25% 30%, rgba(${rgb},0.22), transparent 55%), radial-gradient(circle at 80% 75%, rgba(${rgb},0.22), transparent 50%), var(--color-background-alt)`,
                                                        }}
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent [@media(max-height:700px)]:from-black/30 [@media(max-height:700px)]:via-black/10" />
                                                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/banner:bg-black/20" />

                                                <div className="absolute top-4 left-4 md:top-5 md:left-5">
                                                    {isLive ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                                                            <span className="relative flex h-1.5 w-1.5">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                                                            </span>
                                                            Live
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
                                                            <Rocket size={11} /> Upcoming
                                                        </span>
                                                    )}
                                                </div>

                                                <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/banner:opacity-100">
                                                    View journey <ArrowUpRight className="size-3" />
                                                </span>
                                            </Link>

                                            <div className="relative shrink-0 p-5 md:p-8 [@media(max-height:700px)]:absolute [@media(max-height:700px)]:inset-0 [@media(max-height:700px)]:z-10 [@media(max-height:700px)]:overflow-y-auto [@media(max-height:700px)]:pt-14 [@media(max-height:700px)]:bg-black/30 [@media(max-height:700px)]:backdrop-blur-[2px]">
                                                <div className="flex items-start justify-between gap-4 mb-3 md:mb-5">
                                                    <div>
                                                        <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-1">
                                                            {p.name}
                                                        </h3>
                                                        <p className="text-sm font-medium" style={{ color: p.accentColor }}>
                                                            {p.tagline}
                                                        </p>
                                                    </div>
                                                    {isLive && p.url ? (
                                                        <a
                                                            href={p.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="shrink-0 flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
                                                        >
                                                            Visit Live <ArrowUpRight className="size-3" />
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            href={`/products/${p.id}`}
                                                            className="shrink-0 flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
                                                        >
                                                            The Story <ArrowUpRight className="size-3" />
                                                        </Link>
                                                    )}
                                                </div>

                                                <p className="text-sm text-white/50 leading-relaxed mb-4 max-w-xl">
                                                    {p.description}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                                    {p.stats.map((stat) => (
                                                        <div
                                                            key={stat.label}
                                                            className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08]"
                                                        >
                                                            <span className="text-xs font-semibold text-white">{stat.value}</span>{' '}
                                                            <span className="text-[10px] uppercase tracking-wide text-white/40">
                                                                {stat.label}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <Link
                                                    href={`/products/${p.id}`}
                                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white hover:gap-2.5 transition-all"
                                                >
                                                    View full journey <ArrowUpRight className="size-3.5" />
                                                </Link>
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
