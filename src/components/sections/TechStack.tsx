"use client";

import type { ComponentType, CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/section-header";
import { GlowCard } from "@/components/ui/GlowCard";
import { cn } from "@/lib/utils";
import techStackData from "@/data/tech-stack.json";
import type { TechStackData } from "@/types/data";
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiFramer,
    SiGreensock,
    SiThreedotjs,
    SiFigma,
    SiNodedotjs,
    SiGo,
    SiPostgresql,
    SiMongodb,
    SiDocker,
    SiGit,
    SiGithub,
    SiVercel,
    SiFlutter,
    SiSwift,
    SiShopify,
    SiWhatsapp,
    SiClaude,
    SiOpenai,
    SiGooglegemini,
    SiN8n,
} from "@icons-pack/react-simple-icons";

gsap.registerPlugin(ScrollTrigger);

type SimpleIcon = ComponentType<{ size?: number; color?: string; style?: CSSProperties }>;

const ICONS: Record<string, SimpleIcon> = {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiFramer,
    SiGreensock,
    SiThreedotjs,
    SiFigma,
    SiNodedotjs,
    SiGo,
    SiPostgresql,
    SiMongodb,
    SiDocker,
    SiGit,
    SiGithub,
    SiVercel,
    SiFlutter,
    SiSwift,
    SiShopify,
    SiWhatsapp,
    SiClaude,
    SiOpenai,
    SiGooglegemini,
    SiN8n,
};

const data = techStackData as TechStackData;

function IconCell({ icon, name, src }: { icon?: string; name: string; src?: string }) {
    const Icon = icon ? ICONS[icon] : undefined;
    return (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/25 hover:bg-white/[0.06]">
            {Icon ? (
                <Icon size={26} color="#ffffff" style={{ opacity: 0.85 }} />
            ) : src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={name} className="h-[26px] w-auto object-contain" />
            ) : null}
            <span className="text-[11px] text-white/60 text-center leading-tight">{name}</span>
        </div>
    );
}

