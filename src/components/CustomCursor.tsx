"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMobileDetect } from "@/hooks/useMobileDetect";

export function CustomCursor() {
    const { isTouchDevice } = useMobileDetect();

    // Early return for touch devices — renders nothing and skips all hooks in DesktopCursor
    if (isTouchDevice) return null;

    return <DesktopCursor />;
}

/**
 * Desktop-only cursor implementation.
 * Separated into its own component so hooks never run on touch devices.
 * Removed MutationObserver — uses event delegation instead (much cheaper).
 */
function DesktopCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const ringX = useSpring(mouseX, springConfig);
    const ringY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Event delegation: check target on each move instead of per-element listeners
            const target = e.target as Element;
            const isOverInteractive = target?.closest(
                'a, button, [data-cursor="pointer"], input, textarea, [role="button"]'
            );
            setIsPointer(!!isOverInteractive);
            setIsHovering(!!isOverInteractive);
        };

        const handleMouseEnter = () => setIsHidden(false);
        const handleMouseLeave = () => {
            setIsHidden(true);
            setIsHovering(false);
            setIsPointer(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Dot cursor */}
            <motion.div
                ref={cursorRef}
                className="custom-cursor pointer-events-none fixed z-[9999] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHidden ? 0 : 1,
                }}
                transition={{ duration: 0.15, ease: "easeOut" }}
            >
                <div className="h-2 w-2 rounded-full bg-white" />
            </motion.div>

            {/* Ring cursor */}
            <motion.div
                ref={ringRef}
                className="custom-cursor pointer-events-none fixed z-[9998] mix-blend-difference"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 2 : 1,
                    opacity: isHidden ? 0 : 1,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                <div
                    className={`
            rounded-full border-2 border-white/80 transition-all duration-200
            ${isPointer ? "h-10 w-10" : "h-8 w-8"}
          `}
                />
            </motion.div>

            {/* Hide default cursor globally */}
            <style jsx global>{`
        * {
          cursor: none !important;
        }
        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
        </>
    );
}
