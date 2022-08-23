/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}

function doDelay(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
function simpleAnimate({ timing, draw, duration }) {
    return new Promise((resolve, reject) => {
        try {
            const start = performance.now();
            requestAnimationFrame(function _animate(time) {
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1)
                    timeFraction = 1;
                const progress = timing(timeFraction);
                draw(progress);
                if (timeFraction < 1) {
                    requestAnimationFrame(_animate);
                }
                else {
                    resolve();
                }
            });
        }
        catch (error) {
            reject(new Error(error));
        }
    });
}
function animate$1({ timing, draw, duration, delay }) {
    if (delay) {
        return doDelay(delay).then(() => {
            return simpleAnimate({ timing, draw, duration });
        });
    }
    return simpleAnimate({ timing, draw, duration });
}

var _EventObserver_subscribers;
class EventObserver {
    constructor() {
        // #subscribers: { [key: string]: Array<Function> }
        _EventObserver_subscribers.set(this, void 0);
        __classPrivateFieldSet(this, _EventObserver_subscribers, {}, "f");
    }
    getSubscribers(type) {
        return __classPrivateFieldGet(this, _EventObserver_subscribers, "f")[type];
    }
    emit(type, data) {
        if (__classPrivateFieldGet(this, _EventObserver_subscribers, "f")[type]) {
            __classPrivateFieldGet(this, _EventObserver_subscribers, "f")[type].forEach((subscriber) => {
                subscriber(data);
            });
        }
    }
    on(type, subscriber) {
        if (!__classPrivateFieldGet(this, _EventObserver_subscribers, "f")[type]) {
            __classPrivateFieldGet(this, _EventObserver_subscribers, "f")[type] = [];
        }
        __classPrivateFieldGet(this, _EventObserver_subscribers, "f")[type].push(subscriber);
    }
    off(type, subscriber) {
        if (!type) {
            __classPrivateFieldSet(this, _EventObserver_subscribers, {}, "f");
        }
        else if (!subscriber && __classPrivateFieldGet(this, _EventObserver_subscribers, "f")[type] !== undefined) {
            __classPrivateFieldGet(this, _EventObserver_subscribers, "f")[type] = [];
        }
        else if (__classPrivateFieldGet(this, _EventObserver_subscribers, "f")[type] !== undefined && subscriber instanceof Function) {
            const index = __classPrivateFieldGet(this, _EventObserver_subscribers, "f")[type].indexOf(subscriber);
            if (index > -1) {
                __classPrivateFieldGet(this, _EventObserver_subscribers, "f")[type].splice(index, 1);
            }
        }
    }
}
_EventObserver_subscribers = new WeakMap();

function linear(t) {
    return t;
}

function animateParts$1(parts) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const partPromises = [];
        for (let i = 0; i < parts.elsList.length; i++) {
            const partEl = parts.elsList[i];
            const delayMin = (_a = parts.delay) === null || _a === void 0 ? void 0 : _a.min;
            const delayMax = (_b = parts.delay) === null || _b === void 0 ? void 0 : _b.max;
            const delay = Math.random() * (delayMax - delayMin) + delayMin;
            const durationMin = (_c = parts.duration) === null || _c === void 0 ? void 0 : _c.min;
            const durationMax = (_d = parts.duration) === null || _d === void 0 ? void 0 : _d.max;
            const duration = Math.random() * (durationMax - durationMin) + durationMin;
            const draw = parts.draw;
            const timing = parts.timing;
            partPromises.push(animate$1({
                draw: (f) => draw(partEl, f),
                duration,
                delay,
                timing,
            }));
        }
        return Promise.all(partPromises);
    });
}
function animateContent$1(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const duration = content === null || content === void 0 ? void 0 : content.duration;
        const delay = content === null || content === void 0 ? void 0 : content.delay;
        const draw = content === null || content === void 0 ? void 0 : content.draw;
        const timing = content === null || content === void 0 ? void 0 : content.timing;
        return animate$1({
            draw: (f) => draw(content.el, f),
            duration,
            delay,
            timing,
        });
    });
}

