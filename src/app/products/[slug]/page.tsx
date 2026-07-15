import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import { ProductDetails } from '@/components/sections/ProductDetails';
import type { Product } from '@/types/data';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, SITE_NAME, ORG_ID } from '@/lib/seo';

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Required for static export
export async function generateStaticParams() {
    const products = productsData as Product[];
    return products.map((product) => ({
        slug: product.id,
    }));
}

function findProduct(slug: string): Product | undefined {
    const products = productsData as Product[];
    return products.find((p) => p.id === slug);
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = findProduct(slug);

    if (!product) {
        return { title: 'Product Not Found' };
    }

    const title = `${product.name} — ${product.tagline}`;
    const description = product.description;
    const canonical = `/products/${product.id}/`;
    const image = product.images?.og || product.images?.hero || '/opengraph-image.jpg';

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            type: 'website',
            url: `${SITE_URL}${canonical}`,
            siteName: SITE_NAME,
            title,
            description,
            images: [image],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = findProduct(slug);

    if (!product) {
        notFound();
    }

    const canonical = `${SITE_URL}/products/${product.id}/`;

    const structuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: product.name,
            applicationCategory: product.category,
            description: product.description,
            url: canonical,
            image: product.images?.og ? `${SITE_URL}${product.images.og}` : undefined,
            publisher: { '@id': ORG_ID },
            author: { '@id': ORG_ID },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/#products` },
                { '@type': 'ListItem', position: 3, name: product.name, item: canonical },
            ],
        },
    ];

    return (
        <>
            <JsonLd data={structuredData} />
            <ProductDetails product={product} />
        </>
    );
}
