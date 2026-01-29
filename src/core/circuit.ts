/**
 * Quantum circuit representation and execution
 */

import { Complex } from './complex'
import { Gates, TwoQubitGates, Rx, Ry, Rz, Phase, Matrix } from './gates'
import { StateVector } from './state'

export interface GateOperation {
  name: string
  qubits: number[]
  params?: number[]
}

export interface MeasurementResult {
  counts: Record<string, number>
  statevector?: StateVector
  shots: number
}

export class QuantumCircuit {
  public numQubits: number
  public operations: GateOperation[] = []
  private _state: StateVector | null = null

  constructor(numQubits: number) {
    this.numQubits = numQubits
  }

  /**
   * Get current state (for visualization)
   */
  get state(): StateVector {
    if (!this._state) {
      this._state = new StateVector(this.numQubits)
    }
    return this._state
  }

  /**
   * Reset circuit
   */
  reset(): this {
    this.operations = []
    this._state = null
    return this
  }

  // ============ Single-qubit gates ============

  h(qubit: number): this {
    this.operations.push({ name: 'H', qubits: [qubit] })
    return this
  }

  x(qubit: number): this {
    this.operations.push({ name: 'X', qubits: [qubit] })
    return this
  }

  y(qubit: number): this {
    this.operations.push({ name: 'Y', qubits: [qubit] })
    return this
  }

  z(qubit: number): this {
    this.operations.push({ name: 'Z', qubits: [qubit] })
    return this
  }

  s(qubit: number): this {
    this.operations.push({ name: 'S', qubits: [qubit] })
    return this
  }

  sdg(qubit: number): this {
    this.operations.push({ name: 'Sdg', qubits: [qubit] })
    return this
  }

  t(qubit: number): this {
    this.operations.push({ name: 'T', qubits: [qubit] })
    return this
  }

  tdg(qubit: number): this {
    this.operations.push({ name: 'Tdg', qubits: [qubit] })
    return this
  }

  // ============ Rotation gates ============

  rx(theta: number, qubit: number): this {
    this.operations.push({ name: 'Rx', qubits: [qubit], params: [theta] })
    return this
  }

  ry(theta: number, qubit: number): this {
    this.operations.push({ name: 'Ry', qubits: [qubit], params: [theta] })
    return this
  }

  rz(theta: number, qubit: number): this {
    this.operations.push({ name: 'Rz', qubits: [qubit], params: [theta] })
    return this
  }

  p(phi: number, qubit: number): this {
    this.operations.push({ name: 'P', qubits: [qubit], params: [phi] })
    return this
  }

  // ============ Two-qubit gates ============

  cx(control: number, target: number): this {
    this.operations.push({ name: 'CX', qubits: [control, target] })
    return this
  }

  cnot(control: number, target: number): this {
    return this.cx(control, target)
  }

  cz(control: number, target: number): this {
    this.operations.push({ name: 'CZ', qubits: [control, target] })
    return this
  }

  swap(qubit1: number, qubit2: number): this {
    this.operations.push({ name: 'SWAP', qubits: [qubit1, qubit2] })
    return this
  }

  // ============ Three-qubit gates ============

  ccx(control1: number, control2: number, target: number): this {
    this.operations.push({ name: 'CCX', qubits: [control1, control2, target] })
    return this
  }

  toffoli(control1: number, control2: number, target: number): this {
    return this.ccx(control1, control2, target)
  }

  // ============ Measurement ============

  measure(qubit: number): this {
    this.operations.push({ name: 'MEASURE', qubits: [qubit] })
    return this
  }

  measureAll(): this {
    for (let i = 0; i < this.numQubits; i++) {
      this.measure(i)
    }
    return this
  }

  // ============ Execution ============

  private getGateMatrix(op: GateOperation): Matrix | null {
    switch (op.name) {
      case 'H': return Gates.H
      case 'X': return Gates.X
      case 'Y': return Gates.Y
      case 'Z': return Gates.Z
      case 'S': return Gates.S
      case 'Sdg': return Gates.Sdg
      case 'T': return Gates.T
      case 'Tdg': return Gates.Tdg
      case 'Rx': return Rx(op.params![0])
      case 'Ry': return Ry(op.params![0])
      case 'Rz': return Rz(op.params![0])
      case 'P': return Phase(op.params![0])
      default: return null
    }
  }

