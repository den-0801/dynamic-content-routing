import type { ContentOptionsCss, PartsOptionsCss } from './types';

export function addAnimationPropsToEl(el: HTMLElement, props: Omit<ContentOptionsCss, 'el'>) {
  el.classList.add(props.class);
  if (props.duration != null) el.style.setProperty('animation-duration', `${props.duration}ms`);
  if (props.delay != null) el.style.setProperty('animation-delay', `${props.delay}ms`);
}

export function removeAnimationPropsFromEl(el: HTMLElement, elClass: string) {
  el.classList.remove(elClass);
  el.style.setProperty('animation-duration', null);
  el.style.setProperty('animation-delay', null);
}

async function animationendPromise(el: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const onAnimationend = (event: Event) => {
      event.stopPropagation();
      // el.removeEventListener('animationend', onAnimationend);
      resolve();
    };
    el.addEventListener('animationend', onAnimationend, { once: true });
  });
}

export async function animateContent(content: ContentOptionsCss) {
  addAnimationPropsToEl(content.el, content);
  return animationendPromise(content.el).then(() => {
    return Promise.resolve();
  });
}

export async function animateParts(parts: PartsOptionsCss) {
  const partPromises = [];
  for (let i = 0; i < parts.elsList.length; i++) {
    const partEl = parts.elsList[i];

    const durationMin = parts.duration?.min;
    const durationMax = parts.duration?.max;
    const duration = Math.random() * (durationMax - durationMin) + durationMin;

    const delayMin = parts.delay?.min;
    const delayMax = parts.delay?.max;
    const delay = Math.random() * (delayMax - delayMin) + delayMin;

    addAnimationPropsToEl(partEl, { duration, delay, class: parts.class });

    partPromises.push(animationendPromise(partEl));
  }

  return Promise.all(partPromises);
}
