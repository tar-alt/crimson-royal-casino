import type { Card } from "@/lib/mock-data";

interface Props {
  card?: Card;
  hidden?: boolean;
  size?: "sm" | "md" | "lg";
  delay?: number;
}

const sizes = {
  sm: "w-10 h-14 text-sm",
  md: "w-14 h-20 text-lg",
  lg: "w-20 h-28 text-2xl",
};

export function PlayingCard({ card, hidden, size = "md", delay = 0 }: Props) {
  const isRed = card && (card.suit === "♥" || card.suit === "♦");

  if (hidden || !card) {
    return (
      <div
        className={`${sizes[size]} rounded-md bg-gradient-to-br from-[var(--crimson)] to-[var(--crimson-dark)] border-2 border-[var(--gold)]/60 shadow-deep relative overflow-hidden animate-card-deal`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="absolute inset-1 rounded border border-[var(--gold)]/40 flex items-center justify-center">
          <span className="text-gold text-xl font-display">♛</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${sizes[size]} rounded-md bg-gradient-to-br from-white to-stone-200 text-stone-900 shadow-deep border border-stone-300 relative flex flex-col justify-between p-1 animate-card-deal`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`leading-none font-bold ${isRed ? "text-red-600" : "text-stone-900"}`}>
        <div>{card.rank}</div>
        <div>{card.suit}</div>
      </div>
      <div className={`leading-none font-bold self-end rotate-180 ${isRed ? "text-red-600" : "text-stone-900"}`}>
        <div>{card.rank}</div>
        <div>{card.suit}</div>
      </div>
    </div>
  );
}
