import React, { useEffect, useRef} from 'react';
const mojs = require("@mojs/core");

interface HeartButtonProps {
    onClick?: (e: React.MouseEvent) => void;
    active?: boolean; 
  }
  
  const AnimatedHeartButton: React.FC<HeartButtonProps> = ({
    onClick,
    active = false,
  }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const moTimeline = useRef<any>(null);
    const moburst1 = useRef<any>(null);
    const moburst2 = useRef<any>(null);
    const moBubbles = useRef<any>(null);
  
    useEffect(() => {
      if (!buttonRef.current) return;
  
      const timeline = new mojs.Timeline();
      
      moburst1.current = new mojs.Burst({
        parent: buttonRef.current,
        count: 10,
        radius: { 0: 80 },
        duration: 1500,
        children: {
          radius: { 15: 0 },
          easing: 'cubic.out',
          degreeShift: 'rand(-50, 50)',
        }
      });
  
      moburst2.current = new mojs.Burst({
        parent: buttonRef.current,
        count: 15,
        radius: { 0: 60 },
        children: {
          shape: 'line',
          stroke: '#FF4136',
          fill: 'none',
          scale: 1,
          scaleX: { 1: 0 },
          easing: 'cubic.out',
          duration: 1000,
          degreeShift: 'rand(-50, 50)',
        }
      });
  
      moBubbles.current = new mojs.Burst({
        parent: buttonRef.current,
        radius: 50,
        count: 5,
        timeline: { delay: 200 },
        children: {
          stroke: '#FF4136',
          fill: 'none',
          scale: 1,
          strokeWidth: { 8: 0 },
          radius: { 0: 'rand(6, 10)' },
          degreeShift: 'rand(-50, 50)',
          duration: 400,
          delay: 'rand(0, 250)',
        }
      });
  
      const circleOpts = {
        parent: buttonRef.current,
        radius: { 0: 50 },
        duration: 750,
        shape: 'circle',
        fill: 'none',
        stroke: '#FF4136',
        strokeWidth: 1,
        opacity: { 1: 0 }
      };
  
      const circle1 = new mojs.Shape({
        ...circleOpts
      });
  
      const circle2 = new mojs.Shape({
        ...circleOpts,
        delay: 100
      });
  
      timeline.add(circle1, circle2);
      moTimeline.current = timeline;
  
      return () => {
        timeline.reset();
      };
    }, []);
  
    const handleClick = (e: React.MouseEvent) => {
      if (onClick) {
        onClick(e);
      }

      if (moburst1.current && moburst2.current && moBubbles.current && moTimeline.current) {
        moburst1.current
          .generate()
          .replay();
        
        moburst2.current
          .generate()
          .replay();
        
        moBubbles.current
          .generate()
          .replay();
        
        moTimeline.current.replay();
      }
    };
  
    return (
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`transition-transform hover:scale-110 focus:outline-none ${
          active ? 'active' : ''
        }`}
        aria-label="Like"
      >
        <svg
          width="22"
          height="18"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="transition-colors duration-250"
            d="M64.425 19.75l-.46-.462c-13.72-13.717-35.96-13.717-49.677 0C.57 33.006.57 55.246 14.288 68.964l49.676 49.676.46-.46.46.46 49.677-49.676c13.72-13.718 13.72-35.958 0-49.676-13.715-13.717-35.955-13.717-49.673 0l-.46.46z"
            stroke={active ? "#FF4136" : "#0078FE"}
            strokeWidth="10"
            fill={active ? "#FF4136" : "transparent"}
            fillRule="evenodd"
          />
        </svg>
      </button>
    );
  };
  
  export default AnimatedHeartButton;