function addAnimationPropsToEl(el, props) {
    el.classList.add(props.class);
    if (props.duration != null)
        el.style.setProperty('animation-duration', `${props.duration}ms`);
    if (props.delay != null)
        el.style.setProperty('animation-delay', `${props.delay}ms`);
}
function removeAnimationPropsFromEl(el, elClass) {
    el.classList.remove(elClass);
    el.style.setProperty('animation-duration', null);
    el.style.setProperty('animation-delay', null);
}
function animationendPromise(el) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            const onAnimationend = (event) => {
                event.stopPropagation();
                // el.removeEventListener('animationend', onAnimationend);
                resolve();
            };
            el.addEventListener('animationend', onAnimationend, { once: true });
        });
    });
}
function animateContent(content) {
    return __awaiter(this, void 0, void 0, function* () {
        addAnimationPropsToEl(content.el, content);
        return animationendPromise(content.el).then(() => {
            return Promise.resolve();
        });
    });
}
function animateParts(parts) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const partPromises = [];
        for (let i = 0; i < parts.elsList.length; i++) {
            const partEl = parts.elsList[i];
            const durationMin = (_a = parts.duration) === null || _a === void 0 ? void 0 : _a.min;
            const durationMax = (_b = parts.duration) === null || _b === void 0 ? void 0 : _b.max;
            const duration = Math.random() * (durationMax - durationMin) + durationMin;
            const delayMin = (_c = parts.delay) === null || _c === void 0 ? void 0 : _c.min;
            const delayMax = (_d = parts.delay) === null || _d === void 0 ? void 0 : _d.max;
            const delay = Math.random() * (delayMax - delayMin) + delayMin;
            addAnimationPropsToEl(partEl, { duration, delay, class: parts.class });
            partPromises.push(animationendPromise(partEl));
        }
        return Promise.all(partPromises);
    });
}

function fadeIn(el, f) {
    el.style.setProperty('opacity', `${f}`);
}

const DEFAULT_PARTS_DELAY_MIN = 50;
const DEFAULT_PARTS_DELAY_MAX = 500;
const DEFAULT_PARTS_DURATION_MIN = 200;
const DEFAULT_PARTS_DURATION_MAX = 500;
const DEFAULT_CONTENT_DELAY = 500;
const DEFAULT_CONTENT_DURATION = 200;
const DEFAULT_DRAW = fadeIn;
const DEFAULT_TIMING = linear;
const DEFAULT_CONTENT_ANIMATION_IN_CLASS = 'dr-main-content-animation-in';
const DEFAULT_CONTENT_ANIMATION_OUT_CLASS = 'dr-main-content-animation-out';
const DEFAULT_PARTS_ANIMATION_IN_CLASS = 'dr-parts-content-animation-in';
const DEFAULT_PARTS_ANIMATION_OUT_CLASS = 'dr-parts-content-animation-out';

class AnimationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

