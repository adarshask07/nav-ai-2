
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TextRevealProps {
  text: string;
  className?: string;
  triggerOnScroll?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

const TextReveal: React.FC<TextRevealProps> = ({ text, className, triggerOnScroll = true }) => {
  const elementRef = useRef<HTMLHeadingElement>(null);
  const originalText = text;
  
  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const animateText = () => {
      let iterations = 0;
      const interval = setInterval(() => {
        el.innerText = el.innerText
          .split("")
          .map((letter, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        if (iterations >= originalText.length) {
          clearInterval(interval);
        }
        
        iterations += 1 / 2; 
      }, 30);
    };

    if (triggerOnScroll) {
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => animateText(),
      });
    } else {
      animateText();
    }

  }, [text, triggerOnScroll]);

  return (
    <span ref={elementRef} className={className}>
      {originalText}
    </span>
  );
};

export default TextReveal;
