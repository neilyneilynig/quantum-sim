import { useState } from 'react'
import './CircuitBuilder.css'

const GATES = [
  { id: 'H', name: 'Hadamard', symbol: 'H', color: '#6366f1', description: 'Creates superposition' },
  { id: 'X', name: 'Pauli-X', symbol: 'X', color: '#ec4899', description: 'Quantum NOT gate' },
  { id: 'Y', name: 'Pauli-Y', symbol: 'Y', color: '#8b5cf6', description: 'Y-axis rotation' },
  { id: 'Z', name: 'Pauli-Z', symbol: 'Z', color: '#06b6d4', description: 'Phase flip' },
  { id: 'S', name: 'Phase', symbol: 'S', color: '#10b981', description: 'Phase rotation' },
  { id: 'T', name: 'T-Gate', symbol: 'T', color: '#f59e0b', description: 'π/4 phase rotation' },
  { id: 'CNOT', name: 'CNOT', symbol: '⊕', color: '#ef4444', description: 'Controlled NOT' },
]

interface CircuitBuilderProps {
  numQubits: number
  circuit: any[]
  setCircuit: (circuit: any[]) => void
  onSimulate: (state: any) => void
}

export default function CircuitBuilder({ numQubits, circuit, setCircuit, onSimulate }: CircuitBuilderProps) {
  const [selectedGate, setSelectedGate] = useState<string | null>(null)
  const [hoveredCell, setHoveredCell] = useState<{col: number, row: number} | null>(null)

  const handleCellClick = (col: number, row: number) => {
    if (!selectedGate) return

    const newCircuit = [...circuit]
    if (!newCircuit[col]) newCircuit[col] = []
    newCircuit[col][row] = selectedGate

    setCircuit(newCircuit)
  }

  const handleSimulate = () => {
    // Simplified simulation - in real app, use the quantum-sim library
    const mockState = Array.from({ length: Math.pow(2, numQubits) }, (_, i) => ({
      basis: `|${i.toString(2).padStart(numQubits, '0')}⟩`,
      probability: Math.random(),
      amplitude: { real: Math.random() - 0.5, imag: Math.random() - 0.5 }
    }))
    
    onSimulate(mockState)
  }

  const clearCircuit = () => {
    setCircuit([])
  }

  return (
    <div className="circuit-builder">
      {/* Gate Palette */}
      <div className="gate-palette">
        <h3>Quantum Gates</h3>
        <div className="gates-grid">
          {GATES.map((gate) => (
            <button
              key={gate.id}
              className={`gate-button ${selectedGate === gate.id ? 'selected' : ''}`}
              style={{ '--gate-color': gate.color } as any}
              onClick={() => setSelectedGate(gate.id)}
              title={gate.description}
            >
              <span className="gate-symbol">{gate.symbol}</span>
              <span className="gate-name">{gate.name}</span>
            </button>
          ))}
        </div>
        <p className="hint">
          {selectedGate ? `Selected: ${GATES.find(g => g.id === selectedGate)?.name}` : 'Select a gate to place'}
        </p>
      </div>

      {/* Circuit Grid */}
      <div className="circuit-grid">
        <div className="qubit-labels">
          {Array.from({ length: numQubits }).map((_, i) => (
            <div key={i} className="qubit-label">
              |q{i}⟩
            </div>
          ))}
        </div>

        <div className="circuit-columns">
          {Array.from({ length: 10 }).map((_, col) => (
            <div key={col} className="circuit-column">
              {Array.from({ length: numQubits }).map((_, row) => {
                const gate = circuit[col]?.[row]
                const isHovered = hoveredCell?.col === col && hoveredCell?.row === row
                const gateInfo = gate ? GATES.find(g => g.id === gate) : null

                return (
                  <div
                    key={row}
                    className={`circuit-cell ${gate ? 'has-gate' : ''} ${isHovered ? 'hovered' : ''}`}
                    onClick={() => handleCellClick(col, row)}
                    onMouseEnter={() => setHoveredCell({ col, row })}
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{ '--gate-color': gateInfo?.color } as any}
                  >
                    {gate && (
                      <div className="gate">
                        {gateInfo?.symbol}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="circuit-actions">
        <button onClick={handleSimulate} className="simulate-btn">
          ▶ Run Simulation
        </button>
        <button onClick={clearCircuit} className="secondary">
          🗑 Clear Circuit
        </button>
      </div>
    </div>
  )
}
