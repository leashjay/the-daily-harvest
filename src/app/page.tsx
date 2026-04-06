export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        <header className="text-center space-y-1">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-garden-light">
            The Daily Harvest
          </h1>
          <p className="text-garden-straw text-sm">
            Cam &amp; Leesh — growing together, richer harvests
          </p>
        </header>

        {/* Leaderboard — TODO: wire up AppState */}
        <section className="max-w-lg mx-auto bg-garden-soil/30 backdrop-blur rounded-2xl border border-garden-soil/20 p-6">
          <h2 className="font-heading text-lg font-semibold text-garden-light mb-4">Leaderboard</h2>
          <p className="text-sm text-garden-straw italic">Coming soon — build Leaderboard.tsx</p>
        </section>

        {/* Activity feed — TODO: wire up AppState */}
        <section className="bg-garden-soil/30 backdrop-blur rounded-2xl border border-garden-soil/20 p-6">
          <h2 className="font-heading text-lg font-semibold text-garden-light mb-4">Recent activity</h2>
          <p className="text-sm text-garden-straw italic">Coming soon — build ActivityFeed.tsx</p>
        </section>

      </div>
    </main>
  )
}
