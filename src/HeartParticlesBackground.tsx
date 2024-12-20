import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { loadHeartShape } from 'tsparticles-shape-heart';
import type { Engine } from 'tsparticles-engine';
import type { ISourceOptions } from 'tsparticles-engine';

const HeartParticlesBackground = () => {
    const particlesInit = async (main: Engine) => {
        await loadFull(main);
        await loadHeartShape(main);
    };

    const particlesOptions: ISourceOptions = {
        particles: {
            color: {
                value: [
                    "#F1CDE3", "#E03424",
                ],
            },
            move: {
                angle: {
                    offset: 0,
                    value: 15,
                },
                direction: "top",
                enable: true,
                outModes: {
                    default: "out",
                },
                speed: 3,
            },
            number: {
                value: 400,
            },
            opacity: {
                value: 1,
            },
            shape: {
                type: "heart",
            },
            size: {
                value: 20,
                random: true,
            },
            roll: {
                enlighten: {
                    enable: true,
                    value: 30,
                },
                enable: true,
                mode: "horizontal",
                speed: {
                    min: 5,
                    max: 15,
                },
            },
            zIndex: {
                value: {
                    min: 0,
                    max: 100,
                },
                opacityRate: 0,
                velocityRate: 2,
            },
        },
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
