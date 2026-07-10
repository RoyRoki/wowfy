"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Skip Lenis on touch devices — native scroll is more performant
        const isTouchDevice =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;

        if (isTouchDevice) {
            // Still need ScrollTrigger updates via native scroll
            ScrollTrigger.defaults({ scroller: window });
            ScrollTrigger.refresh();
            return;
        }

        // Initialize Lenis smooth scrolling (desktop only)
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Pinned sections cache their scroll-range dimensions at creation time.
        // Async layout shifts (webfonts swapping in, images loading, the SVG
        // glyph-draw headlines resizing) after that can leave them stale,
        // which shows up as jumps/padding mismatches while pinned. Refresh once
        // everything's actually settled.
        const refresh = () => ScrollTrigger.refresh();
        if (document.readyState === "complete") {
            requestAnimationFrame(refresh);
        } else {
            window.addEventListener("load", refresh);
        }
        document.fonts?.ready?.then(refresh);

        // Single RAF via GSAP ticker (removed duplicate requestAnimationFrame loop)
        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            lenis.destroy();
            gsap.ticker.remove(tickerCallback);
            lenisRef.current = null;
            window.removeEventListener("load", refresh);
        };
    }, []);

    return <>{children}</>;
}
