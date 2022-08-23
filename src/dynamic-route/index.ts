import { animate as animateSimple } from '@/libs/animate';
import { EventObserver } from '@/libs/EventObserver';
import { linear } from '@/libs/animate/timing-functions';

import { animate, getContentDefault, getPartsDefault } from './animation';
import { removeAnimationPropsFromEl } from './animation/animationCss';
import type { AnimationOptions } from './animation/types';

import { Router } from './router';
import { HrefNotFoundError } from './router/errors';
import { EmitEventType as EventRoute } from './router/types';

import { ContentLoader } from './content-loader';
import { RequestAbortedError } from './content-loader/errors';
import { Content as LoadingContent } from './content-loader/types';

import { ContentElementNotFoundError } from './errors';
import type { DynamicRouteOptions, DynamicRoutePublicProps } from './types';
import { DEFAULT_CONTENT_SELECTOR, DEFAULT_PARTS_SELECTOR, DEFAULT_LINK_SELECTOR } from './constants';

export interface DynamicRoute extends DynamicRoutePublicProps {
  /**
   * attach all required listeners
   */
  run(): void;
  /**
   * detach all required listeners
   */
  destroy(): void;
}

export class DynamicRoute extends EventObserver {
  #contentEl: HTMLElement;
  #partElsList: Array<HTMLElement> = [];
  #router: Router;
  #contentLoader: ContentLoader;
  #inProgress: boolean;

