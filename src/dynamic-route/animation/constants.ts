import { linear } from '@/libs/animate/timing-functions';
import { fadeIn } from './draw-functions';

export const DEFAULT_PARTS_DELAY_MIN = 50;
export const DEFAULT_PARTS_DELAY_MAX = 500;
export const DEFAULT_PARTS_DURATION_MIN = 200;
export const DEFAULT_PARTS_DURATION_MAX = 500;

export const DEFAULT_CONTENT_DELAY = 500;
export const DEFAULT_CONTENT_DURATION = 200;
export const DEFAULT_DRAW = fadeIn;
export const DEFAULT_TIMING = linear;

export const DEFAULT_CONTENT_ANIMATION_IN_CLASS = 'dr-main-content-animation-in';
export const DEFAULT_CONTENT_ANIMATION_OUT_CLASS = 'dr-main-content-animation-out';
export const DEFAULT_PARTS_ANIMATION_IN_CLASS = 'dr-parts-content-animation-in';
export const DEFAULT_PARTS_ANIMATION_OUT_CLASS = 'dr-parts-content-animation-out';
