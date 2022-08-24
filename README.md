# Dynamic Content Routing

Animate simple site static pages routing.

# Install
## npm
```sh
npm install dynamic-content-routing
```
```js
import DynamicContentRouting from 'dynamic-content-routing';
// utils (optional)
import {
  linear,
  easeInOut,
  moveYIn,
  moveYOut,
  fadeIn,
  fadeOut,
  // ...etc
} from 'dynamic-content-routing/dist/utils';
// styles (optional)
import 'dynamic-content-routing/dist/styles.min.css';
```

## cdn
```html
<script src="https://cdn.jsdelivr.net/npm/dynamic-content-routing@1.0.1"></script>
<!-- utils (optional) -->
<script src="https://cdn.jsdelivr.net/npm/dynamic-content-routing@1.0.1/dist/utils/index-umd.min.js"></script>
<!-- styles (optional) -->
<link href="https://cdn.jsdelivr.net/npm/dynamic-content-routing@1.0.1/dist/styles.min.css" rel="stylesheet">
```

Usage:

```js
window.DynamicContentRouting;

// utils (optional)
window.DynamicContentRoutingUtils;
window.DynamicContentRoutingUtils.linear;
window.DynamicContentRoutingUtils.easeInOut;
window.DynamicContentRoutingUtils.moveYIn;
// ...etc
```

# Quick Start

Navigation links:

```html
<nav>
  <a href="./page-1" class="action-link"></a>
  <a href="./page-2" class="action-link"></a>
  <a href="./page-3" class="action-link"></a>
</nav>
```

Page 1 content:

```html
<main id="dr-loading-main-content">
  page 1 content
  <div class="dr-loading-part">page 1 content part 1</div>
  <div class="dr-loading-part">page 1 content part 2</div>
  <div class="dr-loading-part">page 1 content part 3</div>
  <div class="dr-loading-part">page 1 content part 4</div>
</main>
```

Similar: Page 2, Page 3, ..., Page N.

```js
const dynamicContentRouting = new DynamicContentRouting();
dynamicContentRouting.run();
```

and you should include library styles (styles.min.css) inside your page.

# Usage Limitations

- This library can be used for **simple** static site with not too many different scripts on different pages
- All listeners attached outside the _main content_ must be detached manually
- If you want to load scripts or styles you should place them inside _main content_ and make sure the listeners detached correctly.

# Advanced usage

**If you want to animate with css:**

Default props:
```js
const dynamicContentRouting = new DynamicContentRouting({
  linkSelector: '.action-link',
  animationType: 'css',
  content: {
    selector: '#dr-loading-main-content',
    animationOut: {
      class: 'dr-main-content-animation-out',
      duration: 500,
      delay: 0,
    },
    animationIn: {
      class: 'dr-main-content-animation-in',
      duration: 500,
      delay: 0,
    },
  },
  parts: {
    selector: '.dr-loading-part',
    animationOut: {
      class: 'dr-parts-content-animation-out',
      // random duration from min to max
      duration: { min: 50, max: 500 },
      // random delayfrom min to max
      delay: { min: 50, max: 500 },
    },
    animationIn: {
      class: 'dr-parts-content-animation-in',
      // random duration from min to max
      duration: { min: 50, max: 500 },
      // random delayfrom min to max
      delay: { min: 50, max: 500 },
    },
  },
});
```

**If you want to animate with js:**

Default props:
```js
const dynamicContentRouting = new DynamicContentRouting({
  linkSelector: '.action-link',
  animationType: 'js',
  content: {
    selector: '#dr-loading-main-content',
    animationOut: {
      timing: linear,
      draw: fadeOut,
      duration: 500,
      delay: 0,
    },
    animationIn: {
      timing: linear,
      draw: fadeIn,
      duration: 500,
      delay: 0,
    },
  },
  parts: {
    selector: '.dr-loading-part',
    animationOut: {
      timing: linear,
      draw: fadeOut,
      // random duration from min to max
      duration: { min: 50, max: 500 },
      // random delayfrom min to max
      delay: { min: 50, max: 500 },
    },
    animationIn: {
      timing: linear,
      draw: fadeIn,
      // random duration from min to max
      duration: { min: 50, max: 500 },
      // random delayfrom min to max
      delay: { min: 50, max: 500 },
    },
  },
});
```
And then

```js
dynamicContentRouting.run();

dynamicContentRouting.on('complete', () => {});
dynamicContentRouting.on('start', () => {});
dynamicContentRouting.on('error', (error) => {});
```

# Props
- **linkSelector** — link selector for element _a_ with _href_ attribute. The main content will be uploaded after click
- **animationType** — how to animate content and parts: _css_ or _js_
- **content** — main content options
- **parts** — options for elements that animate after the main content in a random order
- **content.selector** and **parts.selector** — selector for main content and parts

Only if _animationType_ is 'js':

**timing** — animation timing function (curve, from 0 to 1)

**draw** — animation function, describes which css style properties will be animated according to the timing function

Only if _animationType_ is 'css':

**class** — class, when added, the corresponding animation occurs

# Methods

- **run** — attach all required listeners
- **destroy** — detach all required listeners

# Events

- **start** (void) — emits when animation and loading was started
- **complete** (void) — emits when loading and new content animation were successful
- **error** (errorObj) — emits when there was any error. See _Errors_ section below

# Errors

- **ContentElementNotFoundError** - there is no element matched specified selector (_content.selector_)
- **HrefNotFoundError** - clicked _a_ element matched _linkSelector_ has no _href_ attribute
- **AnimationError** - any animation error for _js_ animation type
- **LoadingContentElementNotFoundError** - there is no element matched specified selector (_content.selector_) on the loaded html-page
- **ResponseParseError** - loaded html-page could not be parsed

and some specific network errors:

- **NetworkError**
- **NoInternetConnection**
- **RequestAbortedError**
- **RequestError**

# License

Released under MIT license
