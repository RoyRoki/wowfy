"use client";

import { useEffect, useState } from "react";

interface DeviceCapabilities {
    isTouchDevice: boolean;
    isLowPerformance: boolean;
    prefersReducedMotion: boolean;
}

/**
 * Custom hook for device capability detection
 * @returns DeviceCapabilities object
 */
export function useDeviceDetection(): DeviceCapabilities {
    const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
        isTouchDevice: false,
        isLowPerformance: false,
        prefersReducedMotion: false,
    });

    useEffect(() => {
        // Check if window is defined (client-side only)
        if (typeof window === "undefined") return;

        // Detect touch device
        const isTouchDevice =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            // @ts-expect-error - legacy property
            navigator.msMaxTouchPoints > 0;

        // Detect reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        // Detect low performance device (heuristic)
        // Check for hardware concurrency (CPU cores) and device memory
        const isLowPerformance = (() => {
            // @ts-expect-error - experimental API
            const deviceMemory = navigator.deviceMemory;
            const hardwareConcurrency = navigator.hardwareConcurrency || 4;

            // Low-end device heuristics:
            // - Less than 4GB RAM
            // - Less than 4 CPU cores
            // - Touch device (likely mobile)
            if (deviceMemory && deviceMemory < 4) return true;
            if (hardwareConcurrency < 4 && isTouchDevice) return true;

            return false;
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps -- We want to run this detection once on mount
        setCapabilities({
            isTouchDevice,
            isLowPerformance,
            prefersReducedMotion,
        });
    }, []);

    return capabilities;
}
