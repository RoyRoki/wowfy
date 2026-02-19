"use client";

import { useRouter } from 'next/navigation';
import { ProjectDetails } from '@/components/sections/ProjectDetails';
import type { Project } from '@/components/ui/Project3DCard';

interface ProjectPageClientProps {
    project: Project;
}

export function ProjectPageClient({ project }: ProjectPageClientProps) {
    const router = useRouter();

    const from = typeof window !== 'undefined'
        ? sessionStorage.getItem('projectFrom')
        : null;

    const handleClose = () => {
        sessionStorage.removeItem('projectFrom');
        if (from === 'projects') {
            router.push('/projects');
        } else {
            window.location.href = '/#portfolio';
        }
    };

    const backLabel = from === 'projects' ? 'Back to All Projects' : 'Back to Works';

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            <ProjectDetails
                project={project}
                onClose={handleClose}
                backLabel={backLabel}
            />
        </div>
    );
}
