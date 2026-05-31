import { useState, useEffect, useRef } from 'react'
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

// Register only the Chart.js components we actually need (tree-shaking friendly).
// BarController must be included alongside BarElement — BarElement registers the
// visual primitive, but BarController is what Chart.js looks up when type:'bar' is used.
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const FRAMEWORKS = ['React', 'Vue', 'Angular', 'Svelte', 'Solid']

const COLORS = [
  'rgba(97, 218, 251, 0.8)',   // React cyan
  'rgba(65, 184, 131, 0.8)',   // Vue green
  'rgba(221, 0, 49, 0.8)',     // Angular red
  'rgba(255, 62, 0, 0.8)',     // Svelte orange
  'rgba(71, 108, 251, 0.8)',   // Solid blue
]

export default function PollDashboard() {
  // votes state: one integer per framework, initialized to zero
  const [votes, setVotes] = useState({ React: 0, Vue: 0, Angular: 0, Svelte: 0, Solid: 0 })

  // canvasRef gives us a direct handle to the real DOM <canvas> node
  const canvasRef = useRef(null)

  // chartInstanceRef persists the Chart.js object across renders without
  // triggering re-renders — a ref is the right tool here, not state
  const chartInstanceRef = useRef(null)

  useEffect(() => {
    const ctx = canvasRef.current

    if (!chartInstanceRef.current) {
      // If React StrictMode's double-invocation left a zombie instance attached to
      // the canvas (cleanup ran but a stale Chart.js internal reference survived),
      // destroy it before constructing a fresh chart on the same node.
      Chart.getChart(ctx)?.destroy()

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: FRAMEWORKS,
          datasets: [
            {
              label: 'Votes',
              data: FRAMEWORKS.map((f) => votes[f]),
              backgroundColor: COLORS,
              borderColor: COLORS.map((c) => c.replace('0.8', '1')),
              borderWidth: 2,
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx) => ` ${ctx.parsed.y} vote(s)` } },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1 },
              title: { display: true, text: 'Total Votes' },
            },
            x: {
              title: { display: true, text: 'JavaScript Framework' },
            },
          },
        },
      })
    } else {
      chartInstanceRef.current.data.datasets[0].data = FRAMEWORKS.map((f) => votes[f])
      chartInstanceRef.current.update()
    }

    // Without this cleanup, calling `new Chart()` on every state render would leave
    // the previous instance's event listeners and canvas context metadata alive.
    // Chart.js locks the canvas node to one owner at a time, so a second `new Chart()`
    // on the same <canvas> throws: "Canvas is already in use. Chart with ID X must be
    // destroyed before the canvas can be reused." Calling .destroy() releases that lock.
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
        chartInstanceRef.current = null
      }
    }
  }, [votes]) // re-run whenever votes changes

  function handleVote(framework) {
    setVotes((prev) => ({ ...prev, [framework]: prev[framework] + 1 }))
  }

  function handleReset() {
    setVotes({ React: 0, Vue: 0, Angular: 0, Svelte: 0, Solid: 0 })
  }

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0)

  return (
    <section className="component-section">
      <h2>Dynamic Poll Dashboard</h2>
      <p style={{ color: '#888', marginBottom: '1rem' }}>
        Favorite JavaScript Framework — {totalVotes} vote{totalVotes !== 1 ? 's' : ''} cast
      </p>

      {/* Voting buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {FRAMEWORKS.map((f, i) => (
          <button
            key={f}
            onClick={() => handleVote(f)}
            style={{
              background: COLORS[i],
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontWeight: 600,
              color: '#111',
            }}
          >
            {f} ({votes[f]})
          </button>
        ))}
        <button
          onClick={handleReset}
          style={{
            background: 'transparent',
            border: '1px solid #888',
            borderRadius: '6px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            color: '#888',
          }}
        >
          Reset
        </button>
      </div>

      {/* The raw <canvas> node that Chart.js owns */}
      <canvas ref={canvasRef} height={120} />
    </section>
  )
}
