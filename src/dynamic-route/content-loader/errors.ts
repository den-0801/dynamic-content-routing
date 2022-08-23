export class NetworkError extends Error {
  constructor(message?: string) {
    super(message == null ? 'Network error' : message);
    this.name = this.constructor.name;
  }
}
export class NoInternetConnection extends NetworkError {
  constructor() {
    super('No internet connection');
    this.name = this.constructor.name;
  }
}

export class RequestAbortedError extends Error {
  constructor() {
    super('Request was aborted');
    this.name = this.constructor.name;
  }
}

export class RequestError extends Error {
  public response?: Response;

  constructor(response?: Response) {
    super();

    this.name = this.constructor.name;
    if (response) {
      this.response = response;
    }
  }
}

export class ResponseParseError extends Error {
  public response: Response;

  constructor(message: string, response: Response) {
    super(message);

    this.name = this.constructor.name;
    this.response = response;
  }
}

export class LoadingContentElementNotFoundError extends Error {
  // ??
  public selector: string;

  constructor(selector: string) {
    super('Content not found');

    this.name = this.constructor.name;
    this.selector = selector;
  }
}
