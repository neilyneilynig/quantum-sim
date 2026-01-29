# 🔮 QuantumSim

A quantum computing simulator that runs in your browser. Simulate quantum circuits, visualize quantum states, and learn quantum computing interactively.

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- **🔧 Circuit Builder** - Drag-and-drop quantum gates (H, X, Y, Z, CNOT, etc.)
- **📊 State Visualization** - See probability amplitudes and Bloch spheres
- **🎯 Measurement** - Simulate quantum measurements with real probabilities
- **📚 Built-in Tutorials** - Learn quantum computing step by step
- **💾 Save & Share** - Export circuits as JSON or shareable links

## 🚀 Demo

Try it live: [quantumsim.dev](https://quantumsim.dev)

## Quick Start

```bash
npm install
npm run dev
```

## Supported Gates

| Gate | Symbol | Description |
|------|--------|-------------|
| Hadamard | H | Creates superposition |
| Pauli-X | X | Quantum NOT gate |
| Pauli-Y | Y | Rotation around Y-axis |
| Pauli-Z | Z | Phase flip |
| CNOT | CX | Controlled NOT |
| Toffoli | CCX | Controlled-controlled NOT |
| SWAP | ⇄ | Swaps two qubits |
| Phase | S, T | Phase rotation gates |

## How It Works

The simulator uses a state vector representation to track quantum states:

```typescript
// 2-qubit system
const state = [
  { amplitude: Complex(0.5, 0), basis: '|00⟩' },
  { amplitude: Complex(0.5, 0), basis: '|01⟩' },
  { amplitude: Complex(0.5, 0), basis: '|10⟩' },
  { amplitude: Complex(0.5, 0), basis: '|11⟩' },
]
```

Gates are applied as unitary matrix operations, preserving quantum mechanical properties.

## Example: Bell State

```typescript
import { QuantumCircuit } from 'quantum-sim'

const circuit = new QuantumCircuit(2)
circuit.h(0)      // Hadamard on qubit 0
circuit.cx(0, 1)  // CNOT with control=0, target=1

const result = circuit.run()
// |00⟩: 50%, |11⟩: 50% (entangled!)
```

## Architecture

```
quantum-sim/
├── src/
│   ├── core/           # Quantum simulation engine
│   │   ├── circuit.ts  # Circuit representation
│   │   ├── gates.ts    # Gate definitions
│   │   ├── state.ts    # State vector math
│   │   └── measure.ts  # Measurement simulation
│   ├── components/     # React UI components
│   │   ├── CircuitBuilder/
│   │   ├── StateVisualization/
│   │   └── BlochSphere/
│   └── tutorials/      # Interactive lessons
```

## Contributing

PRs welcome! See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
