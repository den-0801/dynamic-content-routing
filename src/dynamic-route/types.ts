import {
  type PartsOptions as PartsAnimationOptions,
  type ContentOptions as ContentAnimationOptions,
  type AnimationType,
} from './animation/types';

export type ContentOptions = {
  selector?: string;
  animationIn?: Omit<ContentAnimationOptions, 'el'>;
  animationOut?: Omit<ContentAnimationOptions, 'el'>;
};

export interface PartsOptions {
  selector?: string;
  animationIn?: Omit<PartsAnimationOptions, 'el'>;
  animationOut?: Omit<PartsAnimationOptions, 'el'>;
}

export type DynamicRouteOptions = {
  linkSelector?: string;
  animationType?: AnimationType;

  content?: ContentOptions;
  parts?: PartsOptions;
};

export interface DynamicRoutePublicProps {
  linkSelector: string;
  animationType: AnimationType;

  content: Required<ContentOptions>;
  parts: Required<PartsOptions>;
}
