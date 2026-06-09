import type { Player } from "@/lib/mock-data";
import { CoinBadge } from "./CoinBadge";

interface Props {
  player: Player;
  size?: "sm" | "md" | "lg";
  active?: boolean;
}

export function PlayerAvatar({ player, size = "md", active }: Props) {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <div className={`${sizes[size]} rounded-full p-[2px] ${active ? "bg-gold-gradient animate-pulse-gold" : "bg-gradient-to-br from-[var(--gold)]/60 to-[var(--crimson)]/60"}`}>
          <img src={player.avatar} alt={player.name} className="w-full h-full rounded-full bg-card object-cover" />
        </div>
        {player.isDealer && (
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gold-gradient text-stone-900 text-[10px] font-bold flex items-center justify-center shadow-gold border border-stone-900">D</div>
        )}
        {player.isYou && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[var(--crimson)] text-white text-[9px] font-bold uppercase tracking-wider">You</div>
        )}
      </div>
      <div className="text-xs font-semibold text-foreground/90 max-w-[80px] truncate">{player.name}</div>
      <CoinBadge amount={player.coins} size="sm" />
    </div>
  );
}
