/**
 * Quantum state vector implementation
 */

import { Complex } from './complex'
import { Matrix } from './gates'

export class StateVector {
  public amplitudes: Complex[]
  public numQubits: number

  constructor(numQubits: number) {
    this.numQubits = numQubits
    const size = Math.pow(2, numQubits)
    this.amplitudes = new Array(size).fill(null).map(() => Complex.zero())
    // Initialize to |0...0⟩
    this.amplitudes[0] = Complex.one()
  }

  /**
   * Get the dimension of the state vector
   */
  get dimension(): number {
    return this.amplitudes.length
  }

  /**
   * Clone the state vector
   */
  clone(): StateVector {
    const newState = new StateVector(this.numQubits)
    newState.amplitudes = this.amplitudes.map(a => new Complex(a.real, a.imag))
    return newState
  }

  /**
   * Get probability of measuring a specific basis state
   */
  probability(index: number): number {
    return this.amplitudes[index].magnitudeSquared()
  }

  /**
   * Get all probabilities
   */
  probabilities(): number[] {
    return this.amplitudes.map(a => a.magnitudeSquared())
  }

  /**
   * Apply a single-qubit gate
   */
  applySingleQubitGate(gate: Matrix, qubit: number): void {
    const n = this.numQubits
    const size = this.dimension

    for (let i = 0; i < size; i++) {
      // Check if bit at position qubit is 0
      if ((i & (1 << qubit)) === 0) {
        const i0 = i
        const i1 = i | (1 << qubit)

        const a0 = this.amplitudes[i0]
        const a1 = this.amplitudes[i1]

        // Apply 2x2 gate matrix
        this.amplitudes[i0] = gate[0][0].multiply(a0).add(gate[0][1].multiply(a1))
        this.amplitudes[i1] = gate[1][0].multiply(a0).add(gate[1][1].multiply(a1))
      }
    }
  }

  /**
   * Apply a controlled gate (control -> target)
   */
  applyControlledGate(gate: Matrix, control: number, target: number): void {
    const size = this.dimension

    for (let i = 0; i < size; i++) {
      // Only apply if control qubit is |1⟩
      if ((i & (1 << control)) !== 0) {
        // Check if target qubit bit is 0
        if ((i & (1 << target)) === 0) {
          const i0 = i
          const i1 = i | (1 << target)

          const a0 = this.amplitudes[i0]
          const a1 = this.amplitudes[i1]

          this.amplitudes[i0] = gate[0][0].multiply(a0).add(gate[0][1].multiply(a1))
          this.amplitudes[i1] = gate[1][0].multiply(a0).add(gate[1][1].multiply(a1))
        }
      }
    }
  }

  /**
   * Apply CNOT gate
   */
  applyCNOT(control: number, target: number): void {
    const size = this.dimension

    for (let i = 0; i < size; i++) {
      // If control is |1⟩, flip target
      if ((i & (1 << control)) !== 0 && (i & (1 << target)) === 0) {
        const j = i | (1 << target)
        const temp = this.amplitudes[i]
        this.amplitudes[i] = this.amplitudes[j]
        this.amplitudes[j] = temp
      }
    }
  }

  /**
   * Apply SWAP gate
   */
  applySWAP(qubit1: number, qubit2: number): void {
    const size = this.dimension

    for (let i = 0; i < size; i++) {
      const bit1 = (i >> qubit1) & 1
      const bit2 = (i >> qubit2) & 1

      if (bit1 !== bit2) {
        const j = i ^ (1 << qubit1) ^ (1 << qubit2)
        if (i < j) {
          const temp = this.amplitudes[i]
          this.amplitudes[i] = this.amplitudes[j]
          this.amplitudes[j] = temp
        }
      }
    }
  }

  /**
   * Measure a qubit, collapsing the state
   */
  measure(qubit: number): { result: number; probability: number } {
    // Calculate probability of measuring |0⟩
    let prob0 = 0
    for (let i = 0; i < this.dimension; i++) {
      if ((i & (1 << qubit)) === 0) {
        prob0 += this.probability(i)
      }
    }

    // Random measurement
    const rand = Math.random()
    const result = rand < prob0 ? 0 : 1
    const probability = result === 0 ? prob0 : 1 - prob0

    // Collapse the state
    const normFactor = 1 / Math.sqrt(probability)

    for (let i = 0; i < this.dimension; i++) {
      const bitValue = (i >> qubit) & 1
      if (bitValue !== result) {
        this.amplitudes[i] = Complex.zero()
      } else {
        this.amplitudes[i] = this.amplitudes[i].scale(normFactor)
      }
    }

    return { result, probability }
  }

  /**
   * Measure all qubits
   */
  measureAll(): { result: string; probability: number } {
    const probs = this.probabilities()
    const rand = Math.random()

    let cumulative = 0
    let measuredIndex = 0

    for (let i = 0; i < probs.length; i++) {
      cumulative += probs[i]
      if (rand < cumulative) {
        measuredIndex = i
        break
      }
    }

    const probability = probs[measuredIndex]
    const result = measuredIndex.toString(2).padStart(this.numQubits, '0')

    // Collapse to measured state
    this.amplitudes = this.amplitudes.map((_, i) =>
      i === measuredIndex ? Complex.one() : Complex.zero()
    )

    return { result, probability }
  }

  /**
   * Get state as a formatted string
   */
  toString(): string {
    const terms: string[] = []

    for (let i = 0; i < this.dimension; i++) {
      const amp = this.amplitudes[i]
      if (amp.magnitudeSquared() > 1e-10) {
        const basis = i.toString(2).padStart(this.numQubits, '0')
        terms.push(`(${amp.toLatex()})|${basis}⟩`)
      }
    }

    return terms.join(' + ') || '0'
  }

  /**
   * Get state as array of {amplitude, basis, probability}
   */
  toArray(): Array<{ amplitude: Complex; basis: string; probability: number }> {
    return this.amplitudes.map((amp, i) => ({
      amplitude: amp,
      basis: `|${i.toString(2).padStart(this.numQubits, '0')}⟩`,
      probability: amp.magnitudeSquared(),
    }))
  }
}
