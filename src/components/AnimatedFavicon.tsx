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

            // Update all icon links
            const links = document.querySelectorAll("link[rel*='icon']");
            links.forEach((link) => {
                (link as HTMLLinkElement).href = currentIconPath;
            });

            // If no links found, create one (fallback)
            if (links.length === 0) {
                const newLink = document.createElement("link");
                newLink.rel = "icon";
                newLink.href = currentIconPath;
                document.head.appendChild(newLink);
            }
        }, 1000); // Change every 1 second

        return () => clearInterval(intervalId);
    }, []);



    return null;
}
