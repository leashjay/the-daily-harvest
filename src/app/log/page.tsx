export default function LogPage() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-8">
      <div className="max-w-lg mx-auto space-y-6">

        <header>
          <h1 className="font-heading text-3xl font-semibold text-garden-light">Log a task</h1>
          <p className="text-garden-straw text-sm mt-1">What did you do out there?</p>
        </header>

        {/* TODO: build TaskButton.tsx + wire up AppState */}
        <div className="bg-garden-soil/30 backdrop-blur rounded-2xl border border-garden-soil/20 p-6">
          <p className="text-sm text-garden-straw italic">Coming soon — build TaskButton.tsx</p>
        </div>

      </div>
    </main>
  )
}
