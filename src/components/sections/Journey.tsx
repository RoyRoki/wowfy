"use client";

import { Calendar, Code, FileText, User, Clock } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

import journeyData from "@/data/journey.json";
import { JourneyItem } from "@/types/data";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
    Calendar,
    FileText,
    Code,
    User,
    Clock,
};

const timelineData = journeyData.map((item) => ({
    ...item,
    icon: iconMap[item.icon] || Calendar,
    status: item.status as "completed" | "in-progress" | "pending",
}));

export function Journey() {
    return (
        <section id="journey" className="relative overflow-hidden">
            <RadialOrbitalTimeline timelineData={timelineData} />
        </section>
    );
}

export default Journey;