export function TechStack() {
    const mobileRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    // Mobile-only: pin the section for the group count and flip each card in on
    // rotateY, one scroll step at a time. Desktop keeps the static grid below.
    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(max-width: 767px)", () => {
            const mobile = mobileRef.current;
            const track = trackRef.current;
            const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
            if (!mobile || !track || cards.length === 0) return;

            const lastIndex = cards.length - 1;
            let currentIdx = 0;
            let animating = false;
            let st: ScrollTrigger;

            // Initial 3D state — first card flat/visible, the rest flipped away.
            cards.forEach((card, i) => {
                gsap.set(card, {
                    transformPerspective: 1000,
                    transformOrigin: "center center",
                    rotateY: i === 0 ? 0 : 55,
                    scale: i === 0 ? 1 : 0.85,
                    opacity: i === 0 ? 1 : 0.1,
                });
            });

            // Step exactly one card at a time — locked while transitioning so a
            // single scroll gesture can't skip a card or leave a blended state.
            const stepTo = (idx: number) => {
                idx = gsap.utils.clamp(0, lastIndex, idx);
                if (idx === currentIdx || animating) return;
                animating = true;
                currentIdx += idx > currentIdx ? 1 : -1;
                setActiveIndex(currentIdx);

                gsap.to(track, {
                    // Step by the card (track) width, not the padded section width.
                    x: -currentIdx * track.clientWidth,
                    duration: 0.55,
                    ease: "power3.inOut",
                    overwrite: "auto",
                    onComplete: () => {
                        animating = false;
                        const target = Math.round(st.progress * lastIndex);
                        if (target !== currentIdx) stepTo(target);
                    },
                });

                cards.forEach((card, i) => {
                    const isActive = i === currentIdx;
                    gsap.to(card, {
                        rotateY: isActive ? 0 : i < currentIdx ? -55 : 55,
                        scale: isActive ? 1 : 0.85,
                        opacity: isActive ? 1 : 0.1,
                        duration: 0.55,
                        ease: "power3.inOut",
                        overwrite: "auto",
                    });
                });
            };

            st = ScrollTrigger.create({
                trigger: mobile,
                start: "top top",
                end: () => "+=" + lastIndex * window.innerHeight,
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

            return () => {
                st.kill();
            };
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            id="tech-stack"
            className="relative overflow-hidden bg-[var(--color-background)] md:section-padding"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background-alt)]/30 via-transparent to-[var(--color-background-alt)]/30" />
            <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(circle at 12% 8%, rgba(99,102,241,0.16) 0%, transparent 45%), radial-gradient(circle at 88% 82%, rgba(99,102,241,0.12) 0%, transparent 42%)`,
                }}
            />
            <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(var(--color-accent) 1px, transparent 1px),
                        linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                    opacity: 0.07,
                    maskImage: "radial-gradient(ellipse at 50% 30%, black, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black, transparent 75%)",
                }}
            />

            {/* ---------- Desktop: static grid ---------- */}
            <div className="container-wide relative z-10 hidden md:block">
                <SectionHeader
                    eyebrow={data.eyebrow}
                    title={data.title}
                    gradientText={data.gradientText}
                    description={data.description}
                    center
                    className="mb-16"
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
                    {data.groups.map((group, gi) => (
                        <motion.div
                            key={group.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: gi * 0.1 }}
                        >
                            <GlowCard className="h-full p-6 md:p-8">
                                <h3 className="text-lg font-semibold text-white mb-1">{group.label}</h3>
                                <p className="text-sm text-white/50 mb-6">{group.description}</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {group.items.map((item) => (
                                        <IconCell key={item.id} icon={item.icon} name={item.name} src={item.src} />
                                    ))}
                                </div>
                            </GlowCard>
                        </motion.div>
                    ))}
                </div>

                <p className="text-body text-[var(--color-text-muted)] leading-relaxed text-center max-w-2xl mx-auto mt-14">
                    {data.footerText}
                </p>
            </div>

            {/* ---------- Mobile: pinned 3D flip carousel ---------- */}
            <div
                ref={mobileRef}
                className="relative z-10 flex h-screen w-full flex-col overflow-hidden px-4 pt-20 pb-10 md:hidden"
            >
                <div className="shrink-0 text-center mb-4">
                    <p className="text-xs font-mono tracking-[0.2em] text-white/40 uppercase mb-2">
                        {data.eyebrow}
                    </p>
                    <h2 className="text-2xl font-extrabold tracking-tight text-white">
                        {data.title}{" "}
                        <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-highlight)] bg-clip-text text-transparent">
                            {data.gradientText}
                        </span>
                    </h2>
                </div>

                {/* Track — each card carries its own transformPerspective (set in
                    GSAP), so the track's 2D translate never flattens the flip. */}
                <div className="relative min-h-0 flex-1">
                    <div ref={trackRef} className="flex h-full w-full will-change-transform">
                        {data.groups.map((group, gi) => (
                            <div
                                key={group.id}
                                className="flex h-full w-full shrink-0 items-center justify-center"
                            >
                                <div
                                    ref={(el) => {
                                        cardRefs.current[gi] = el;
                                    }}
                                    className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm will-change-transform"
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="font-mono text-xs tracking-widest text-[var(--color-accent)]">
                                            {String(gi + 1).padStart(2, "0")} / {String(data.groups.length).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">{group.label}</h3>
                                    <p className="text-sm text-white/50 mb-6">{group.description}</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        {group.items.map((item) => (
                                            <IconCell key={item.id} icon={item.icon} name={item.name} src={item.src} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress dots */}
                <div className="mt-4 flex shrink-0 items-center justify-center gap-2">
                    {data.groups.map((group, gi) => (
                        <span
                            key={group.id}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                gi === activeIndex ? "w-6 bg-[var(--color-accent)]" : "w-1.5 bg-white/20",
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -right-32 top-1/4 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -left-32 bottom-1/4 w-64 h-64 bg-[var(--color-highlight)]/10 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
}