function getContentJsDefault(content, reverseOrder) {
    const newContent = Object.assign({}, content);
    if (newContent.delay == null)
        newContent.delay = DEFAULT_CONTENT_DELAY;
    if (newContent.duration == null)
        newContent.duration = DEFAULT_CONTENT_DURATION;
    if (newContent.draw == null)
        newContent.draw = DEFAULT_DRAW;
    if (newContent.timing == null)
        newContent.timing = DEFAULT_TIMING;
    return newContent;
}
function getContentCssDefault(content, reverseOrder) {
    const newContent = Object.assign({}, content);
    if (newContent.delay == null)
        newContent.delay = DEFAULT_CONTENT_DELAY;
    if (newContent.duration == null)
        newContent.duration = DEFAULT_CONTENT_DURATION;
    if (newContent.class == null && reverseOrder)
        newContent.class = DEFAULT_CONTENT_ANIMATION_IN_CLASS;
    if (newContent.class == null && !reverseOrder)
        newContent.class = DEFAULT_CONTENT_ANIMATION_OUT_CLASS;
    return newContent;
}
function getPartsJsDefault(parts, reverseOrder) {
    const newParts = Object.assign({}, parts);
    if (newParts.delay == null)
        newParts.delay = { min: DEFAULT_PARTS_DELAY_MIN, max: DEFAULT_PARTS_DELAY_MAX };
    if (newParts.duration == null)
        newParts.duration = { min: DEFAULT_PARTS_DURATION_MIN, max: DEFAULT_PARTS_DURATION_MAX };
    if (newParts.draw == null)
        newParts.draw = DEFAULT_DRAW;
    if (newParts.timing == null)
        newParts.timing = DEFAULT_TIMING;
    return newParts;
}
function getPartsCssDefault(parts, reverseOrder) {
    const newParts = Object.assign({}, parts);
    if (newParts.delay == null)
        newParts.delay = { min: DEFAULT_PARTS_DELAY_MIN, max: DEFAULT_PARTS_DELAY_MAX };
    if (newParts.duration == null)
        newParts.duration = { min: DEFAULT_PARTS_DURATION_MIN, max: DEFAULT_PARTS_DURATION_MAX };
    if (newParts.class == null && reverseOrder)
        newParts.class = DEFAULT_PARTS_ANIMATION_IN_CLASS;
    if (newParts.class == null && !reverseOrder)
        newParts.class = DEFAULT_PARTS_ANIMATION_OUT_CLASS;
    return newParts;
}
function getContentDefault(content, reverseOrder, animationType) {
    if (animationType === 'css') {
        return getContentCssDefault(content, reverseOrder);
    }
    return getContentJsDefault(content);
}
function getPartsDefault(parts, reverseOrder, animationType) {
    if (animationType === 'css') {
        return getPartsCssDefault(parts, reverseOrder);
    }
    return getPartsJsDefault(parts);
}
function animateJs({ content, parts, reverseOrder }) {
    return __awaiter(this, void 0, void 0, function* () {
        const _content = getContentJsDefault(content);
        const _parts = parts ? getPartsJsDefault(parts) : null;
        return new Promise((resolve, reject) => {
            if (reverseOrder) {
                animateContent$1(_content)
                    .then(() => {
                    const partPromises = _parts ? animateParts$1(_parts) : Promise.resolve(null);
                    return partPromises;
                })
                    .then(() => {
                    resolve();
                })
                    .catch((error) => {
                    reject(error);
                });
            }
            else {
                const partPromises = _parts ? animateParts$1(_parts) : Promise.resolve(null);
                partPromises
                    .then(() => {
                    return animateContent$1(_content);
                })
                    .then(() => {
                    resolve();
                })
                    .catch((error) => {
                    reject(error);
                });
            }
        });
    });
}
function animateCss({ content, parts, reverseOrder }) {
    return __awaiter(this, void 0, void 0, function* () {
        const _content = getContentCssDefault(content, reverseOrder);
        const _parts = parts ? getPartsCssDefault(parts, reverseOrder) : null;
        return new Promise((resolve, reject) => {
            var _a, _b;
            if (reverseOrder) {
                if (_parts) {
                    const delta = ((_a = content.delay) !== null && _a !== void 0 ? _a : 0) + ((_b = content.duration) !== null && _b !== void 0 ? _b : 0);
                    _parts.delay.max = _parts.delay.max + delta;
                    _parts.delay.min = _parts.delay.min + delta;
                }
                const promises = [animateContent(_content)];
                if (_parts) {
                    promises.push(animateParts(_parts));
                }
                Promise.all(promises)
                    .then(() => {
                    resolve();
                })
                    .catch((error) => {
                    reject(error);
                });
            }
            else {
                const partPromises = _parts ? animateParts(_parts) : Promise.resolve(null);
                partPromises
                    .then(() => {
                    return animateContent(_content);
                })
                    .then(() => {
                    resolve();
                })
                    .catch((error) => {
                    reject(error);
                });
            }
        });
    });
}
function animate({ content, parts, reverseOrder, type }) {
    return __awaiter(this, void 0, void 0, function* () {
        const promise = type === 'css' ? animateCss({ content, parts, reverseOrder }) : animateJs({ content, parts, reverseOrder });
        return new Promise((resolve, reject) => {
            promise
                .then(() => {
                resolve();
            })
                .catch((_error) => {
                var _a;
                const error = new AnimationError((_a = _error === null || _error === void 0 ? void 0 : _error.message) !== null && _a !== void 0 ? _a : _error);
                reject(error);
            });
        });
    });
}

