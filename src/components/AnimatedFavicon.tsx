"use client";

import { useEffect } from "react";
import { assetPath } from "@/lib/utils";

const icons = [
    "/favicons/server.svg",
    "/favicons/mobile.svg",
    "/favicons/web.svg",
    "/favicons/cloud.svg",
];

export function AnimatedFavicon() {
    useEffect(() => {
        let iconIndex = 0;
        const intervalId = setInterval(() => {
            iconIndex = (iconIndex + 1) % icons.length;
            const currentIconPath = assetPath(icons[iconIndex]);

            // Update standard icon
            const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
            if (link) {
                link.href = currentIconPath;
            } else {
                const newLink = document.createElement("link");
                newLink.rel = "icon";
                newLink.href = currentIconPath;
                document.head.appendChild(newLink);
            }

            // Also try to update other icon types if they exist to be thorough
            const appleLink: HTMLLinkElement | null = document.querySelector("link[rel='apple-touch-icon']");
            if (appleLink) {
                appleLink.href = currentIconPath;
            }
        }, 1000); // Change every 1 second

        return () => clearInterval(intervalId);
    }, []);

    return null;
}
