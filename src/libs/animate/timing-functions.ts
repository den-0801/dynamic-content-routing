export function linear(t: number) {
  return t;
}

export function linearReverce(t: number) {
  return 1 - t;
}

export function quad(t: number, n: number) {
  return Math.pow(t, n);
}

export function easeInOut(t: number) {
  if (t < 0.5) {
    return 4 * Math.pow(t, 3);
  }
  return 4 * Math.pow(t - 1, 3) + 1;
}