const DEFAULT_CONTENT_SELECTOR = '#dr-loading-main-content';
const DEFAULT_PARTS_SELECTOR = '.dr-loading-part';
const DEFAULT_LINK_SELECTOR = '.action-link';

class HrefNotFoundError extends Error {
    constructor(element) {
        super('Href not found');
        this.name = this.constructor.name;
        this.element = element;
    }
}

var _Router_instances, _Router_previousHref, _Router_clickHandlerBinded, _Router_popstateHandlerBinded, _Router_addListeners, _Router_removeListeners, _Router_isElementLink, _Router_popstateHandler, _Router_generateEvent, _Router_clickHandler;
class Router extends EventObserver {
    constructor(options) {
        super();
        _Router_instances.add(this);
        _Router_previousHref.set(this, void 0);
        _Router_clickHandlerBinded.set(this, void 0);
        _Router_popstateHandlerBinded.set(this, void 0);
        this.linkSelector = (options === null || options === void 0 ? void 0 : options.linkSelector) || DEFAULT_LINK_SELECTOR;
        __classPrivateFieldSet(this, _Router_clickHandlerBinded, __classPrivateFieldGet(this, _Router_instances, "m", _Router_clickHandler).bind(this), "f");
        __classPrivateFieldSet(this, _Router_popstateHandlerBinded, __classPrivateFieldGet(this, _Router_instances, "m", _Router_popstateHandler).bind(this), "f");
        __classPrivateFieldSet(this, _Router_previousHref, window.location.href, "f");
    }
    run() {
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_addListeners).call(this);
    }
    destroy() {
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_removeListeners).call(this);
    }
    goBack() {
        if (__classPrivateFieldGet(this, _Router_previousHref, "f")) {
            history.pushState({}, '', __classPrivateFieldGet(this, _Router_previousHref, "f"));
        }
    }
}
_Router_previousHref = new WeakMap(), _Router_clickHandlerBinded = new WeakMap(), _Router_popstateHandlerBinded = new WeakMap(), _Router_instances = new WeakSet(), _Router_addListeners = function _Router_addListeners() {
    document.addEventListener('click', __classPrivateFieldGet(this, _Router_clickHandlerBinded, "f"));
    window.addEventListener('popstate', __classPrivateFieldGet(this, _Router_popstateHandlerBinded, "f"));
}, _Router_removeListeners = function _Router_removeListeners() {
    document.removeEventListener('click', __classPrivateFieldGet(this, _Router_clickHandlerBinded, "f"));
    window.removeEventListener('popstate', __classPrivateFieldGet(this, _Router_popstateHandlerBinded, "f"));
}, _Router_isElementLink = function _Router_isElementLink(element) {
    if (!this.linkSelector)
        return false;
    return element.matches(this.linkSelector);
}, _Router_popstateHandler = function _Router_popstateHandler(event) {
    __classPrivateFieldGet(this, _Router_instances, "m", _Router_generateEvent).call(this, {
        type: 'popstate',
        href: window.location.href,
    });
}, _Router_generateEvent = function _Router_generateEvent(data) {
    __classPrivateFieldSet(this, _Router_previousHref, data.href, "f");
    this.emit('action', data);
}, _Router_clickHandler = function _Router_clickHandler(event) {
    const target = event.target;
    if (!__classPrivateFieldGet(this, _Router_instances, "m", _Router_isElementLink).call(this, target))
        return false;
    event.preventDefault();
    const href = target.getAttribute('href');
    if (!href) {
        const error = new HrefNotFoundError(target);
        this.emit('error', error);
        return false;
    }
    history.pushState({}, '', href);
    __classPrivateFieldGet(this, _Router_instances, "m", _Router_generateEvent).call(this, {
        type: 'link-click',
        nativeEvent: event,
        target,
        href,
    });
    return true;
};

