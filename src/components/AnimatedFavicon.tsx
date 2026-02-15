"use client";

import { useEffect, useRef } from "react";
import { assetPath } from "@/lib/utils";

const iconPaths = [
    "/favicons/server.svg",
    "/favicons/mobile.svg",
    "/favicons/web.svg",
    "/favicons/cloud.svg",
];

export function AnimatedFavicon() {
    const cachedDataUrls = useRef<string[]>([]);

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;
        let cancelled = false;

        // Fetch all SVGs once and convert to data URLs
        Promise.all(
            iconPaths.map((p) =>
                fetch(assetPath(p))
                    .then((r) => r.text())
                    .then(
                        (svg) =>
                            `data:image/svg+xml,${encodeURIComponent(svg)}`
                    )
            )
        ).then((dataUrls) => {
            if (cancelled) return;
            cachedDataUrls.current = dataUrls;

            // Slower interval on mobile to reduce overhead
            const isMobile = window.matchMedia("(max-width: 768px)").matches;
            const interval = isMobile ? 3000 : 1000;

            let iconIndex = 0;
            intervalId = setInterval(() => {
                iconIndex = (iconIndex + 1) % dataUrls.length;
                const dataUrl = dataUrls[iconIndex];

                const links = document.querySelectorAll("link[rel*='icon']");
                links.forEach((link) => {
                    (link as HTMLLinkElement).href = dataUrl;
                });

                if (links.length === 0) {
                    const newLink = document.createElement("link");
                    newLink.rel = "icon";
                    newLink.href = dataUrl;
                    document.head.appendChild(newLink);
                }
            }, interval);
        });

        return () => {
            cancelled = true;
            clearInterval(intervalId);
        };
    }, []);

    return null;
}
