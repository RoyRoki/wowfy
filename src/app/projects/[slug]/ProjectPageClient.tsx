"use client";

import { useRouter } from 'next/navigation';
import { ProjectDetails } from '@/components/sections/ProjectDetails';
import type { Project } from '@/components/ui/Project3DCard';

interface ProjectPageClientProps {
    project: Project;
}

export function ProjectPageClient({ project }: ProjectPageClientProps) {
    const router = useRouter();

    const handleClose = () => {
        router.push('/#portfolio');
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            <ProjectDetails project={project} onClose={handleClose} />
        </div>
    );
}
