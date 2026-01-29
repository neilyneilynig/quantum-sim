/**
 * Quantum gate definitions as unitary matrices
 */

import { Complex, SQRT2_INV } from './complex'

export type Matrix = Complex[][]

// Helper to create a matrix
function matrix(rows: number[][]): Matrix {
  return rows.map(row => row.map(val => new Complex(val)))
}

function complexMatrix(rows: [number, number][][]): Matrix {
  return rows.map(row => row.map(([r, i]) => new Complex(r, i)))
}

/**
 * Single-qubit gates
 */
export const Gates = {
  // Identity
  I: matrix([
    [1, 0],
    [0, 1],
  ]),

  // Pauli-X (NOT gate)
  X: matrix([
    [0, 1],
    [1, 0],
  ]),

  // Pauli-Y
  Y: complexMatrix([
    [[0, 0], [0, -1]],
    [[0, 1], [0, 0]],
  ]),

  // Pauli-Z (Phase flip)
  Z: matrix([
    [1, 0],
    [0, -1],
  ]),

  // Hadamard (Creates superposition)
  H: [
    [new Complex(SQRT2_INV), new Complex(SQRT2_INV)],
    [new Complex(SQRT2_INV), new Complex(-SQRT2_INV)],
  ],

  // S gate (√Z)
  S: complexMatrix([
    [[1, 0], [0, 0]],
    [[0, 0], [0, 1]],
  ]),

  // T gate (√S)
  T: [
    [new Complex(1), new Complex(0)],
    [new Complex(0), Complex.fromPolar(1, Math.PI / 4)],
  ],

  // S† (S-dagger)
  Sdg: complexMatrix([
    [[1, 0], [0, 0]],
    [[0, 0], [0, -1]],
  ]),

  // T† (T-dagger)
  Tdg: [
    [new Complex(1), new Complex(0)],
    [new Complex(0), Complex.fromPolar(1, -Math.PI / 4)],
  ],

  // √X gate
  SX: [
    [new Complex(0.5, 0.5), new Complex(0.5, -0.5)],
    [new Complex(0.5, -0.5), new Complex(0.5, 0.5)],
  ],
}

/**
 * Rotation gates
 */
export function Rx(theta: number): Matrix {
  const c = Math.cos(theta / 2)
  const s = Math.sin(theta / 2)
  return [
    [new Complex(c), new Complex(0, -s)],
    [new Complex(0, -s), new Complex(c)],
  ]
}

export function Ry(theta: number): Matrix {
  const c = Math.cos(theta / 2)
  const s = Math.sin(theta / 2)
  return [
    [new Complex(c), new Complex(-s)],
    [new Complex(s), new Complex(c)],
  ]
}

export function Rz(theta: number): Matrix {
  return [
    [Complex.fromPolar(1, -theta / 2), new Complex(0)],
    [new Complex(0), Complex.fromPolar(1, theta / 2)],
  ]
}

/**
 * Phase gate with arbitrary angle
 */
export function Phase(phi: number): Matrix {
  return [
    [new Complex(1), new Complex(0)],
    [new Complex(0), Complex.fromPolar(1, phi)],
  ]
}

/**
 * Two-qubit gates (as 4x4 matrices)
 */
export const TwoQubitGates = {
  // CNOT (Controlled-X)
  CNOT: matrix([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
  ]),

  // CZ (Controlled-Z)
  CZ: matrix([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, -1],
  ]),

  // SWAP
  SWAP: matrix([
    [1, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
  ]),

  // iSWAP
  iSWAP: complexMatrix([
    [[1, 0], [0, 0], [0, 0], [0, 0]],
    [[0, 0], [0, 0], [0, 1], [0, 0]],
    [[0, 0], [0, 1], [0, 0], [0, 0]],
    [[0, 0], [0, 0], [0, 0], [1, 0]],
  ]),

  // √SWAP
  SQSWAP: [
    [new Complex(1), new Complex(0), new Complex(0), new Complex(0)],
    [new Complex(0), new Complex(0.5, 0.5), new Complex(0.5, -0.5), new Complex(0)],
    [new Complex(0), new Complex(0.5, -0.5), new Complex(0.5, 0.5), new Complex(0)],
    [new Complex(0), new Complex(0), new Complex(0), new Complex(1)],
  ],
}

/**
 * Three-qubit gates (as 8x8 matrices)
 */
export const ThreeQubitGates = {
  // Toffoli (CCX)
  TOFFOLI: (() => {
    const m: Matrix = []
    for (let i = 0; i < 8; i++) {
      m[i] = []
      for (let j = 0; j < 8; j++) {
        if (i === 6 && j === 7) m[i][j] = new Complex(1)
        else if (i === 7 && j === 6) m[i][j] = new Complex(1)
        else if (i === j && i !== 6 && i !== 7) m[i][j] = new Complex(1)
        else m[i][j] = new Complex(0)
      }
    }
    return m
  })(),

  // Fredkin (CSWAP)
  FREDKIN: (() => {
    const m: Matrix = []
    for (let i = 0; i < 8; i++) {
      m[i] = []
      for (let j = 0; j < 8; j++) {
        if (i === 5 && j === 6) m[i][j] = new Complex(1)
        else if (i === 6 && j === 5) m[i][j] = new Complex(1)
        else if (i === j && i !== 5 && i !== 6) m[i][j] = new Complex(1)
        else m[i][j] = new Complex(0)
      }
    }
    return m
  })(),
}

export type GateName = keyof typeof Gates | 'CNOT' | 'CZ' | 'SWAP' | 'TOFFOLI'
