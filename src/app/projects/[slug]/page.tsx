import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import projectsData from '@/data/projects.json';
import { ProjectPageClient } from './ProjectPageClient';
import type { Project } from '@/components/ui/Project3DCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, SITE_NAME, ORG_ID } from '@/lib/seo';

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

function findProject(slug: string): Project | undefined {
    const projects = projectsData as unknown as Project[];
    return projects.find((p) => p.id === slug);
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = findProject(slug);

    if (!project) {
        return { title: 'Project Not Found' };
    }

    const title = `${project.title} — ${project.role ?? 'Case Study'}`;
    const description = project.description ?? `${project.title}, built by ${SITE_NAME}.`;
    const canonical = `/projects/${project.id}/`;
    const image = project.image ? [project.image] : ['/opengraph-image.jpg'];

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            type: 'article',
            url: `${SITE_URL}${canonical}`,
            siteName: SITE_NAME,
            title,
            description,
            images: image,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: image,
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = findProject(slug);

    if (!project) {
        notFound();
    }

    const canonical = `${SITE_URL}/projects/${project.id}/`;

    const structuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            headline: project.title,
            description: project.description,
            url: canonical,
            image: project.image ? `${SITE_URL}${project.image}` : undefined,
            dateCreated: project.year,
            keywords: Array.isArray(project.tech) ? project.tech.join(', ') : undefined,
            creator: { '@id': ORG_ID },
            author: { '@id': ORG_ID },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/#portfolio` },
                { '@type': 'ListItem', position: 3, name: project.title, item: canonical },
            ],
        },
    ];

    return (
        <>
            <JsonLd data={structuredData} />
            <ProjectPageClient project={project} />
        </>
    );
}
