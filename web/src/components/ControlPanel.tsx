import './ControlPanel.css'

interface ControlPanelProps {
  numQubits: number
  setNumQubits: (n: number) => void
  onReset: () => void
}

export default function ControlPanel({ numQubits, setNumQubits, onReset }: ControlPanelProps) {
  return (
    <div className="control-panel">
      <h2>⚙️ Controls</h2>

      <div className="control-section">
        <label>Number of Qubits</label>
        <div className="qubit-selector">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`qubit-btn ${numQubits === n ? 'active' : ''}`}
              onClick={() => {
                setNumQubits(n)
                onReset()
              }}
            >
              {n}
            </button>
          ))}
        </div>
        <p className="info-text">
          States: 2^{numQubits} = {Math.pow(2, numQubits)}
        </p>
      </div>

      <div className="control-section">
        <button onClick={onReset} className="reset-btn danger">
          🔄 Reset Circuit
        </button>
      </div>

      <div className="info-section">
        <h3>ℹ️ Info</h3>
        <div className="info-card">
          <h4>Quantum Computing</h4>
          <p>
            Quantum computers use qubits that can exist in superposition, 
            allowing them to process information in fundamentally different ways.
          </p>
        </div>

        <div className="info-card">
          <h4>Circuit Builder</h4>
          <ul>
            <li>Select a gate from the palette</li>
            <li>Click on the circuit grid to place it</li>
            <li>Run simulation to see results</li>
          </ul>
        </div>

        <div className="info-card">
          <h4>Common Gates</h4>
          <dl>
            <dt>H</dt><dd>Creates superposition</dd>
            <dt>X</dt><dd>Flips qubit (NOT gate)</dd>
            <dt>CNOT</dt><dd>Entangles two qubits</dd>
          </dl>
        </div>
      </div>

      <div className="links-section">
        <h3>🔗 Resources</h3>
        <a href="https://quantum-computing.ibm.com/" target="_blank" rel="noopener noreferrer">
          IBM Quantum
        </a>
        <a href="https://quantumai.google/" target="_blank" rel="noopener noreferrer">
          Google Quantum AI
        </a>
        <a href="https://github.com/neilyneilynig/quantum-sim" target="_blank" rel="noopener noreferrer">
          GitHub Repo
        </a>
      </div>
    </div>
  )
}
