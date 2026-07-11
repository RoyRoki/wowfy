import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import { ProductDetails } from '@/components/sections/ProductDetails';
import type { Product } from '@/types/data';

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

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const products = productsData as Product[];
    const product = products.find((p) => p.id === slug);

    if (!product) {
        notFound();
    }

    return <ProductDetails product={product} />;
}
