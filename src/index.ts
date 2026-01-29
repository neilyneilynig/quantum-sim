/**
 * QuantumSim - A quantum computing simulator
 * 
 * @example
 * ```ts
 * import { QuantumCircuit } from 'quantum-sim'
 * 
 * // Create a 2-qubit circuit
 * const circuit = new QuantumCircuit(2)
 * 
 * // Build a Bell state
 * circuit.h(0)      // Hadamard on qubit 0
 * circuit.cx(0, 1)  // CNOT with control=0, target=1
 * 
 * // Run and get the statevector
 * const state = circuit.run()
 * console.log(state.toString())
 * // Output: (0.707)|00⟩ + (0.707)|11⟩
 * 
 * // Sample measurements
 * const results = circuit.sample(1000)
 * console.log(results.counts)
 * // Output: { '00': ~500, '11': ~500 }
 * ```
 */

export { Complex, SQRT2, SQRT2_INV } from './core/complex'
export { Gates, TwoQubitGates, ThreeQubitGates, Rx, Ry, Rz, Phase } from './core/gates'
export type { Matrix, GateName } from './core/gates'
export { StateVector } from './core/state'
export { QuantumCircuit } from './core/circuit'
export type { GateOperation, MeasurementResult } from './core/circuit'

// Re-export everything as default for convenience
import { QuantumCircuit } from './core/circuit'
export default QuantumCircuit
