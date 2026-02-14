"use client";

import { useEffect } from "react";

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
            const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
            if (link) {
                link.href = icons[iconIndex];
            } else {
                const newLink = document.createElement("link");
                newLink.rel = "icon";
                newLink.href = icons[iconIndex];
                document.head.appendChild(newLink);
            }
        }, 1000); // Change every 1 second

        return () => clearInterval(intervalId);
    }, []);

    return null;
}
