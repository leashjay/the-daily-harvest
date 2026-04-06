import Image from "next/image";
import TunnelMap from "@/components/TunnelMap";
import XPBar from "@/components/XPBar";
import { initialState } from "@/lib/players";

export default function GardenPage() {
  const { players } = initialState();

  return (
    <main className="min-h-[calc(100vh-3.5rem)] px-4 py-6 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Hero — shows the tunnel (bottom portion of image) */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg h-56 md:h-72">
          <Image
            src="/images/garden-plot.jpeg"
            alt="Our grow tunnel"
            fill
            className="object-cover object-[center_75%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white drop-shadow-md">
              The Grow Tunnel
            </h1>
            <p className="text-garden-straw text-sm mt-1">
              Seven spaces. Three bays. Growing together.
            </p>
          </div>
        </div>

        {/* Gardener progress cards */}
        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-garden-straw/70 mb-3">
            Gardener progress
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <XPBar player={players.cam} />
            <XPBar player={players.leesh} />
          </div>
        </div>

        {/* Gamified tunnel map */}
        <TunnelMap />
      </div>
    </main>
  );
}
