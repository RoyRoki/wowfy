"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedCounterProps {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
    className?: string;
}

export function AnimatedCounter({
    value,
    prefix = "",
    suffix = "",
    decimals = 0,
    duration = 2,
    className = "",
}: AnimatedCounterProps) {
    const counterRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!counterRef.current || hasAnimated.current) return;

        const element = counterRef.current;
        const counter = { value: 0 };

        const ctx = gsap.context(() => {
            gsap.to(counter, {
                value,
                duration,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    toggleActions: "play none none none",
                    onEnter: () => {
                        hasAnimated.current = true;
                    },
                },
                onUpdate: () => {
                    const formatted = decimals > 0
                        ? counter.value.toFixed(decimals)
                        : Math.round(counter.value).toLocaleString();
                    element.textContent = `${prefix}${formatted}${suffix}`;
                },
            });
        });

        return () => ctx.revert();
    }, [value, prefix, suffix, decimals, duration]);

    return (
        <span ref={counterRef} className={className}>
            {prefix}0{suffix}
        </span>
    );
}
