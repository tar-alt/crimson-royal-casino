import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

/** Mobile-first centered viewport optimized for Android phones. */
export function MobileShell({ children, className = "" }: Props) {
  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className={`relative w-full max-w-md min-h-screen overflow-hidden bg-luxe shadow-deep ${className}`}>
        {/* subtle gold vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.78_0.16_85_/_8%),transparent_60%)]" />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
