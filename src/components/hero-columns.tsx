"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { HTMLAttributes } from "react";

type HeroColumnsProps = {
  className?: HTMLAttributes<HTMLDivElement>["className"];
};

export function HeroColumns({ className }: HeroColumnsProps) {
  return (
    <div className={className}>
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      >
        <Image
          src="/column.svg"
          alt=""
          width={44}
          height={205}
          className="h-48 w-[60px] scale-x-[-1] sm:h-80 sm:w-auto lg:h-[22rem]"
          priority
        />
      </motion.div>
      <motion.div
        initial={{ y: 140, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.95, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
      >
        <Image
          src="/column.svg"
          alt=""
          width={44}
          height={205}
          className="h-40 w-[60px] sm:h-72 sm:w-auto lg:h-80"
          priority
        />
      </motion.div>
    </div>
  );
}
