import { animateContent as animateContentJs, animateParts as animatePartsJs } from './animationJs';

import {
  animateContent as animateContentCss,
  animateParts as animatePartsCss,
  removeAnimationPropsFromEl,
  addAnimationPropsToEl,
} from './animationCss';

import {
  DEFAULT_PARTS_DELAY_MIN,
  DEFAULT_PARTS_DELAY_MAX,
  DEFAULT_PARTS_DURATION_MIN,
  DEFAULT_PARTS_DURATION_MAX,
  DEFAULT_CONTENT_DELAY,
  DEFAULT_CONTENT_DURATION,
  DEFAULT_DRAW,
  DEFAULT_TIMING,
  DEFAULT_CONTENT_ANIMATION_IN_CLASS,
  DEFAULT_CONTENT_ANIMATION_OUT_CLASS,
  DEFAULT_PARTS_ANIMATION_IN_CLASS,
  DEFAULT_PARTS_ANIMATION_OUT_CLASS,
} from './constants';

import type {
  ContentOptionsCss,
  PartsOptionsCss,
  ContentOptionsJs,
  PartsOptionsJs,
  ContentOptions,
  PartsOptions,
  AnimationType,
  AnimationOptions,
} from './types';

import { AnimationError } from './errors';

function getContentJsDefault(content: ContentOptions, reverseOrder?: boolean) {
  const newContent = { ...content };
  if (newContent.delay == null) newContent.delay = DEFAULT_CONTENT_DELAY;
  if (newContent.duration == null) newContent.duration = DEFAULT_CONTENT_DURATION;
  if (newContent.draw == null) newContent.draw = DEFAULT_DRAW;
  if (newContent.timing == null) newContent.timing = DEFAULT_TIMING;
  return newContent as ContentOptionsJs;
}
function getContentCssDefault(content: ContentOptions, reverseOrder?: boolean) {
  const newContent = { ...content };
  if (newContent.delay == null) newContent.delay = DEFAULT_CONTENT_DELAY;
  if (newContent.duration == null) newContent.duration = DEFAULT_CONTENT_DURATION;
  if (newContent.class == null && reverseOrder) newContent.class = DEFAULT_CONTENT_ANIMATION_IN_CLASS;
  if (newContent.class == null && !reverseOrder) newContent.class = DEFAULT_CONTENT_ANIMATION_OUT_CLASS;
  return newContent as ContentOptionsCss;
}
function getPartsJsDefault(parts: PartsOptions, reverseOrder?: boolean) {
  const newParts = { ...parts };
  if (newParts.delay == null) newParts.delay = { min: DEFAULT_PARTS_DELAY_MIN, max: DEFAULT_PARTS_DELAY_MAX };
  if (newParts.duration == null)
    newParts.duration = { min: DEFAULT_PARTS_DURATION_MIN, max: DEFAULT_PARTS_DURATION_MAX };
  if (newParts.draw == null) newParts.draw = DEFAULT_DRAW;
  if (newParts.timing == null) newParts.timing = DEFAULT_TIMING;
  return newParts as PartsOptionsJs;
}
function getPartsCssDefault(parts: PartsOptions, reverseOrder?: boolean) {
  const newParts = { ...parts };
  if (newParts.delay == null) newParts.delay = { min: DEFAULT_PARTS_DELAY_MIN, max: DEFAULT_PARTS_DELAY_MAX };
  if (newParts.duration == null)
    newParts.duration = { min: DEFAULT_PARTS_DURATION_MIN, max: DEFAULT_PARTS_DURATION_MAX };
  if (newParts.class == null && reverseOrder) newParts.class = DEFAULT_PARTS_ANIMATION_IN_CLASS;
  if (newParts.class == null && !reverseOrder) newParts.class = DEFAULT_PARTS_ANIMATION_OUT_CLASS;
  return newParts as PartsOptionsCss;
}

export function getContentDefault(
  content: Omit<ContentOptions, 'el'>,
  reverseOrder: boolean,
  animationType: AnimationType
) {
  if (animationType === 'css') {
    return getContentCssDefault(content, reverseOrder);
  }
  return getContentJsDefault(content, reverseOrder);
}
export function getPartsDefault(parts: Omit<PartsOptions, 'el'>, reverseOrder: boolean, animationType: AnimationType) {
  if (animationType === 'css') {
    return getPartsCssDefault(parts, reverseOrder);
  }
  return getPartsJsDefault(parts, reverseOrder);
}

async function animateJs({ content, parts, reverseOrder }: AnimationOptions): Promise<void> {
  const _content = getContentJsDefault(content, reverseOrder);
  const _parts = parts ? getPartsJsDefault(parts, reverseOrder) : null;

  return new Promise((resolve, reject) => {
    if (reverseOrder) {
      animateContentJs(_content)
        .then(() => {
          const partPromises = _parts ? animatePartsJs(_parts) : Promise.resolve(null);
          return partPromises;
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      const partPromises = _parts ? animatePartsJs(_parts) : Promise.resolve(null);
      partPromises
        .then(() => {
          return animateContentJs(_content);
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

async function animateCss({ content, parts, reverseOrder }: AnimationOptions): Promise<void> {
  const _content = getContentCssDefault(content, reverseOrder);
  const _parts = parts ? getPartsCssDefault(parts, reverseOrder) : null;

  return new Promise((resolve, reject) => {
    if (reverseOrder) {
      if (_parts) {
        const delta = (content.delay ?? 0) + (content.duration ?? 0);
        _parts.delay.max = _parts.delay.max + delta;
        _parts.delay.min = _parts.delay.min + delta;
      }

      const promises: Array<Promise<void[]> | Promise<void>> = [animateContentCss(_content)];
      if (_parts) {
        promises.push(animatePartsCss(_parts));
      }
      Promise.all(promises)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      const partPromises = _parts ? animatePartsCss(_parts) : Promise.resolve(null);
      partPromises
        .then(() => {
          return animateContentCss(_content);
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

export async function animate({ content, parts, reverseOrder, type }: AnimationOptions): Promise<void> {
  const promise =
    type === 'css' ? animateCss({ content, parts, reverseOrder }) : animateJs({ content, parts, reverseOrder });

  return new Promise((resolve, reject) => {
    promise
      .then(() => {
        resolve();
      })
      .catch((_error) => {
        const error = new AnimationError((<Error>_error)?.message ?? _error);
        reject(error);
      });
  });
}
