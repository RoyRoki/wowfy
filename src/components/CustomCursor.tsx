"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(true);

    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    // Mouse position with spring physics
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the ring (follows cursor with delay)
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const ringX = useSpring(mouseX, springConfig);
    const ringY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Check if touch device
        const checkTouch = () => {
            setIsTouchDevice(
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0
            );
        };

        checkTouch();

        if (isTouchDevice) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsHidden(false);
        const handleMouseLeave = () => setIsHidden(true);

        // Track interactive elements
        const handleInteractiveEnter = () => {
            setIsHovering(true);
            setIsPointer(true);
        };

        const handleInteractiveLeave = () => {
            setIsHovering(false);
            setIsPointer(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        // Add listeners to interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, [data-cursor="pointer"], input, textarea, [role="button"]'
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleInteractiveEnter);
            el.addEventListener("mouseleave", handleInteractiveLeave);
        });

        // MutationObserver to handle dynamically added elements
        const observer = new MutationObserver(() => {
            const newElements = document.querySelectorAll(
                'a, button, [data-cursor="pointer"], input, textarea, [role="button"]'
            );
            newElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleInteractiveEnter);
                el.removeEventListener("mouseleave", handleInteractiveLeave);
                el.addEventListener("mouseenter", handleInteractiveEnter);
                el.addEventListener("mouseleave", handleInteractiveLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);

            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleInteractiveEnter);
                el.removeEventListener("mouseleave", handleInteractiveLeave);
            });

            observer.disconnect();
        };
    }, [isTouchDevice, mouseX, mouseY]);

    // Don't render on touch devices
    if (isTouchDevice) return null;

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