class NetworkError extends Error {
    constructor(message) {
        super(message == null ? 'Network error' : message);
        this.name = this.constructor.name;
    }
}
class NoInternetConnection extends NetworkError {
    constructor() {
        super('No internet connection');
        this.name = this.constructor.name;
    }
}
class RequestAbortedError extends Error {
    constructor() {
        super('Request was aborted');
        this.name = this.constructor.name;
    }
}
class RequestError extends Error {
    constructor(response) {
        super();
        this.name = this.constructor.name;
        if (response) {
            this.response = response;
        }
    }
}
class ResponseParseError extends Error {
    constructor(message, response) {
        super(message);
        this.name = this.constructor.name;
        this.response = response;
    }
}
class LoadingContentElementNotFoundError extends Error {
    constructor(selector) {
        super('Content not found');
        this.name = this.constructor.name;
        this.selector = selector;
    }
}

var _ContentLoader_abortController;
class ContentLoader extends EventObserver {
    constructor(options) {
        super();
        _ContentLoader_abortController.set(this, void 0);
        this.selector = options.selector;
    }
    stop() {
        if (__classPrivateFieldGet(this, _ContentLoader_abortController, "f")) {
            __classPrivateFieldGet(this, _ContentLoader_abortController, "f").abort();
        }
    }
    load(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                __classPrivateFieldSet(this, _ContentLoader_abortController, new AbortController(), "f");
                const response = yield fetch(url, {
                    signal: __classPrivateFieldGet(this, _ContentLoader_abortController, "f").signal,
                });
                if (response.ok) {
                    try {
                        const htmlStr = yield response.text();
                        const html = document.createElement('div');
                        html.innerHTML = htmlStr;
                        const contentElement = html.querySelector(`${this.selector}`);
                        if (!(contentElement instanceof HTMLElement)) {
                            const error = new LoadingContentElementNotFoundError(this.selector);
                            return Promise.reject(error);
                        }
                        const emitData = {
                            contentElement,
                        };
                        return Promise.resolve(emitData);
                    }
                    catch (_error) {
                        const error = new ResponseParseError(`${_error === null || _error === void 0 ? void 0 : _error.message}`, response);
                        return Promise.reject(error);
                    }
                }
                else {
                    const error = new RequestError(response);
                    return Promise.reject(error);
                }
            }
            catch (_error) {
                if (!navigator.onLine) {
                    const error = new NoInternetConnection();
                    return Promise.reject(error);
                }
                if (_error.name === 'AbortError') {
                    const error = new RequestAbortedError();
                    return Promise.reject(error);
                }
                const error = new NetworkError();
                return Promise.reject(error);
            }
        });
    }
}
_ContentLoader_abortController = new WeakMap();

