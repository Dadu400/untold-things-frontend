import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import type { ISourceOptions } from 'tsparticles-engine';

const ParticlesBackground = () => {
    const particlesInit = async (main: Engine) => {
        await loadFull(main);
    };

    const particlesOptions: ISourceOptions = {
        fpsLimit: 60,
        interactivity: {
            events: {
                onclick: { enable: false },
            },
            modes: {
                bubble: { distance: 400, duration: 2, opacity: 0.8, size: 40, speed: 3 },
                grab: { distance: 400, links: { opacity: 1 } },
                push: { quantity: 4 },
                remove: { quantity: 2 },
                repulse: { distance: 200, duration: 0.4 }
            }
        },
        particles: {
            color: { value: "random" },
            links: {
                color: "random",
                distance: 150,
                enable: false,
                opacity: 0.2,
                width: 1
            },
            move: {
                attract: { enable: false, rotateX: 600, rotateY: 1200 },
                bounce: false,
                direction: "none",
                enable: true,
                out_mode: "out",
                random: false,
                speed: 1,
                straight: false
            },
            rotate: {
                animation: {
                    enable: true,
                    speed: 10,
                    sync: false
                }
            },
            number: { density: { enable: true, area: 1000 }, value: 100 },
            opacity: {
                animation: { enable: true, minimumValue: 0.5, speed: 1, sync: false },
                random: false,
                value: 0.5
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
            size: {
                anim: { enable: true, minimumValue: 8, speed: 20, sync: false },
                random: { minimumValue: 8, enable: true },
                value: 32
            }
        },
        detectRetina: true
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
        />
    );
};

export default ParticlesBackground;