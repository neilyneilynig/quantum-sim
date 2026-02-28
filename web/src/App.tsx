import { useState } from 'react'
import './App.css'
import CircuitBuilder from './components/CircuitBuilder'
import StateVisualizer from './components/StateVisualizer'
import ControlPanel from './components/ControlPanel'

function App() {
  const [numQubits, setNumQubits] = useState(2)
  const [circuit, setCircuit] = useState<any[]>([])
  const [quantumState, setQuantumState] = useState<any>(null)

  return (
    <div className="app">
      <header className="header">
        <h1>🔮 QuantumSim</h1>
        <p>Interactive Quantum Circuit Simulator</p>
      </header>

      <div className="main-container">
        <aside className="sidebar">
          <ControlPanel 
            numQubits={numQubits}
            setNumQubits={setNumQubits}
            onReset={() => {
              setCircuit([])
              setQuantumState(null)
            }}
          />
        </aside>

        <main className="workspace">
          <section className="circuit-section">
            <h2>Circuit Builder</h2>
            <CircuitBuilder
              numQubits={numQubits}
              circuit={circuit}
              setCircuit={setCircuit}
              onSimulate={(state) => setQuantumState(state)}
            />
          </section>

          <section className="visualization-section">
            <h2>Quantum State</h2>
            <StateVisualizer state={quantumState} />
          </section>
        </main>
      </div>

      <footer className="footer">
        <p>Built with ❤️ for quantum computing education</p>
        <a href="https://github.com/neilyneilynig/quantum-sim" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </footer>
    </div>
  )
}

export default App
