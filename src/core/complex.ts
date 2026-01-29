/**
 * Complex number implementation for quantum state calculations
 */

export class Complex {
  constructor(public real: number, public imag: number = 0) {}

  static fromPolar(magnitude: number, phase: number): Complex {
    return new Complex(
      magnitude * Math.cos(phase),
      magnitude * Math.sin(phase)
    )
  }

  static zero(): Complex {
    return new Complex(0, 0)
  }

  static one(): Complex {
    return new Complex(1, 0)
  }

  static i(): Complex {
    return new Complex(0, 1)
  }

  add(other: Complex): Complex {
    return new Complex(this.real + other.real, this.imag + other.imag)
  }

  subtract(other: Complex): Complex {
    return new Complex(this.real - other.real, this.imag - other.imag)
  }

  multiply(other: Complex): Complex {
    return new Complex(
      this.real * other.real - this.imag * other.imag,
      this.real * other.imag + this.imag * other.real
    )
  }

  scale(scalar: number): Complex {
    return new Complex(this.real * scalar, this.imag * scalar)
  }

  conjugate(): Complex {
    return new Complex(this.real, -this.imag)
  }

  magnitude(): number {
    return Math.sqrt(this.real * this.real + this.imag * this.imag)
  }

  magnitudeSquared(): number {
    return this.real * this.real + this.imag * this.imag
  }

  phase(): number {
    return Math.atan2(this.imag, this.real)
  }

  normalize(): Complex {
    const mag = this.magnitude()
    if (mag === 0) return Complex.zero()
    return new Complex(this.real / mag, this.imag / mag)
  }

  equals(other: Complex, epsilon: number = 1e-10): boolean {
    return (
      Math.abs(this.real - other.real) < epsilon &&
      Math.abs(this.imag - other.imag) < epsilon
    )
  }

  toString(): string {
    if (this.imag === 0) return `${this.real.toFixed(4)}`
    if (this.real === 0) return `${this.imag.toFixed(4)}i`
    const sign = this.imag >= 0 ? '+' : '-'
    return `${this.real.toFixed(4)} ${sign} ${Math.abs(this.imag).toFixed(4)}i`
  }

  toLatex(): string {
    if (Math.abs(this.imag) < 1e-10) return this.real.toFixed(3)
    if (Math.abs(this.real) < 1e-10) return `${this.imag.toFixed(3)}i`
    const sign = this.imag >= 0 ? '+' : '-'
    return `${this.real.toFixed(3)} ${sign} ${Math.abs(this.imag).toFixed(3)}i`
  }
}

// Common constants
export const SQRT2_INV = 1 / Math.sqrt(2)
export const SQRT2 = Math.sqrt(2)
