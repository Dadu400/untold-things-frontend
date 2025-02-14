import { useState } from 'react';
import './Envelope.css';

function Envelope()  {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`env-wrapper mt-32 ${isOpen ? 'env-open' : ''}`}>
      <div className="env-hearts">
        <div className="env-heart heart1"></div>
        <div className="env-heart heart2"></div>
        <div className="env-heart heart3"></div>
      </div>
      <div className="env-sparkles">
        <div className="env-sparkle sparkle1"></div>
        <div className="env-sparkle sparkle1"></div>
        <div className="env-sparkle sparkle1"></div>
        <div className="env-sparkle sparkle2"></div>
        <div className="env-sparkle sparkle2"></div>
        <div className="env-sparkle sparkle2"></div>
        <div className="env-sparkle sparkle2"></div>
        <div className="env-sparkle sparkle3"></div>
        <div className="env-sparkle sparkle4"></div>
        <div className="env-sparkle sparkle5"></div>
        <div className="env-sparkle sparkle5"></div>
        <div className="env-sparkle sparkle5"></div>
        <div className="env-sparkle sparkle5"></div>
        <div className="env-sparkle sparkle5"></div>
        <div className="env-sparkle sparkle5"></div>
        <div className="env-sparkle sparkle5"></div>
        <div className="env-sparkle sparkle5"></div>
        <div className="env-sparkle sparkle5"></div>
        <div className="env-sparkle sparkle5"></div>
        <div className="env-sparkle sparkle5"></div>
      </div>
      <div
        id="env-envelope"
        className={`${isOpen ? 'env-open' : 'env-close'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="env-front env-flap"></div>
        <div className="env-front env-pocket"></div>
        <div className="env-letter">
          <div className="env-letter-corner env-corner-tl"></div>
          <div className="env-letter-corner env-corner-br"></div>
          <div className="env-message">
            <p className='font-firago text-3xl'>ჩემი გული გამალებით ძგერს შენს მოლოდინში</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Envelope;
