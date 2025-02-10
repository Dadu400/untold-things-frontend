import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import type { ISourceOptions } from "tsparticles-engine";

const ValentinesParticles = () => {
    const particlesInit = async (main: Engine) => {
        await loadFull(main);
    };

    const particlesOptions: ISourceOptions = {
        fpsLimit: 60,
        particles: {
            number: {
                value: 346,
                density: {
                    enable: true,
                    value_area: 800,
                },
            },
            color: {
                value: ["#ff0000", "#ff1493", "#800080", "#ff69b4"],
            },
            shape: {
                type: "star",
            },
            opacity: {
                value: 1,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0,
                    sync: false,
                },
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 1,
                    size_min: 0.2,
                    sync: false,
                },
            },
            move: {
                enable: true,
                speed: 0.1, 
                direction: "none",
                random: true,
                straight: true,
                out_mode: "out",
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 600 },
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: false },
                onclick: { enable: false },
                resize: true,
            },
        },
        retina_detect: true,
    };

    return <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />;
};

export default ValentinesParticles;
