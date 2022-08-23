export type RouterOptions = {
  linkSelector?: string;
};

export type EmitEventType = {
  type: string;
  nativeEvent?: Event;
  target?: HTMLElement;
  href: string;
};
