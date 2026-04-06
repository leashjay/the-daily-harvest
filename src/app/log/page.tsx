export default function LogPage() {
  return (
    <main className="min-h-screen bg-garden-sky/30 px-4 py-8 md:px-8">
      <div className="max-w-lg mx-auto space-y-6">

        <header>
          <h1 className="font-heading text-3xl font-semibold text-garden-green">Log a task</h1>
          <p className="text-garden-soil text-sm mt-1">What did you do out there?</p>
        </header>

        {/* TODO: build TaskButton.tsx + wire up AppState */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-garden-light p-6 shadow-sm">
          <p className="text-sm text-garden-soil italic">Coming soon — build TaskButton.tsx</p>
        </div>

      </div>
    </main>
  )
}
