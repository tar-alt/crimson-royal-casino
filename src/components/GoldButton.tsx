import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "crimson" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function GoldButton({ variant = "gold", size = "md", className = "", children, ...rest }: Props) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none";
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const variants = {
    gold: "bg-gold-gradient text-stone-900 shadow-gold hover:brightness-110",
    crimson: "bg-crimson-gradient text-white shadow-deep hover:brightness-110 border border-[var(--gold)]/30",
    outline: "border-2 border-[var(--gold)]/60 text-gold hover:bg-[var(--gold)]/10",
    ghost: "text-gold hover:bg-[var(--gold)]/10",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
