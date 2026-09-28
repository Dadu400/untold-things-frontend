import { useEffect, useState } from 'react';

import Particles from 'react-tsparticles';

import { loadFull } from 'tsparticles';
import { loadHeartShape } from 'tsparticles-shape-heart';
import type { Engine } from 'tsparticles-engine';
import type { ISourceOptions, IParticlesOptions, RecursivePartial } from 'tsparticles-engine';

// Hearts stay out of a lane this wide (px from the viewport centre) so the
// 340px post card keeps some breathing room around it.
const CLEAR_HALF_WIDTH = 240;
// Below this band width there is no real side gutter (phones), so hearts use
// the full width at a lower density instead.
const MIN_BAND_WIDTH = 90;

// Hearts on screen per 10,000px² of area they're allowed in: side bands on
// wider screens, the whole viewport on phones. About half the old density.
const BAND_DENSITY = 1.2;
const PHONE_DENSITY = 1.35;
// Average seconds per viewport pixel a heart needs to rise off screen, given
// the speed and depth ranges below.
const CROSSING_SECONDS_PER_PX = 0.04;
// Share of hearts that are large; the rest are small/medium.
const LARGE_SHARE = 0.12;

const baseParticle: RecursivePartial<IParticlesOptions> = {
    color: { value: ["#d93835", "#a4bafc"] },
    shape: { type: "heart" },
    stroke: { width: 1 },
    opacity: { value: { min: 0.3, max: 0.55 } },
    move: {
        enable: true,
        direction: "top",
        angle: { offset: 0, value: 16 },
        speed: { min: 1, max: 2 },
        outModes: { default: "destroy", bottom: "none" },
    },
    zIndex: {
        // Capped below 100 so the deepest hearts still drift instead of
        // stalling on screen.
        value: { min: 0, max: 70 },
        opacityRate: 0,
        velocityRate: 1,
    },
};

const smallMedium = { ...baseParticle, size: { value: { min: 7, max: 14 } } };
const large = { ...baseParticle, size: { value: { min: 17, max: 22 } } };

type Band = { x: number; width: number }; // percent of viewport width

const getBands = (viewportWidth: number): Band[] => {
    const sideWidth = viewportWidth / 2 - CLEAR_HALF_WIDTH;
    if (sideWidth < MIN_BAND_WIDTH) {
        return [{ x: 50, width: 100 }];
    }
    const pct = (sideWidth / viewportWidth) * 100;
    return [
        { x: pct / 2, width: pct },
        { x: 100 - pct / 2, width: pct },
    ];
};

const prefersReducedMotion = () =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

const buildEmitters = (viewportWidth: number, viewportHeight: number) => {
    const bands = getBands(viewportWidth);
    const density = (bands.length === 1 ? PHONE_DENSITY : BAND_DENSITY) / 10000;
    // tsparticles already thins out emission under reduced motion; do the
    // same for the initial fill so both stay consistent.
    const reduce = prefersReducedMotion() ? 0.25 : 1;

    return bands.flatMap(({ x, width }) => {
        const bandPx = (width / 100) * viewportWidth;
        const steadyCount = bandPx * viewportHeight * density;
        const perSecond = steadyCount / (viewportHeight * CROSSING_SECONDS_PER_PX);
        const smallDelay = 1 / (perSecond * (1 - LARGE_SHARE));
        const largeDelay = 1 / (perSecond * LARGE_SHARE);
        const fillCount = Math.round(steadyCount * reduce);
        const fillLarge = Math.round(fillCount * LARGE_SHARE);

        return [
            // Initial scatter over the whole band height so the page doesn't
            // start empty; these then drift up and away.
            {
                position: { x, y: 50 },
                size: { width, height: 100, mode: "percent" },
                startCount: fillCount - fillLarge,
                rate: { quantity: 0, delay: 1 },
                particles: smallMedium,
            },
            {
                position: { x, y: 50 },
                size: { width, height: 100, mode: "percent" },
                startCount: fillLarge,
                rate: { quantity: 0, delay: 1 },
                particles: large,
            },
            // Continuous trickle from just below the viewport. Delays are
            // ranges so hearts never rise in step with each other.
            {
                position: { x, y: 104 },
                size: { width, height: 4, mode: "percent" },
                rate: { quantity: 1, delay: { min: smallDelay * 0.4, max: smallDelay * 1.6 } },
                particles: smallMedium,
            },
            {
                position: { x, y: 106 },
                size: { width, height: 4, mode: "percent" },
                rate: { quantity: 1, delay: { min: largeDelay * 0.5, max: largeDelay * 1.5 } },
                particles: large,
            },
        ];
    });
};

const HeartParticlesBackground = () => {
    const [viewportWidth, setViewportWidth] = useState<number>(() => window.innerWidth);

    useEffect(() => {
        let frame = 0;
        const handleResize = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => setViewportWidth(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const particlesInit = async (main: Engine) => {
        await loadFull(main);
        await loadHeartShape(main);
    };

    const particlesOptions: ISourceOptions = {
        particles: {
            ...baseParticle,
            number: { value: 0 },
        },
        emitters: buildEmitters(viewportWidth, window.innerHeight),
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
        />
    );
};

export default HeartParticlesBackground;
