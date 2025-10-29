"use client";

import { motion } from "framer-motion";
import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type Square = {
  id: number;
  pos: [number, number];
};

export type AnimatedGridPatternProps = ComponentPropsWithoutRef<"svg"> & {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function AnimatedGridPattern({
  className,
  width = 56,
  height = 56,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 80,
  maxOpacity = 0.45,
  duration = 5,
  repeatDelay = 1.2,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement | null>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState<Square[]>([]);

  const getPos = useCallback((): [number, number] => {
    if (!dimensions.width || !dimensions.height) return [0, 0];

    const columns = Math.max(1, Math.floor(dimensions.width / width));
    const rows = Math.max(1, Math.floor(dimensions.height / height));

    return [
      Math.floor(Math.random() * columns),
      Math.floor(Math.random() * rows),
    ];
  }, [dimensions.width, dimensions.height, width, height]);

  const generateSquares = useCallback(
    (count: number) =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        pos: getPos(),
      })),
    [getPos],
  );

  const updateSquarePosition = useCallback(
    (squareId: number) => {
      setSquares((current) =>
        current.map((square) =>
          square.id === squareId
            ? {
                ...square,
                pos: getPos(),
              }
            : square,
        ),
      );
    },
    [getPos],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;
    setSquares(generateSquares(numSquares));
  }, [dimensions, numSquares, generateSquares]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-current stroke-current",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${id})`} />

      <svg x={x} y={y} className="overflow-visible text-rc-indigo/30">
        {squares.map(({ pos: [squareX, squareY], id: squareId }, index) => (
          <motion.rect
            key={`${squareId}-${squareX}-${squareY}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay,
              delay: index * 0.08,
              ease: "easeInOut",
            }}
            onAnimationComplete={() => updateSquarePosition(squareId)}
            width={width - 1}
            height={height - 1}
            x={squareX * width + 1}
            y={squareY * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}
