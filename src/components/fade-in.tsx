"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

type FadeInProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
};

export function FadeIn<T extends ElementType = "div">({
  as,
  className,
  children,
  delay = 0,
  style,
}: FadeInProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const MotionComponent = useMemo(
    () => motion.create(Component),
    [Component],
  );
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  const animation = prefersReducedMotion
    ? { opacity: 1 }
    : {
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 24,
      };

  return (
    <MotionComponent
      ref={ref}
      className={className}
      style={style}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
      animate={animation}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }
      }
    >
      {children}
    </MotionComponent>
  );
}
