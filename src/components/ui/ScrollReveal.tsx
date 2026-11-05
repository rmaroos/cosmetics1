import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

// Premium luxury easing curve: smooth acceleration, prolonged deceleration
export const luxuryEase = [0.21, 0.47, 0.32, 0.98] as const;

export const scrollFadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  visible: (custom?: { delay?: number; duration?: number; y?: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration ?? 0.7,
      delay: custom?.delay ?? 0,
      ease: luxuryEase,
    },
  }),
};

export const scrollFadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    transition: {
      duration: custom?.duration ?? 0.7,
      delay: custom?.delay ?? 0,
      ease: luxuryEase,
    },
  }),
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom?: { staggerDelay?: number; delayChildren?: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom?.staggerDelay ?? 0.09,
      delayChildren: custom?.delayChildren ?? 0.05,
    },
  }),
};

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  variant?: 'fadeUp' | 'fadeIn';
  amount?: number;
  once?: boolean;
  staggerChildren?: number;
  as?: any;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  yOffset = 26,
  variant = 'fadeUp',
  amount = 0.15,
  once = true,
  staggerChildren,
  as = 'div',
  ...props
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionComponent = (motion as any)[as] || motion.div;

  if (prefersReducedMotion) {
    const Component = as;
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  const selectedVariants =
    staggerChildren !== undefined
      ? staggerContainerVariants
      : variant === 'fadeIn'
      ? scrollFadeInVariants
      : scrollFadeUpVariants;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={selectedVariants}
      custom={
        staggerChildren !== undefined
          ? { staggerDelay: staggerChildren, delayChildren: delay }
          : { delay, duration, y: yOffset }
      }
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export interface ScrollItemProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  index?: number;
  delay?: number;
  duration?: number;
  yOffset?: number;
  variant?: 'fadeUp' | 'fadeIn';
  as?: any;
}

export function ScrollItem({
  children,
  className = '',
  index,
  delay,
  duration = 0.7,
  yOffset = 24,
  variant = 'fadeUp',
  as = 'div',
  ...props
}: ScrollItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionComponent = (motion as any)[as] || motion.div;

  if (prefersReducedMotion) {
    const Component = as;
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  // Calculate stagger delay based on index (80–100ms) or direct delay
  const computedDelay = delay !== undefined ? delay : index !== undefined ? index * 0.085 : 0;

  const variants: Variants =
    variant === 'fadeIn'
      ? {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration, delay: computedDelay, ease: luxuryEase },
          },
        }
      : {
          hidden: { opacity: 0, y: yOffset },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, delay: computedDelay, ease: luxuryEase },
          },
        };

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

