"use client";

import { buttonClasses } from "@/components/button";
import { m, useReducedMotion } from "framer-motion";

type FilterOption = {
  label: string;
  value: string;
};

type FiltersProps = {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
};

export function Filters({ options, value, onChange }: FiltersProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const isActive = value === option.value;

        const buttonClassName = buttonClasses({
          variant: isActive ? "primary" : "secondary",
          size: "sm",
          className: isActive ? "shadow-sm" : "",
        });

        if (prefersReducedMotion) {
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={buttonClassName}
            >
              {option.label}
            </button>
          );
        }

        return (
          <m.button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className={buttonClassName}
          >
            {option.label}
          </m.button>
        );
      })}
    </div>
  );
}
