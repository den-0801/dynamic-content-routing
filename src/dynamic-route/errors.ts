// create MyError this.name = this.constructor.name;

export * from './animation/errors';
export * from './content-loader/errors';
export * from './router/errors';

export class ContentElementNotFoundError extends Error {
  // ??
  public selector: string;

  constructor(selector: string) {
    super('Content element not found');

    this.name = this.constructor.name;
    this.selector = selector;
  }
}

// export class DynamicRouteError extends Error {
//   public cause : Error;

//   constructor(cause : Error) {
//     super(cause.message);

//     this.name = this.constructor.name;
//     this.cause  = cause ;
//   }
// }
