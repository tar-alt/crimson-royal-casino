import { Link, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface Props {
  title: string;
  right?: ReactNode;
  back?: boolean;
}

export function TopBar({ title, right, back = true }: Props) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 h-14 bg-[oklch(0.16_0.02_25_/_85%)] backdrop-blur border-b border-[var(--gold)]/20">
      <div className="w-10">
        {back && (
          <button onClick={() => router.history.back()} className="w-10 h-10 -ml-2 flex items-center justify-center text-gold rounded-full hover:bg-[var(--gold)]/10">
            ←
          </button>
        )}
      </div>
      <h1 className="font-display text-lg text-gold-gradient">{title}</h1>
      <div className="w-10 flex justify-end">{right}</div>
    </header>
  );
}

export function HomeLink({ children }: { children: ReactNode }) {
  return <Link to="/lobby" className="text-gold">{children}</Link>;
}
