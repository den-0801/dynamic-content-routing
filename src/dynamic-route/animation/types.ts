interface AnimationMinMax {
  min: number;
  max: number;
}

export interface ContentOptionsBase {
  el: HTMLElement;
  duration: number;
  delay: number;
}

export interface PartsOptionsBase {
  elsList: Array<HTMLElement>;
  duration: AnimationTimeRange;
  delay: AnimationTimeRange;
}

export type AnimationTimeRange = AnimationMinMax;

export interface ContentOptionsCss extends ContentOptionsBase {
  class: string;
}

export interface PartsOptionsCss extends PartsOptionsBase {
  class: string;
}

export interface ContentOptionsJs extends ContentOptionsBase {
  draw(el: HTMLElement, f: number): void;
  timing(n: number): number;
}

export interface PartsOptionsJs extends PartsOptionsBase {
  draw(el: HTMLElement, f: number): void;
  timing(n: number): number;
}

export interface ContentOptions extends Partial<ContentOptionsJs>, Partial<ContentOptionsCss> {}

export interface PartsOptions extends Partial<PartsOptionsJs>, Partial<PartsOptionsCss> {}

export type AnimationType = 'css' | 'js';

export interface AnimationOptions {
  content: ContentOptions;
  parts?: PartsOptions;
  reverseOrder?: boolean;
  type?: AnimationType;
}
