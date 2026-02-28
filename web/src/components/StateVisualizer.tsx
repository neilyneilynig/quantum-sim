import './StateVisualizer.css'

interface StateVisualizerProps {
  state: any
}

export default function StateVisualizer({ state }: StateVisualizerProps) {
  if (!state || state.length === 0) {
    return (
      <div className="state-visualizer empty">
        <div className="empty-state">
          <div className="empty-icon">🔮</div>
          <h3>No Simulation Yet</h3>
          <p>Build a circuit and click "Run Simulation" to see the quantum state</p>
        </div>
      </div>
    )
  }

  const maxProbability = Math.max(...state.map((s: any) => s.probability))

  return (
    <div className="state-visualizer">
      <div className="state-header">
        <h3>Probability Distribution</h3>
        <div className="stats">
          <span>Total States: {state.length}</span>
          <span>Max Probability: {(maxProbability * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="probability-bars">
        {state.map((s: any, i: number) => (
          <div key={i} className="state-bar">
            <div className="state-label">{s.basis}</div>
            <div className="bar-container">
              <div 
                className="bar-fill"
                style={{ 
                  width: `${(s.probability / maxProbability) * 100}%`,
                  background: `hsl(${(i / state.length) * 360}, 70%, 60%)`
                }}
              />
              <span className="probability-value">
                {(s.probability * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="amplitude-view">
        <h3>Complex Amplitudes</h3>
        <div className="amplitude-grid">
          {state.map((s: any, i: number) => (
            <div key={i} className="amplitude-item">
              <div className="amplitude-label">{s.basis}</div>
              <div className="amplitude-value">
                <span className="real">{s.amplitude.real.toFixed(3)}</span>
                <span className="operator">+</span>
                <span className="imag">{s.amplitude.imag.toFixed(3)}i</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
