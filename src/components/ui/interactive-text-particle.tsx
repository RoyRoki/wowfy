import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Pointer {
    x?: number;
    y?: number;
}

interface Particle {
    ox: number;
    oy: number;
    cx: number;
    cy: number;
    or: number;
    cr: number;
    pv: number;
    ov: number;
    f: number;
    rgb: number[];
    draw(ctx: CanvasRenderingContext2D): void;
    move(interactionRadius: number, hasPointer: boolean, pointer: Pointer, isForming: boolean, ctx: CanvasRenderingContext2D): boolean;
}

interface TextBox {
    str: string;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
}

class ParticleClass implements Particle {
    ox: number;
    oy: number;
    cx: number;
    cy: number;
    or: number;
    cr: number;
    pv: number;
    ov: number;
    f: number;
    rgb: number[];
    animationForce: number;

    constructor(
        x: number,
        y: number,
        rgb: number[],
        shouldScatter: boolean,
        canvasWidth: number,
        canvasHeight: number,
        animationForce: number = 80
    ) {
        this.ox = x;
        this.oy = y;
        this.animationForce = animationForce;

        if (shouldScatter) {
            this.cx = Math.random() * canvasWidth;
            this.cy = Math.random() * canvasHeight;
        } else {
            this.cx = x;
            this.cy = y;
        }

        this.or = Math.random() * 4 + 1; // rand(5, 1) equivalent
        this.cr = this.or;
        this.pv = 0;
        this.ov = 0;
        this.f = (animationForce + 15) - Math.random() * 30; // rand(force+15, force-15)
        this.rgb = rgb.map(c => Math.max(0, c + (Math.random() * 26 - 13)));
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgb(${this.rgb.join(',')})`;
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, this.cr, 0, 2 * Math.PI);
        ctx.fill();
    }

    move(
        interactionRadius: number,
        hasPointer: boolean,
        pointer: Pointer,
        isForming: boolean,
        ctx: CanvasRenderingContext2D
    ) {
        let moved = false;

        if (hasPointer && pointer.x !== undefined && pointer.y !== undefined) {
            const dx = this.cx - pointer.x;
            const dy = this.cy - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < interactionRadius && dist > 0) {
                const force = Math.min(this.f, (interactionRadius - dist) / dist * 2);
                this.cx += (dx / dist) * force;
                this.cy += (dy / dist) * force;
                moved = true;
            }
        }

        const odx = this.ox - this.cx;
        const ody = this.oy - this.cy;
        const od = Math.hypot(odx, ody);

        if (od > 1) {
            const restoreMultiplier = isForming ? 0.08 : 0.1;
            const restore = Math.min(od * restoreMultiplier, isForming ? 8 : 3);
            this.cx += (odx / od) * restore;
            this.cy += (ody / od) * restore;
            moved = true;
        }

        this.draw(ctx);
        return moved;
    }
}

export interface ParticleTextEffectProps {
    text?: string;
    colors?: string[];
    className?: string;
    animationForce?: number;
    particleDensity?: number;
    enableInitialAnimation?: boolean;
}

const ParticleTextEffect: React.FC<ParticleTextEffectProps> = ({
    text = 'HOVER!',
    colors = [
        'ffad70', 'f7d297', 'edb9a1', 'e697ac', 'b38dca',
        '9c76db', '705cb5', '43428e', '2c2142'
    ],
    className = '',
    animationForce = 80,
    particleDensity = 4,
    enableInitialAnimation = false,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const pointerRef = useRef<Pointer>({});
    const hasPointerRef = useRef<boolean>(false);
    const interactionRadiusRef = useRef<number>(100);
    const isFormingRef = useRef<boolean>(enableInitialAnimation);
    const formingProgressRef = useRef<number>(0);

    const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    });

    const textBoxRef = useRef<TextBox>({ str: text });

    const dottify = useCallback(() => {
        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        if (!ctx || !canvas || !textBoxRef.current.x || !textBoxRef.current.y || !textBoxRef.current.w || !textBoxRef.current.h) return;

        const data = ctx.getImageData(textBoxRef.current.x, textBoxRef.current.y, textBoxRef.current.w, textBoxRef.current.h).data;

        // Filter and map pixels
        const pixels: { x: number; y: number; rgb: number[] }[] = [];
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            const x = (i / 4) % textBoxRef.current.w!;
            const y = Math.floor((i / 4) / textBoxRef.current.w!);

            if (a && !(x % particleDensity) && !(y % particleDensity)) {
                pixels.push({
                    x,
                    y,
                    rgb: [r, g, b, a],
                });
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pixels.forEach((p, i) => {
            particlesRef.current[i] = new ParticleClass(
                textBoxRef.current.x! + p.x,
                textBoxRef.current.y! + p.y,
                p.rgb.slice(0, 3),
                enableInitialAnimation,
                canvas.width,
                canvas.height,
                animationForce
            );
            if (ctxRef.current) particlesRef.current[i].draw(ctxRef.current);
        });

        particlesRef.current.splice(pixels.length, particlesRef.current.length);
    }, [particleDensity, enableInitialAnimation, animationForce]);

    const write = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!canvas || !ctx) return;

        textBoxRef.current.str = text;
        textBoxRef.current.h = Math.floor(canvas.width / textBoxRef.current.str.length);

        interactionRadiusRef.current = Math.max(50, textBoxRef.current.h * 1.5);

        ctx.font = `900 ${textBoxRef.current.h}px Verdana, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        textBoxRef.current.w = Math.round(ctx.measureText(textBoxRef.current.str).width);
        textBoxRef.current.x = 0.5 * (canvas.width - textBoxRef.current.w);
        textBoxRef.current.y = 0.5 * (canvas.height - textBoxRef.current.h);

        const gradient = ctx.createLinearGradient(textBoxRef.current.x, textBoxRef.current.y, textBoxRef.current.x + textBoxRef.current.w, textBoxRef.current.y + textBoxRef.current.h);
        const N = colors.length - 1;
        colors.forEach((c, i) => gradient.addColorStop(i / N, `#${c}`));
        ctx.fillStyle = gradient;

        ctx.fillText(textBoxRef.current.str, 0.5 * canvas.width, 0.5 * canvas.height);
        dottify();
    }, [text, colors, dottify]);

    const animate = useCallback(function animateLoop() {
        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        if (!ctx || !canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Handle initial forming animation
        if (isFormingRef.current && formingProgressRef.current < 1) {
            formingProgressRef.current += 0.015; // Adjust speed (lower = slower)
            if (formingProgressRef.current >= 1) {
                formingProgressRef.current = 1;
                isFormingRef.current = false;
            }
        }

        particlesRef.current.forEach(p => {
            if (ctx) p.move(interactionRadiusRef.current, hasPointerRef.current, pointerRef.current, isFormingRef.current, ctx);
        });
        animationIdRef.current = requestAnimationFrame(animateLoop);
    }, []);

    const initialize = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!canvas || !ctx) return;

        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        write();
    }, [canvasSize, write]);

    useEffect(() => {
        const updateSize = () => {
            if (canvasRef.current?.parentElement) {
                const { clientWidth, clientHeight } = canvasRef.current.parentElement;
                setCanvasSize({ width: clientWidth, height: clientHeight });
            } else if (typeof window !== 'undefined') {
                setCanvasSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
        };

        updateSize();

        let resizeObserver: ResizeObserver | null = null;
        if (canvasRef.current?.parentElement) {
            resizeObserver = new ResizeObserver(() => {
                updateSize();
            });
            resizeObserver.observe(canvasRef.current.parentElement);
        } else {
            window.addEventListener('resize', updateSize);
        }

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            } else {
                window.removeEventListener('resize', updateSize);
            }
        };
    }, []);

    useEffect(() => {
        initialize();
    }, [initialize]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctxRef.current = ctx;
        initialize();

        // Set up Intersection Observer to start animation when visible
        if (enableInitialAnimation) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && isFormingRef.current && formingProgressRef.current === 0) {
                            // Start the animation loop when the canvas becomes visible
                            if (!animationIdRef.current) {
                                animate();
                            }
                        }
                    });
                },
                {
                    threshold: 0.1, // Trigger when 10% of the element is visible
                    rootMargin: '0px' // No margin
                }
            );

            observer.observe(canvas);

            return () => {
                if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
                observer.disconnect();
            };
        }

        return () => {
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        };
    }, [enableInitialAnimation, initialize, animate]);

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        pointerRef.current.x = (e.clientX - rect.left) * scaleX;
        pointerRef.current.y = (e.clientY - rect.top) * scaleY;
        hasPointerRef.current = true;

        if (!animationIdRef.current) animate();
    };

    const handlePointerLeave = () => {
        hasPointerRef.current = false;
        pointerRef.current.x = undefined;
        pointerRef.current.y = undefined;

        if (!animationIdRef.current) animate();
    };

    const handlePointerEnter = () => {
        hasPointerRef.current = true;
    };

    return (
        <canvas
            ref={canvasRef}
            className={`w-full h-full ${className} cursor-none`}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerEnter={handlePointerEnter}
        />
    );
};

export { ParticleTextEffect };
