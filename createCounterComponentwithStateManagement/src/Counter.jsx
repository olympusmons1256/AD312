import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  const incrementAfterDelay = () => {
    setTimeout(() => {
      setCount((prevCount) => prevCount + 1)
    }, 2000)
  }

  const incrementTwice = () => {
    setCount(count + 2)
  }

  const correctIncrementTwice = () => {
    setCount((prevCount) => prevCount + 2)
  }

  return (
    <section className="counter-card">
      <h2>Current Count: {count}</h2>

      <div className="button-grid">
        <button onClick={increment}>Increment</button>
        <button onClick={incrementAfterDelay}>Increment After Delay</button>
        <button onClick={incrementTwice}>Increment Twice</button>
        <button onClick={correctIncrementTwice}>Correct Increment Twice</button>
      </div>
    </section>
  )
}

export default Counter
