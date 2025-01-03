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
                    "#d93835", "#a4bafc",
                ],
            },
            move: {
                angle: {
                    offset: 0,
                    value: 30,
                },
                direction: "top",
                enable: true,
                outModes: {
                    default: "out",
                },
                speed: 4,
            },
            number: {
                value: 200,
            },
            opacity: {
                value: 0.7,
            },
            shape: {
                type: "heart",
            },
            size: {
                value: 20,
                random: {
                    enable: true,
                    minimumValue: 15,
                },
            },
            stroke: {
                width: 1,
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
