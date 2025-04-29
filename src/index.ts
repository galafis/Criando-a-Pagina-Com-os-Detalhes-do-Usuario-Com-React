export function soma(a: number, b: number): number {
  return a + b;
}

export function subtrai(a: number, b: number): number {
  return a - b;
}

export function multiplica(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (b === 0) throw new Error("Divisão por zero!");
  return a / b;
}