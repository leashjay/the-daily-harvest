"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Tunnel", emoji: "🪴" },
  { href: "/log", label: "Get dirty", emoji: "🪏" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40">
      <div className="max-w-md mx-auto px-4 pb-[env(safe-area-inset-bottom,8px)]">
        <div className="flex items-stretch bg-garden-soil/80 backdrop-blur-md border-2 border-garden-soil/40 rounded-2xl mb-3 overflow-hidden shadow-lg">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex-1 flex flex-col items-center gap-0.5 py-3 transition-all
                  ${
                    active
                      ? "bg-garden-green/30 text-garden-light"
                      : "text-garden-straw/60 hover:text-garden-straw hover:bg-garden-soil/30"
                  }
                `}
              >
                <span
                  className={`text-xl ${active ? "scale-110" : ""} transition-transform`}
                >
                  {item.emoji}
                </span>
                <span className="text-[11px] font-heading font-semibold">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
