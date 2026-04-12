import Counter from './Counter'

function App() {
  return (
    <main className="app-shell">
      <h1>React State Snapshot Demo</h1>
      <p className="subtitle">
        Explore regular updates, delayed updates, and batched updates.
      </p>
      <Counter />
    </main>
  )
}

export default App
