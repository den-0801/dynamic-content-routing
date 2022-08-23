export function fadeIn(el: HTMLElement, f: number) {
  el.style.setProperty('opacity', `${f}`);
}

export function fadeOut(el: HTMLElement, f: number) {
  el.style.setProperty('opacity', `${1 - f}`);
}

export function moveYIn(el: HTMLElement, f: number, delta: number) {
  el.style.setProperty('transform', `translateY(${(1 - f) * delta}px)`);
  el.style.setProperty('opacity', `${f}`);
}

export function moveYOut(el: HTMLElement, f: number, delta: number) {
  el.style.setProperty('transform', `translateY(${f * delta}px)`);
  el.style.setProperty('opacity', `${1 - f}`);
}
