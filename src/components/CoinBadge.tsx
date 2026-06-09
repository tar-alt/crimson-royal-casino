interface Props {
  amount: number;
  size?: "sm" | "md" | "lg";
}

export function CoinBadge({ amount, size = "md" }: Props) {
  const sizes = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-1.5 gap-2",
  };
  return (
    <div className={`inline-flex items-center rounded-full bg-gradient-to-r from-[var(--gold-dark)]/30 to-[var(--gold)]/20 border border-[var(--gold)]/40 font-semibold text-gold ${sizes[size]}`}>
      <span className="inline-block w-3 h-3 rounded-full bg-gold-gradient shadow-[0_0_8px_var(--gold)]" />
      {amount.toLocaleString()}
    </div>
  );
}
