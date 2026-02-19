import { notFound } from 'next/navigation';
import projectsData from '@/data/projects.json';
import { ProjectPageClient } from './ProjectPageClient';
import type { Project } from '@/components/ui/Project3DCard';

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Required for static export
export async function generateStaticParams() {
    const projects = projectsData as unknown as Project[];
    return projects.map((project) => ({
        slug: project.id,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const projects = projectsData as unknown as Project[];
    const project = projects.find((p) => p.id === slug);

    if (!project) {
        notFound();
    }

    return <ProjectPageClient project={project} />;
}
