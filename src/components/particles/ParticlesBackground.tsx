import { useEffect, useMemo, useState } from 'react';

import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import type { IManualParticle, ISourceOptions, RecursivePartial } from 'tsparticles-engine';

// Letters per 1,000,000px² of viewport; roughly 40% fewer than the old
// density-based count (100 per megapixel).
const LETTERS_PER_MEGAPIXEL = 62;

// Each letter wanders at most this far (px) from its home position, so the
// layout below holds instead of slowly evening out.
const DRIFT = 20;
// Extra clearance (px) between two letters, on top of their radii and drift.
const GAP = 16;

// Compose card footprint (see NewPost): max 380px wide incl. 16px gutters, 420px tall.
const CARD_MAX_HALF_WIDTH = 190;
const CARD_HALF_HEIGHT = 210;
// The card sits ~25px above the viewport centre (footer is taller than the header).
const CARD_OFFSET_Y = -25;

// Size tiers as [share, min radius, max radius, min opacity, max opacity].
// Radius is half the rendered glyph size. Small/medium make up the bulk, and
// large letters are rare and a little fainter so they don't dominate.
const TIERS: [number, number, number, number, number][] = [
    [0.58, 7, 10, 0.42, 0.55],
    [0.34, 11, 15, 0.36, 0.48],
    [0.08, 17, 22, 0.26, 0.36],
];

const MAX_ATTEMPTS_PER_LETTER = 60;

type Letter = { x: number; y: number; r: number };

const smoothstep = (t: number) => {
    const c = Math.min(1, Math.max(0, t));
    return c * c * (3 - 2 * c);
};

const pickTier = () => {
    let roll = Math.random();
    for (const tier of TIERS) {
        roll -= tier[0];
        if (roll <= 0) return tier;
    }
    return TIERS[0];
};

const between = (min: number, max: number) => min + Math.random() * (max - min);

// Chance (0–1) of keeping a letter at (x, y): zero right around the card,
// easing back in further out, and slightly favouring the viewport edges.
const acceptance = (x: number, y: number, w: number, h: number) => {
    const narrow = w < 640;
    const cardHalfWidth = Math.min(CARD_MAX_HALF_WIDTH, w / 2);
    const cx = w / 2;
    const cy = h / 2 + CARD_OFFSET_Y;

    // Distance from the card's edge (0 inside it).
    const dx = Math.max(0, Math.abs(x - cx) - cardHalfWidth);
    const dy = Math.max(0, Math.abs(y - cy) - CARD_HALF_HEIGHT);
    const fromCard = Math.hypot(dx, dy);

    // Phones have almost no side gutter, so the clear band is kept thin there.
    const clear = narrow ? 8 : 56;
    const falloff = narrow ? 60 : 200;
    const nearCard = smoothstep((fromCard - clear) / falloff);

    const edgeness = Math.max(Math.abs(x - cx) / (w / 2), Math.abs(y - cy) / (h / 2));
    return nearCard * (0.6 + 0.4 * Math.min(1, edgeness));
};

// Dart-throwing layout: random candidates, rejected by the card safe zone and
// by a minimum spacing, so letters never cluster yet don't fall into a grid.
const layoutLetters = (w: number, h: number): Letter[] => {
    const target = Math.round((w * h / 1_000_000) * LETTERS_PER_MEGAPIXEL);
    const letters: Letter[] = [];

    for (let attempt = 0; letters.length < target && attempt < target * MAX_ATTEMPTS_PER_LETTER; attempt++) {
        const tier = pickTier();
        const r = between(tier[1], tier[2]);
        const x = between(r, w - r);
        const y = between(r, h - r);

        if (Math.random() > acceptance(x, y, w, h)) continue;

        const crowded = letters.some(
            (other) => Math.hypot(other.x - x, other.y - y) < r + other.r + 2 * DRIFT + GAP
        );
        if (crowded) continue;

        letters.push({ x, y, r });
    }

    return letters;
};

const opacityFor = (r: number) => {
    const tier = TIERS.find(([, , max]) => r <= max) ?? TIERS[TIERS.length - 1];
    return { min: tier[3], max: tier[4] };
};

const buildManualParticles = (w: number, h: number): RecursivePartial<IManualParticle>[] =>
    layoutLetters(w, h).map(({ x, y, r }) => ({
        position: { x: (x / w) * 100, y: (y / h) * 100 },
        options: {
            size: { value: r },
            opacity: { value: opacityFor(r) },
        },
    }));

type Viewport = { width: number; height: number };

// Mobile browsers change innerHeight as the address bar shows/hides; only
// re-layout on real resizes so letters don't reshuffle while scrolling.
const HEIGHT_CHANGE_THRESHOLD = 150;

const ParticlesBackground = () => {
    const [viewport, setViewport] = useState<Viewport>(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
    }));

    useEffect(() => {
        let frame = 0;
        const handleResize = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                setViewport((prev) => {
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    const changed = width !== prev.width || Math.abs(height - prev.height) > HEIGHT_CHANGE_THRESHOLD;
                    return changed ? { width, height } : prev;
                });
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const particlesInit = async (main: Engine) => {
        await loadFull(main);
    };

    const particlesOptions: ISourceOptions = useMemo(() => ({
        fpsLimit: 60,
        interactivity: {
            events: {
                onClick: { enable: false },
            },
        },
        manualParticles: buildManualParticles(viewport.width, viewport.height),
        particles: {
            number: { value: 0 },
            color: { value: "random" },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "out" },
                random: false,
                speed: { min: 0.25, max: 0.45 },
                straight: false,
                distance: { horizontal: DRIFT, vertical: DRIFT },
            },
            rotate: {
                value: { min: 0, max: 360 },
                direction: "random",
                animation: {
                    enable: true,
                    speed: { min: 0.6, max: 1.4 },
                    sync: false
                }
            },
            opacity: {
                value: { min: 0.42, max: 0.55 },
                animation: { enable: true, speed: 0.15, sync: false, startValue: "random" },
            },
            shape: {
                character: [
                    {
                        fill: true,
                        font: "Verdana",
                        style: "",
                        value: "რაცვერგითხარი".split(""),
                        weight: "400"
                    },
                    {
                        fill: false,
                        font: "Verdana",
                        style: "",
                        value: "ჰიდროელექტროსადგური".split(""),
                        weight: "400"
                    }
                ],
                type: "char"
            },
            size: { value: 10 },
        },
        // tsparticles' default: slows movement and rotation 4× when the user
        // prefers reduced motion.
        motion: { reduce: { value: true, factor: 4 } },
        detectRetina: true
    }), [viewport]);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
        />
    );
};

export default ParticlesBackground;