  constructor(options?: DynamicRouteOptions) {
    super();
    this.#setDefaultOptions(options);

    this.#router = new Router({ linkSelector: this.linkSelector });
    this.#contentLoader = new ContentLoader({
      selector: this.content?.selector,
    }); // ?
  }

  #setDefaultOptions(options?: DynamicRouteOptions) {
    this.linkSelector = options?.linkSelector || DEFAULT_LINK_SELECTOR;
    this.animationType = options?.animationType || 'css';

    this.content = {
      selector: options?.content?.selector ?? DEFAULT_CONTENT_SELECTOR,
      animationIn: options?.content?.animationIn ?? {},
      animationOut: options?.content?.animationOut ?? {},
    };
    this.parts = {
      selector: options?.parts?.selector ?? DEFAULT_PARTS_SELECTOR,
      animationIn: options?.parts?.animationIn ?? {},
      animationOut: options?.parts?.animationOut ?? {},
    };

    this.content.animationIn = getContentDefault(this.content.animationIn, true, this.animationType);
    this.content.animationOut = getContentDefault(this.content.animationOut, false, this.animationType);
    this.parts.animationIn = getPartsDefault(this.parts.animationIn, true, this.animationType);
    this.parts.animationOut = getPartsDefault(this.parts.animationOut, false, this.animationType);
  }

  run() {
    this.#router.run();
    this.#router.on('action', this.#onRouteAction.bind(this));
    this.#router.on('error', this.#onRouteError.bind(this));
  }

  destroy() {
    this.#router.off();
    this.#router.destroy();
    this.#contentLoader.off();
  }

  #setContentElBySelector(): void {
    if (this.content) {
      this.#contentEl = <HTMLElement>document.querySelector(`${this.content.selector}`);
    }
  }

  #setPartElsListBySelector(): void {
    if (this.parts) {
      this.#partElsList = <Array<HTMLElement>>[...document.querySelectorAll(`${this.parts.selector}`)];
    } else {
      this.#partElsList = [];
    }
  }

  #setContentAndPartsEls() {
    this.#setContentElBySelector();
    if (!this.#contentEl) {
      const error = new ContentElementNotFoundError(this.content?.selector);
      throw error;
    }
    this.#setPartElsListBySelector();
  }

  async #animateOutAndLoadContent(routeEvent: EventRoute): Promise<LoadingContent> {
    const promises: Array<Promise<any>> = [];
    promises.push(this.#loadContent(routeEvent));
    // if (!this.#inProgress) {
    promises.push(this.#animateOut());
    // }
    this.emit('start');
    const results = await Promise.allSettled(promises);
    if (results[0].status === 'rejected') {
      return Promise.reject(results[0].reason);
    }
    if (results[1].status === 'rejected') {
      return Promise.reject(results[1].reason);
    }
    return Promise.resolve(<LoadingContent>results[0].value);
  }

  async #loadContent(routeEvent: EventRoute): Promise<LoadingContent> {
    if (this.#inProgress) this.#contentLoader.stop();
    return this.#contentLoader.load(routeEvent.href);
  }

  getAnimationProps(type: 'in' | 'out') {
    const key = type === 'in' ? 'animationIn' : 'animationOut';
    const props: Required<AnimationOptions> = {
      type: this.animationType,
      reverseOrder: type === 'in',
      content: {
        el: this.#contentEl,
        duration: this.content?.[key]?.duration,
        delay: this.content?.[key]?.delay,
      },
      parts: {
        elsList: this.#partElsList,
        duration: this.parts?.[key]?.duration,
        delay: this.parts?.[key]?.delay,
      },
    };
    if (this.animationType === 'css') {
      props.content.class = this.content?.[key]?.class;
      props.parts.class = this.parts?.[key]?.class;
    } else {
      props.content.draw = this.content?.[key]?.draw;
      props.content.timing = this.content?.[key]?.timing;

      props.parts.draw = this.parts?.[key]?.draw;
      props.parts.timing = this.parts?.[key]?.timing;
    }

    return props;
  }

  #resetAnimationElProps(type: 'in' | 'out') {
    if (this.animationType === 'css') {
      const key = type === 'in' ? 'animationIn' : 'animationOut';
      removeAnimationPropsFromEl(this.#contentEl, this.content[key].class!);
      this.#partElsList.forEach((partEl) => {
        removeAnimationPropsFromEl(partEl, this.parts[key].class!);
      });
    }
  }

  #resetAllAnimationEls() {
    this.#resetAnimationElProps('in');
    this.#resetAnimationElProps('out');
  }

  async #animateIn(): Promise<void> {
    return animate(this.getAnimationProps('in')).catch((error) => {
      return Promise.reject({
        type: 'animation-in',
        ...error,
      });
    });
  }

  async #animateOut(): Promise<void> {
    return animate(this.getAnimationProps('out')).catch((error) => {
      return Promise.reject({
        type: 'animation-out',
        ...error,
      });
    });
  }

  #replaceContent(newHtml: string) {
    this.#contentEl.outerHTML = newHtml;
  }

  async #animateContentHeight(prevHeight: number): Promise<void> {
    return new Promise((resolve, reject) => {
      requestAnimationFrame(() => {
        const newHeight = this.#contentEl.offsetHeight;

        this.#contentEl.style.height = `${prevHeight}px`;

        animateSimple({
          draw: (f: number) => {
            this.#contentEl.style.height = `${f * (newHeight - prevHeight) + prevHeight}px`;
          },
          duration: 1500,
          timing: linear,
        })
          .then(() => {
            this.#contentEl.style.height = '';
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }

  #onRouteError(error: HrefNotFoundError) {
    if (!this.#inProgress) {
      this.emit('error', error);
      this.#inProgress = false;
    }
  }

  async #onRouteAction(routeEvent: EventRoute): Promise<void> {
    if (this.#inProgress) return Promise.resolve();

    this.#setContentAndPartsEls();

    this.#inProgress = true;

    // const prevHeight = this.#contentEl.offsetHeight;

    try {
      const loadedData = await this.#animateOutAndLoadContent(routeEvent);

      this.#replaceContent(loadedData.contentElement?.outerHTML);

      this.#setContentAndPartsEls();
      // this.#animateContentHeight(prevHeight); // ???

      if (this.animationType === 'js') {
        this.#partElsList.forEach((p) => this.parts?.animationIn?.draw?.(p, 0));
        this.content?.animationIn?.draw?.(this.#contentEl, 0);
      }
      await this.#animateIn();
      this.#resetAnimationElProps('in');

      this.#inProgress = false;

      this.emit('complete');
    } catch (error) {
      if (!(error instanceof RequestAbortedError)) {
        this.#resetAnimationElProps('out');
        this.#replaceContent(this.#contentEl?.outerHTML);
        this.#setContentAndPartsEls();
        await this.#animateIn();
        this.#resetAnimationElProps('in');
        this.#router.goBack();
        this.emit('error', error as object);
        this.#inProgress = false;
      }
    }
  }
}
