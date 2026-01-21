'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, SparklesIcon } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

type PricingCardProps = {
    titleBadge: string;
    priceLabel: string;
    priceSuffix?: string;
    features: string[];
    cta?: string;
    className?: string;
};

function FilledCheck() {
    return (
        <div className="bg-primary text-primary-foreground rounded-full p-0.5">
            <CheckIcon className="size-3" strokeWidth={3} />
        </div>
    );
}

function PricingCard({
    titleBadge,
    priceLabel,
    priceSuffix = '/month',
    features,
    cta = 'Contact Now',
    className,
}: PricingCardProps) {
    return (
        <div
            className={cn(
                'bg-background border-foreground/10 relative overflow-hidden rounded-md border pricing-card',
                'supports-[backdrop-filter]:bg-background/10 backdrop-blur',
                className,
            )}
        >
            <div className="flex items-center gap-3 p-4">
                <Badge variant="secondary">{titleBadge}</Badge>
                <div className="ml-auto">
                    <Link href="#contact">
                        <Button variant="outline">{cta}</Button>
                    </Link>
                </div>
            </div>

            <div className="flex items-end gap-2 px-4 py-2">
                <span className="font-mono text-5xl font-semibold tracking-tight">
                    {priceLabel}
                </span>
                {priceLabel.toLowerCase() !== 'free' && (
                    <span className="text-muted-foreground text-sm">{priceSuffix}</span>
                )}
            </div>

            <ul className="text-muted-foreground grid gap-4 p-4 text-sm">
                {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                        <FilledCheck />
                        <span>{f}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function BentoPricing() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate all pricing cards with stagger
            gsap.from('.pricing-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
                y: 80,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-8">
            <div
                className={cn(
                    'bg-background border-foreground/10 relative w-full overflow-hidden rounded-md border pricing-card',
                    'supports-[backdrop-filter]:bg-background/10 backdrop-blur',
                    'lg:col-span-5',
                )}
            >
                <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                    <div className="from-foreground/5 to-foreground/2 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
                        <div
                            aria-hidden="true"
                            className={cn(
                                'absolute inset-0 size-full mix-blend-overlay',
                                'bg-[linear-gradient(to_right,--theme(--color-foreground/.1)_1px,transparent_1px)]',
                                'bg-[size:24px]',
                            )}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4">
                    <Badge variant="secondary">GROWTH</Badge>
                    <Badge variant="outline" className="hidden lg:flex">
                        <SparklesIcon className="me-1 size-3" /> Most Recommended
                    </Badge>
                    <div className="ml-auto">
                        <Link href="#contact">
                            <Button>Contact Now</Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col p-4 lg:flex-row">
                    <div className="pb-4 lg:w-[30%]">
                        <span className="font-mono text-5xl font-semibold tracking-tight">
                            $299
                        </span>
                        <span className="text-muted-foreground text-sm">/month</span>
                    </div>
                    <ul className="text-muted-foreground grid gap-4 text-sm lg:w-[70%]">
                        {[
                            'Full Stack Development',
                            'SEO Optimization',
                            'Digital Marketing Integration',
                            'Performance Analytics',
                        ].map((f, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <FilledCheck />
                                <span className="leading-relaxed">{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <PricingCard
                titleBadge="BASIC"
                priceLabel="$99"
                features={[
                    'Static Website',
                    'Basic SEO',
                    'Content Management',
                ]}
                className="lg:col-span-3"
            />

            <PricingCard
                titleBadge="PROFESSIONAL"
                priceLabel="$499"
                features={[
                    'E-commerce Solutions',
                    'Custom Web Applications',
                    'API Integrations',
                ]}
                className="lg:col-span-4"
            />

            <PricingCard
                titleBadge="ENTERPRISE"
                priceLabel="Custom"
                priceSuffix=""
                features={[
                    'Custom Software Solutions',
                    'Dedicated Support',
                    'Cloud Infrastructure',
                    'Security Audits',
                ]}
                className="lg:col-span-4"
            />
        </div>
    );
}
