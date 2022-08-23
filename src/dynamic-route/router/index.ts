import { EventObserver } from '@/libs/EventObserver';

import { DEFAULT_LINK_SELECTOR } from '../constants';

import type { EmitEventType, RouterOptions } from './types';
import { HrefNotFoundError } from './errors';

export interface Router extends RouterOptions {
  run(): void;
  destroy(): void;
}

export class Router extends EventObserver {
  #previousHref: string;
  #clickHandlerBinded: (this: Document, ev: MouseEvent) => any;
  #popstateHandlerBinded: (this: Document, ev: any) => any;

  constructor(options?: RouterOptions) {
    super();

    this.linkSelector = options?.linkSelector || DEFAULT_LINK_SELECTOR;

    this.#clickHandlerBinded = <(event: Event) => boolean>this.#clickHandler.bind(this);
    this.#popstateHandlerBinded = <(event: Event) => void>this.#popstateHandler.bind(this);

    this.#previousHref = window.location.href;
  }

  run() {
    this.#addListeners();
  }

  destroy() {
    this.#removeListeners();
  }

  goBack() {
    if (this.#previousHref) {
      history.pushState({}, '', this.#previousHref);
    }
  }

  #addListeners() {
    document.addEventListener('click', this.#clickHandlerBinded);
    window.addEventListener('popstate', this.#popstateHandlerBinded);
  }

  #removeListeners() {
    document.removeEventListener('click', this.#clickHandlerBinded);
    window.removeEventListener('popstate', this.#popstateHandlerBinded);
  }

  #isElementLink(element: HTMLElement) {
    if (!this.linkSelector) return false;
    return element.matches(this.linkSelector);
  }

  #popstateHandler(event: any) {
    this.#generateEvent({
      type: 'popstate',
      href: window.location.href,
    });
  }

  #generateEvent(data: EmitEventType) {
    this.#previousHref = data.href;

    this.emit('action', data);
  }

  #clickHandler(event: Event) {
    const target = <HTMLElement>event.target;

    if (!this.#isElementLink(target)) return false;

    event.preventDefault();

    const href = target.getAttribute('href');
    if (!href) {
      const error = new HrefNotFoundError(target);
      this.emit('error', error);
      return false;
    }
    history.pushState({}, '', href);
    this.#generateEvent({
      type: 'link-click',
      nativeEvent: event,
      target,
      href,
    });

    return true;
  }
}