  /**
   * Run the circuit and get the final statevector
   */
  run(): StateVector {
    const state = new StateVector(this.numQubits)

    for (const op of this.operations) {
      if (op.name === 'MEASURE') {
        // Skip measurement in statevector simulation
        continue
      }

      const gate = this.getGateMatrix(op)

      if (gate && op.qubits.length === 1) {
        state.applySingleQubitGate(gate, op.qubits[0])
      } else if (op.name === 'CX') {
        state.applyCNOT(op.qubits[0], op.qubits[1])
      } else if (op.name === 'CZ') {
        state.applySingleQubitGate(Gates.H, op.qubits[1])
        state.applyCNOT(op.qubits[0], op.qubits[1])
        state.applySingleQubitGate(Gates.H, op.qubits[1])
      } else if (op.name === 'SWAP') {
        state.applySWAP(op.qubits[0], op.qubits[1])
      } else if (op.name === 'CCX') {
        // Decompose Toffoli into basic gates
        this.applyToffoli(state, op.qubits[0], op.qubits[1], op.qubits[2])
      }
    }

    this._state = state
    return state
  }

  private applyToffoli(state: StateVector, c1: number, c2: number, t: number): void {
    // Standard Toffoli decomposition
    state.applySingleQubitGate(Gates.H, t)
    state.applyCNOT(c2, t)
    state.applySingleQubitGate(Gates.Tdg, t)
    state.applyCNOT(c1, t)
    state.applySingleQubitGate(Gates.T, t)
    state.applyCNOT(c2, t)
    state.applySingleQubitGate(Gates.Tdg, t)
    state.applyCNOT(c1, t)
    state.applySingleQubitGate(Gates.T, c2)
    state.applySingleQubitGate(Gates.T, t)
    state.applySingleQubitGate(Gates.H, t)
    state.applyCNOT(c1, c2)
    state.applySingleQubitGate(Gates.T, c1)
    state.applySingleQubitGate(Gates.Tdg, c2)
    state.applyCNOT(c1, c2)
  }

  /**
   * Sample the circuit multiple times
   */
  sample(shots: number = 1024): MeasurementResult {
    const counts: Record<string, number> = {}

    for (let i = 0; i < shots; i++) {
      const state = this.run()
      const { result } = state.measureAll()

      counts[result] = (counts[result] || 0) + 1
    }

    return { counts, shots }
  }

  /**
   * Export circuit as JSON
   */
  toJSON(): object {
    return {
      numQubits: this.numQubits,
      operations: this.operations,
    }
  }

  /**
   * Import circuit from JSON
   */
  static fromJSON(json: { numQubits: number; operations: GateOperation[] }): QuantumCircuit {
    const circuit = new QuantumCircuit(json.numQubits)
    circuit.operations = json.operations
    return circuit
  }

  /**
   * Get circuit as ASCII diagram
   */
  draw(): string {
    const lines: string[][] = []
    for (let q = 0; q < this.numQubits; q++) {
      lines.push([`q${q}: `])
    }

    for (const op of this.operations) {
      const maxLen = Math.max(...lines.map(l => l.join('').length))
      
      // Pad all lines to same length
      for (let q = 0; q < this.numQubits; q++) {
        const currentLen = lines[q].join('').length
        lines[q].push('─'.repeat(maxLen - currentLen))
      }

      if (op.qubits.length === 1) {
        const q = op.qubits[0]
        const name = op.name === 'MEASURE' ? 'M' : op.name
        lines[q].push(`[${name}]`)
        
        for (let i = 0; i < this.numQubits; i++) {
          if (i !== q) lines[i].push('───')
        }
      } else if (op.qubits.length === 2) {
        const [q1, q2] = op.qubits
        const min = Math.min(q1, q2)
        const max = Math.max(q1, q2)

        for (let q = 0; q < this.numQubits; q++) {
          if (q === q1) {
            lines[q].push(op.name === 'CX' ? '●' : op.name === 'SWAP' ? 'X' : '●')
          } else if (q === q2) {
            lines[q].push(op.name === 'CX' ? '⊕' : op.name === 'SWAP' ? 'X' : '●')
          } else if (q > min && q < max) {
            lines[q].push('│')
          } else {
            lines[q].push('─')
          }
        }
      }
    }

    return lines.map(l => l.join('')).join('\n')
  }
}
