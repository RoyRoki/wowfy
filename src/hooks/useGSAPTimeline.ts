"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface GSAPTimelineOptions {
    trigger?: RefObject<HTMLElement | null>;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
    toggleActions?: string;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
}

export function useGSAPTimeline(
    callback: (tl: gsap.core.Timeline, ctx: gsap.Context) => void,
    options: GSAPTimelineOptions = {},
    deps: React.DependencyList = []
) {
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const contextRef = useRef<gsap.Context | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const scrollTriggerConfig: ScrollTrigger.Vars | undefined = options.trigger?.current
                ? {
                    trigger: options.trigger.current,
                    start: options.start ?? "top 80%",
                    end: options.end ?? "bottom 20%",
                    scrub: options.scrub ?? false,
                    pin: options.pin ?? false,
                    markers: options.markers ?? false,
                    toggleActions: options.toggleActions ?? "play none none reverse",
                    onEnter: options.onEnter,
                    onLeave: options.onLeave,
                    onEnterBack: options.onEnterBack,
                    onLeaveBack: options.onLeaveBack,
                }
                : undefined;

            const tl = gsap.timeline({
                scrollTrigger: scrollTriggerConfig,
            });

            timelineRef.current = tl;
            callback(tl, ctx);
        });

        contextRef.current = ctx;

        return () => {
            ctx.revert();
        };
    }, deps);

    return { timeline: timelineRef, context: contextRef };
}

// Simplified hook for stagger animations
export function useGSAPStagger(
    selector: string,
    containerRef: RefObject<HTMLElement | null>,
    options: {
        from?: gsap.TweenVars;
        to?: gsap.TweenVars;
        stagger?: number | gsap.StaggerVars;
        scrollTrigger?: boolean;
        start?: string;
    } = {}
) {
    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const elements = containerRef.current?.querySelectorAll(selector);
            if (!elements?.length) return;

            const fromVars: gsap.TweenVars = {
                opacity: 0,
                y: 50,
                scale: 0.95,
                ...options.from,
            };

            const toVars: gsap.TweenVars = {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: options.stagger ?? 0.1,
                ease: "power3.out",
                ...options.to,
            };

            if (options.scrollTrigger !== false) {
                toVars.scrollTrigger = {
                    trigger: containerRef.current,
                    start: options.start ?? "top 80%",
                    toggleActions: "play none none reverse",
                };
            }

            gsap.fromTo(elements, fromVars, toVars);
        }, containerRef);

        return () => ctx.revert();
    }, [selector, options.scrollTrigger]);
}

// Hook for scroll-triggered number counter
export function useAnimatedCounter(
    ref: RefObject<HTMLElement | null>,
    endValue: number,
    options: {
        duration?: number;
        prefix?: string;
        suffix?: string;
        decimals?: number;
    } = {}
) {
    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;
        const counter = { value: 0 };

        const ctx = gsap.context(() => {
            gsap.to(counter, {
                value: endValue,
                duration: options.duration ?? 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                onUpdate: () => {
                    const formatted = options.decimals
                        ? counter.value.toFixed(options.decimals)
                        : Math.round(counter.value).toLocaleString();
                    element.textContent = `${options.prefix ?? ""}${formatted}${options.suffix ?? ""}`;
                },
            });
        });

        return () => ctx.revert();
    }, [endValue, options.duration, options.prefix, options.suffix, options.decimals]);
}
