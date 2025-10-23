type ButtonVariant = "primary" | "secondary";
type ButtonSize = "default" | "sm";

const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold uppercase transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rc-indigo";

const sizeClasses: Record<ButtonSize, string> = {
  default: "gap-3 px-7 py-3 text-sm tracking-[0.28em]",
  sm: "gap-2 px-4 py-1.5 text-xs tracking-[0.18em]",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-rc-navy text-white text-[#ffffff] hover:bg-rc-indigo focus-visible:text-white hover:text-white",
  secondary:
    "border border-rc-navy bg-transparent text-rc-navy hover:bg-rc-navy hover:text-white focus-visible:text-white",
};

const merge = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(" ");

type ButtonClassOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function buttonClasses({
  variant = "primary",
  size = "default",
  className,
}: ButtonClassOptions = {}) {
  return merge(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );
}
