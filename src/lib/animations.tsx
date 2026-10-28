'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import Image from 'next/image';

// Standard luxury easing: calibrated cubic-bezier curve
export const EASING_LUXURY = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  blur?: boolean;
  scale?: boolean;
  className?: string;
}

/**
 * Premium scroll reveal with smooth blur resolution, subtle scale settling, and vertical rise
 */
export function Reveal({
  children,
  delay = 0,
  duration = 1.0,
  y = 30,
  blur = true,
  scale = false,
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y,
        filter: blur ? 'blur(14px)' : 'blur(0px)',
        scale: scale ? 0.98 : 1,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              scale: 1,
            }
          : {
              opacity: 0,
              y,
              filter: blur ? 'blur(14px)' : 'blur(0px)',
              scale: scale ? 0.98 : 1,
            }
      }
      transition={{ duration, delay, ease: EASING_LUXURY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface BlurRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  blurAmount?: number;
  className?: string;
}

/**
 * Editorial BlurReveal for cards, major headings, and rich containers
 */
export function BlurReveal({
  children,
  delay = 0,
  duration = 1.1,
  y = 35,
  blurAmount = 20,
  className = '',
}: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y,
        filter: `blur(${blurAmount}px)`,
        scale: 0.98,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              scale: 1,
            }
          : {
              opacity: 0,
              y,
              filter: `blur(${blurAmount}px)`,
              scale: 0.98,
            }
      }
      transition={{ duration, delay, ease: EASING_LUXURY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SplitTextProps {
  text: string;
  delay?: number;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/**
 * Word-by-word masked reveal combined with blur resolution
 */
export function SplitText({
  text,
  delay = 0,
  className = '',
  tag: Tag = 'h2',
}: SplitTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden align-top">
            <motion.span
              className="inline-block"
              initial={{
                y: '110%',
                opacity: 0,
                filter: 'blur(12px)',
              }}
              animate={
                isInView
                  ? {
                      y: '0%',
                      opacity: 1,
                      filter: 'blur(0px)',
                    }
                  : {
                      y: '110%',
                      opacity: 0,
                      filter: 'blur(12px)',
                    }
              }
              transition={{
                duration: 0.95,
                delay: delay + i * 0.045,
                ease: EASING_LUXURY,
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </Tag>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  aspect?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Parallax image with smooth scroll depth and initial blur-to-sharp entrance
 */
export function ParallaxImage({
  src,
  alt,
  aspect = 'aspect-[16/10]',
  priority = false,
  className = '',
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '200px 0px 200px 0px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-off-white ${aspect} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.08, filter: 'blur(16px)' }}
        animate={
          isInView
            ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, scale: 1.08, filter: 'blur(16px)' }
        }
        transition={{ duration: 1.15, ease: EASING_LUXURY }}
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </motion.div>
    </div>
  );
}

interface CounterProps {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function Counter({
  from = 0,
  to,
  suffix = '',
  duration = 2.0,
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(from);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(from, to, {
      duration,
      ease: EASING_LUXURY,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    setPosition({ x: distanceX * 0.25, y: distanceY * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.5 }}
      className={`inline-block ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
}
