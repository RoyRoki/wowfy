"use client";

import { useState, useEffect } from "react";

/**
 * Detects mobile/touch devices for conditional rendering of heavy components.
 * Uses matchMedia for screen width and checks touch capabilities.
 * 
 * Implemented with useState/useEffect to ensure hydration safety.
 * Returns false initially (matching SSR) and updates on client mount.
 */

const MOBILE_BREAKPOINT = "(max-width: 768px)";
const TOUCH_QUERY = "(hover: none) and (pointer: coarse)";

export function useMobileDetect() {
    // Default to false (desktop/server state) to match SSR
    const [isMobile, setIsMobile] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const mqlMobile = window.matchMedia(MOBILE_BREAKPOINT);
        const mqlTouch = window.matchMedia(TOUCH_QUERY);

        const checkDevice = () => {
            setIsMobile(mqlMobile.matches);
            setIsTouchDevice(mqlTouch.matches);
        };

        // Initial check
        checkDevice();

        // Listen for changes
        const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        const handleTouchChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);

        // Modern browsers use addEventListener
        mqlMobile.addEventListener("change", handleMobileChange);
        mqlTouch.addEventListener("change", handleTouchChange);

        return () => {
            mqlMobile.removeEventListener("change", handleMobileChange);
            mqlTouch.removeEventListener("change", handleTouchChange);
        };
    }, []);

    return { isMobile, isTouchDevice };
}
