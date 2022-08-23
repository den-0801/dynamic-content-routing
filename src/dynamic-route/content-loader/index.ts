import { EventObserver } from '@/libs/EventObserver';

import { Content, ContentLoaderProps } from './types';
import {
  LoadingContentElementNotFoundError,
  RequestError,
  ResponseParseError,
  NetworkError,
  NoInternetConnection,
  RequestAbortedError,
} from './errors';

export interface ContentLoader extends ContentLoaderProps {
  load(url: string): Promise<Content>;
}

export class ContentLoader extends EventObserver {
  #abortController: AbortController;

  constructor(options: ContentLoaderProps) {
    super();
    this.selector = options.selector;
  }

  stop() {
    if (this.#abortController) {
      this.#abortController.abort();
    }
  }

  async load(url: string): Promise<Content> {
    try {
      this.#abortController = new AbortController();
      const response = await fetch(url, {
        signal: this.#abortController.signal,
      });
      if (response.ok) {
        try {
          const htmlStr = await response.text();
          const html = document.createElement('div');
          html.innerHTML = htmlStr;
          const contentElement = html.querySelector(`${this.selector}`);
          if (!(contentElement instanceof HTMLElement)) {
            const error = new LoadingContentElementNotFoundError(this.selector);
            return Promise.reject(error);
          }

          const emitData: Content = {
            contentElement,
          };
          return Promise.resolve(emitData);
        } catch (_error) {
          const error = new ResponseParseError(`${(<Error>_error)?.message}`, response);
          return Promise.reject(error);
        }
      } else {
        const error = new RequestError(response);
        return Promise.reject(error);
      }
    } catch (_error) {
      if (!navigator.onLine) {
        const error = new NoInternetConnection();
        return Promise.reject(error);
      }
      if ((<Error>_error).name === 'AbortError') {
        const error = new RequestAbortedError();
        return Promise.reject(error);
      }
      const error = new NetworkError();
      return Promise.reject(error);
    }
  }
}
