"use client";

import { useRef, useCallback, RefObject } from "react";
import gsap from "gsap";

interface MagneticOptions {
    strength?: number;
    radius?: number;
    ease?: string;
    duration?: number;
}

export function useMagneticCursor(
    ref: RefObject<HTMLElement | null>,
    options: MagneticOptions = {}
) {
    const { strength = 0.3, radius = 100, ease = "power3.out", duration = 0.4 } = options;
    const isHovering = useRef(false);
    const bounds = useRef<DOMRect | null>(null);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!ref.current || !bounds.current) return;

            const { clientX, clientY } = e;
            const { left, top, width, height } = bounds.current;

            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const distanceX = clientX - centerX;
            const distanceY = clientY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < radius) {
                isHovering.current = true;
                const pull = 1 - distance / radius;
                const moveX = distanceX * strength * pull;
                const moveY = distanceY * strength * pull;

                gsap.to(ref.current, {
                    x: moveX,
                    y: moveY,
                    duration,
                    ease,
                });
            } else if (isHovering.current) {
                isHovering.current = false;
                gsap.to(ref.current, {
                    x: 0,
                    y: 0,
                    duration,
                    ease,
                });
            }
        },
        [ref, strength, radius, ease, duration]
    );

    const handleMouseLeave = useCallback(() => {
        if (!ref.current) return;
        isHovering.current = false;
        gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration,
            ease,
        });
    }, [ref, duration, ease]);

    const bind = useCallback(() => {
        if (!ref.current) return { onMouseEnter: () => { }, onMouseMove: () => { }, onMouseLeave: () => { } };

        return {
            onMouseEnter: () => {
                if (ref.current) {
                    bounds.current = ref.current.getBoundingClientRect();
                }
            },
            onMouseMove: (e: React.MouseEvent) => handleMouseMove(e.nativeEvent),
            onMouseLeave: handleMouseLeave,
        };
    }, [ref, handleMouseMove, handleMouseLeave]);

    return { bind };
}

// Simple magnetic wrapper component props
export interface MagneticProps {
    children: React.ReactNode;
    strength?: number;
    radius?: number;
    className?: string;
}
