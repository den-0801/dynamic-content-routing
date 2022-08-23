import { animate as animateSimple, type AnimateOptions as AnimateSimpleOptions } from '../../libs/animate';

import type { ContentOptionsJs, PartsOptionsJs } from './types';

export async function animateParts(parts: PartsOptionsJs) {
  const partPromises = [];
  for (let i = 0; i < parts.elsList.length; i++) {
    const partEl = parts.elsList[i];

    const delayMin = parts.delay?.min;
    const delayMax = parts.delay?.max;
    const delay = Math.random() * (delayMax - delayMin) + delayMin;

    const durationMin = parts.duration?.min;
    const durationMax = parts.duration?.max;
    const duration = Math.random() * (durationMax - durationMin) + durationMin;

    const draw = parts.draw;
    const timing = parts.timing;

    partPromises.push(
      animateSimple({
        draw: (f) => draw(partEl, f),
        duration,
        delay,
        timing,
      })
    );
  }
  return Promise.all(partPromises);
}

export async function animateContent(content: ContentOptionsJs) {
  const duration = content?.duration;
  const delay = content?.delay;
  const draw = content?.draw;
  const timing = content?.timing;
  return animateSimple({
    draw: (f) => draw(content.el, f),
    duration,
    delay,
    timing,
  });
}
