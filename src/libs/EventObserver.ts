export interface EventObserverInterface {
  emit(type: string, data?: Object): void,
  on(type: string, subscriber: Function): void,
  off(type: string, subscriber: Function): void,
}

export class EventObserver implements EventObserverInterface {
  // #subscribers: { [key: string]: Array<Function> }
  #subscribers: Record<string, Array<Function>>

  constructor() {
    this.#subscribers = {};
  }

  getSubscribers(type: string): Array<Function> {
    return this.#subscribers[type];
  }

  emit(type: string, data?: Object): void {
    if (this.#subscribers[type]) {
      this.#subscribers[type].forEach((subscriber: Function) => {
        subscriber(data);
      });
    }
  }

  on(type: string, subscriber: Function): void {
    if (!this.#subscribers[type]) {
      this.#subscribers[type] = [];
    }
    this.#subscribers[type].push(subscriber);
  }

  off(type?: string, subscriber?: Function): void {
    if (!type) {
      this.#subscribers = {};
    } else if (!subscriber && this.#subscribers[type] !== undefined) {
      this.#subscribers[type] = [];
    } else if (this.#subscribers[type] !== undefined && subscriber instanceof Function) {
      const index = this.#subscribers[type].indexOf(subscriber);
      if (index > -1) {
        this.#subscribers[type].splice(index, 1);
      }
    }
  }
}