// create MyError this.name = this.constructor.name;
class ContentElementNotFoundError extends Error {
    constructor(selector) {
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

var _DynamicRoute_instances, _DynamicRoute_contentEl, _DynamicRoute_partElsList, _DynamicRoute_router, _DynamicRoute_contentLoader, _DynamicRoute_inProgress, _DynamicRoute_setDefaultOptions, _DynamicRoute_setContentElBySelector, _DynamicRoute_setPartElsListBySelector, _DynamicRoute_setContentAndPartsEls, _DynamicRoute_animateOutAndLoadContent, _DynamicRoute_loadContent, _DynamicRoute_resetAnimationElProps, _DynamicRoute_animateIn, _DynamicRoute_animateOut, _DynamicRoute_replaceContent, _DynamicRoute_onRouteError, _DynamicRoute_onRouteAction;
class DynamicRoute extends EventObserver {
    constructor(options) {
        var _a;
        super();
        _DynamicRoute_instances.add(this);
        _DynamicRoute_contentEl.set(this, void 0);
        _DynamicRoute_partElsList.set(this, []);
        _DynamicRoute_router.set(this, void 0);
        _DynamicRoute_contentLoader.set(this, void 0);
        _DynamicRoute_inProgress.set(this, void 0);
        __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_setDefaultOptions).call(this, options);
        __classPrivateFieldSet(this, _DynamicRoute_router, new Router({ linkSelector: this.linkSelector }), "f");
        __classPrivateFieldSet(this, _DynamicRoute_contentLoader, new ContentLoader({
            selector: (_a = this.content) === null || _a === void 0 ? void 0 : _a.selector,
        }), "f"); // ?
    }
    run() {
        __classPrivateFieldGet(this, _DynamicRoute_router, "f").run();
        __classPrivateFieldGet(this, _DynamicRoute_router, "f").on('action', __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_onRouteAction).bind(this));
        __classPrivateFieldGet(this, _DynamicRoute_router, "f").on('error', __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_onRouteError).bind(this));
    }
    destroy() {
        __classPrivateFieldGet(this, _DynamicRoute_router, "f").off();
        __classPrivateFieldGet(this, _DynamicRoute_router, "f").destroy();
        __classPrivateFieldGet(this, _DynamicRoute_contentLoader, "f").off();
    }
    getAnimationProps(type) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        const key = type === 'in' ? 'animationIn' : 'animationOut';
        const props = {
            type: this.animationType,
            reverseOrder: type === 'in',
            content: {
                el: __classPrivateFieldGet(this, _DynamicRoute_contentEl, "f"),
                duration: (_b = (_a = this.content) === null || _a === void 0 ? void 0 : _a[key]) === null || _b === void 0 ? void 0 : _b.duration,
                delay: (_d = (_c = this.content) === null || _c === void 0 ? void 0 : _c[key]) === null || _d === void 0 ? void 0 : _d.delay,
            },
            parts: {
                elsList: __classPrivateFieldGet(this, _DynamicRoute_partElsList, "f"),
                duration: (_f = (_e = this.parts) === null || _e === void 0 ? void 0 : _e[key]) === null || _f === void 0 ? void 0 : _f.duration,
                delay: (_h = (_g = this.parts) === null || _g === void 0 ? void 0 : _g[key]) === null || _h === void 0 ? void 0 : _h.delay,
            },
        };
        if (this.animationType === 'css') {
            props.content.class = (_k = (_j = this.content) === null || _j === void 0 ? void 0 : _j[key]) === null || _k === void 0 ? void 0 : _k.class;
            props.parts.class = (_m = (_l = this.parts) === null || _l === void 0 ? void 0 : _l[key]) === null || _m === void 0 ? void 0 : _m.class;
        }
        else {
            props.content.draw = (_p = (_o = this.content) === null || _o === void 0 ? void 0 : _o[key]) === null || _p === void 0 ? void 0 : _p.draw;
            props.content.timing = (_r = (_q = this.content) === null || _q === void 0 ? void 0 : _q[key]) === null || _r === void 0 ? void 0 : _r.timing;
            props.parts.draw = (_t = (_s = this.parts) === null || _s === void 0 ? void 0 : _s[key]) === null || _t === void 0 ? void 0 : _t.draw;
            props.parts.timing = (_v = (_u = this.parts) === null || _u === void 0 ? void 0 : _u[key]) === null || _v === void 0 ? void 0 : _v.timing;
        }
        return props;
    }
}
_DynamicRoute_contentEl = new WeakMap(), _DynamicRoute_partElsList = new WeakMap(), _DynamicRoute_router = new WeakMap(), _DynamicRoute_contentLoader = new WeakMap(), _DynamicRoute_inProgress = new WeakMap(), _DynamicRoute_instances = new WeakSet(), _DynamicRoute_setDefaultOptions = function _DynamicRoute_setDefaultOptions(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    this.linkSelector = (options === null || options === void 0 ? void 0 : options.linkSelector) || DEFAULT_LINK_SELECTOR;
    this.animationType = (options === null || options === void 0 ? void 0 : options.animationType) || 'css';
    this.content = {
        selector: (_b = (_a = options === null || options === void 0 ? void 0 : options.content) === null || _a === void 0 ? void 0 : _a.selector) !== null && _b !== void 0 ? _b : DEFAULT_CONTENT_SELECTOR,
        animationIn: (_d = (_c = options === null || options === void 0 ? void 0 : options.content) === null || _c === void 0 ? void 0 : _c.animationIn) !== null && _d !== void 0 ? _d : {},
        animationOut: (_f = (_e = options === null || options === void 0 ? void 0 : options.content) === null || _e === void 0 ? void 0 : _e.animationOut) !== null && _f !== void 0 ? _f : {},
    };
    this.parts = {
        selector: (_h = (_g = options === null || options === void 0 ? void 0 : options.parts) === null || _g === void 0 ? void 0 : _g.selector) !== null && _h !== void 0 ? _h : DEFAULT_PARTS_SELECTOR,
        animationIn: (_k = (_j = options === null || options === void 0 ? void 0 : options.parts) === null || _j === void 0 ? void 0 : _j.animationIn) !== null && _k !== void 0 ? _k : {},
        animationOut: (_m = (_l = options === null || options === void 0 ? void 0 : options.parts) === null || _l === void 0 ? void 0 : _l.animationOut) !== null && _m !== void 0 ? _m : {},
    };
    this.content.animationIn = getContentDefault(this.content.animationIn, true, this.animationType);
    this.content.animationOut = getContentDefault(this.content.animationOut, false, this.animationType);
    this.parts.animationIn = getPartsDefault(this.parts.animationIn, true, this.animationType);
    this.parts.animationOut = getPartsDefault(this.parts.animationOut, false, this.animationType);
}, _DynamicRoute_setContentElBySelector = function _DynamicRoute_setContentElBySelector() {
    if (this.content) {
        __classPrivateFieldSet(this, _DynamicRoute_contentEl, document.querySelector(`${this.content.selector}`), "f");
    }
}, _DynamicRoute_setPartElsListBySelector = function _DynamicRoute_setPartElsListBySelector() {
    if (this.parts) {
        __classPrivateFieldSet(this, _DynamicRoute_partElsList, [...document.querySelectorAll(`${this.parts.selector}`)], "f");
    }
    else {
        __classPrivateFieldSet(this, _DynamicRoute_partElsList, [], "f");
    }
}, _DynamicRoute_setContentAndPartsEls = function _DynamicRoute_setContentAndPartsEls() {
    var _a;
    __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_setContentElBySelector).call(this);
    if (!__classPrivateFieldGet(this, _DynamicRoute_contentEl, "f")) {
        const error = new ContentElementNotFoundError((_a = this.content) === null || _a === void 0 ? void 0 : _a.selector);
        throw error;
    }
    __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_setPartElsListBySelector).call(this);
}, _DynamicRoute_animateOutAndLoadContent = function _DynamicRoute_animateOutAndLoadContent(routeEvent) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = [];
        promises.push(__classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_loadContent).call(this, routeEvent));
        // if (!this.#inProgress) {
        promises.push(__classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_animateOut).call(this));
        // }
        this.emit('start');
        const results = yield Promise.allSettled(promises);
        if (results[0].status === 'rejected') {
            return Promise.reject(results[0].reason);
        }
        if (results[1].status === 'rejected') {
            return Promise.reject(results[1].reason);
        }
        return Promise.resolve(results[0].value);
    });
}, _DynamicRoute_loadContent = function _DynamicRoute_loadContent(routeEvent) {
    return __awaiter(this, void 0, void 0, function* () {
        if (__classPrivateFieldGet(this, _DynamicRoute_inProgress, "f"))
            __classPrivateFieldGet(this, _DynamicRoute_contentLoader, "f").stop();
        return __classPrivateFieldGet(this, _DynamicRoute_contentLoader, "f").load(routeEvent.href);
    });
}, _DynamicRoute_resetAnimationElProps = function _DynamicRoute_resetAnimationElProps(type) {
    if (this.animationType === 'css') {
        const key = type === 'in' ? 'animationIn' : 'animationOut';
        removeAnimationPropsFromEl(__classPrivateFieldGet(this, _DynamicRoute_contentEl, "f"), this.content[key].class);
        __classPrivateFieldGet(this, _DynamicRoute_partElsList, "f").forEach((partEl) => {
            removeAnimationPropsFromEl(partEl, this.parts[key].class);
        });
    }
}, _DynamicRoute_animateIn = function _DynamicRoute_animateIn() {
    return __awaiter(this, void 0, void 0, function* () {
        return animate(this.getAnimationProps('in')).catch((error) => {
            return Promise.reject(Object.assign({ type: 'animation-in' }, error));
        });
    });
}, _DynamicRoute_animateOut = function _DynamicRoute_animateOut() {
    return __awaiter(this, void 0, void 0, function* () {
        return animate(this.getAnimationProps('out')).catch((error) => {
            return Promise.reject(Object.assign({ type: 'animation-out' }, error));
        });
    });
}, _DynamicRoute_replaceContent = function _DynamicRoute_replaceContent(newHtml) {
    __classPrivateFieldGet(this, _DynamicRoute_contentEl, "f").outerHTML = newHtml;
}, _DynamicRoute_onRouteError = function _DynamicRoute_onRouteError(error) {
    if (!__classPrivateFieldGet(this, _DynamicRoute_inProgress, "f")) {
        this.emit('error', error);
        __classPrivateFieldSet(this, _DynamicRoute_inProgress, false, "f");
    }
}, _DynamicRoute_onRouteAction = function _DynamicRoute_onRouteAction(routeEvent) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        if (__classPrivateFieldGet(this, _DynamicRoute_inProgress, "f"))
            return Promise.resolve();
        __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_setContentAndPartsEls).call(this);
        __classPrivateFieldSet(this, _DynamicRoute_inProgress, true, "f");
        // const prevHeight = this.#contentEl.offsetHeight;
        try {
            const loadedData = yield __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_animateOutAndLoadContent).call(this, routeEvent);
            __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_replaceContent).call(this, (_a = loadedData.contentElement) === null || _a === void 0 ? void 0 : _a.outerHTML);
            __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_setContentAndPartsEls).call(this);
            // this.#animateContentHeight(prevHeight); // ???
            if (this.animationType === 'js') {
                __classPrivateFieldGet(this, _DynamicRoute_partElsList, "f").forEach((p) => { var _a, _b, _c; return (_c = (_b = (_a = this.parts) === null || _a === void 0 ? void 0 : _a.animationIn) === null || _b === void 0 ? void 0 : _b.draw) === null || _c === void 0 ? void 0 : _c.call(_b, p, 0); });
                (_d = (_c = (_b = this.content) === null || _b === void 0 ? void 0 : _b.animationIn) === null || _c === void 0 ? void 0 : _c.draw) === null || _d === void 0 ? void 0 : _d.call(_c, __classPrivateFieldGet(this, _DynamicRoute_contentEl, "f"), 0);
            }
            yield __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_animateIn).call(this);
            __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_resetAnimationElProps).call(this, 'in');
            __classPrivateFieldSet(this, _DynamicRoute_inProgress, false, "f");
            this.emit('complete');
        }
        catch (error) {
            if (!(error instanceof RequestAbortedError)) {
                __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_resetAnimationElProps).call(this, 'out');
                __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_replaceContent).call(this, (_e = __classPrivateFieldGet(this, _DynamicRoute_contentEl, "f")) === null || _e === void 0 ? void 0 : _e.outerHTML);
                __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_setContentAndPartsEls).call(this);
                yield __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_animateIn).call(this);
                __classPrivateFieldGet(this, _DynamicRoute_instances, "m", _DynamicRoute_resetAnimationElProps).call(this, 'in');
                __classPrivateFieldGet(this, _DynamicRoute_router, "f").goBack();
                this.emit('error', error);
                __classPrivateFieldSet(this, _DynamicRoute_inProgress, false, "f");
            }
        }
    });
};

export { DynamicRoute as default };
