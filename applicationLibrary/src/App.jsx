import Counter from './Counter'
import Gallery from './Gallery'

function App() {
  return (
    <main className="app-shell">
      <h1>React State Dashboard</h1>
      <p className="subtitle">
        Explore state snapshots, asynchronous updates, and image navigation.
      </p>
      <div className="section-stack">
        <Counter />
        <Gallery />
      </div>
    </main>
  )
}

export default App
