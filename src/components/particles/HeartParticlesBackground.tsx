import { useEffect, useState } from 'react';

import Particles from 'react-tsparticles';

import { loadFull } from 'tsparticles';
import { loadHeartShape } from 'tsparticles-shape-heart';
import type { Engine } from 'tsparticles-engine';
import type { ISourceOptions } from 'tsparticles-engine';

const HeartParticlesBackground = () => {
    const [screenSize, setScreenSize] = useState<string>('lg');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setScreenSize('lg');
            } else if (window.innerWidth >= 1024) {
                setScreenSize('md');
            } else if (window.innerWidth >= 640) {
                setScreenSize('sm');
            } else {
                setScreenSize('xs');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const particlesInit = async (main: Engine) => {
        await loadFull(main);
        await loadHeartShape(main);
    };

    const getParticleNumber = (screen: string) => {
        switch (screen) {
            case 'lg':
                return 300;
            case 'md':
                return 200;
            case 'sm':
                return 150;
            case 'xs':
            default:
                return 100;
        }
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
                value: getParticleNumber(screenSize),
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
