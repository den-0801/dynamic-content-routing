export class HrefNotFoundError extends Error {
  public element: HTMLElement;

  constructor(element: HTMLElement) {
    super('Href not found');

    this.name = this.constructor.name;
    this.element = element;
  }
}
