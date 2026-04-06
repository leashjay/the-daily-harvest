export default function Home() {
  return (
    <main className="min-h-screen bg-garden-sky/30 px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        <header className="text-center space-y-1">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-garden-green">
            The Daily Harvest
          </h1>
          <p className="text-garden-soil text-sm">
            Cam vs Leesh — may the best gardener win
          </p>
        </header>

        {/* Leaderboard — TODO: wire up AppState */}
        <section className="max-w-lg mx-auto bg-white/80 backdrop-blur rounded-2xl border border-garden-light p-6 shadow-sm">
          <h2 className="font-heading text-lg font-semibold text-garden-green mb-4">Leaderboard</h2>
          <p className="text-sm text-garden-soil italic">Coming soon — build Leaderboard.tsx</p>
        </section>

        {/* Activity feed — TODO: wire up AppState */}
        <section className="bg-white/80 backdrop-blur rounded-2xl border border-garden-light p-6 shadow-sm">
          <h2 className="font-heading text-lg font-semibold text-garden-green mb-4">Recent activity</h2>
          <p className="text-sm text-garden-soil italic">Coming soon — build ActivityFeed.tsx</p>
        </section>

      </div>
    </main>
  )
}
