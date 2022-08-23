import { DynamicRoute } from '@/dynamic-route';

import { mockFirstPage } from '../mock';

let dr: DynamicRoute | null = null;

beforeEach(() => {
  document.body.innerHTML = mockFirstPage;
});

afterEach(() => {
  dr?.destroy();
});

async function emitAnimationend() {
  return new Promise((resolve) => {
    const mainEl = <HTMLDivElement>document.getElementById('dr-loading-main-content');
    const partsEls = [...document.querySelectorAll('.dr-loading-part')];
    partsEls.forEach((el) => el.dispatchEvent(new Event('animationend')));
    setTimeout(() => {
      mainEl.dispatchEvent(new Event('animationend'));
      resolve(true);
    }, 200);
  });
}

test('default correct behavior JS', (done) => {
  dr = new DynamicRoute({
    animationType: 'js',
  });
  dr.on('complete', () => {
    expect(document.body.innerHTML.includes('Second Page Content')).toBe(true);
    // dr?.destroy();
    done();
  });
  dr.run();

  const linkEl = document.getElementById('link-2');
  linkEl?.click();
});

test('default correct behavior CSS', (done) => {
  dr = new DynamicRoute({
    animationType: 'css',
  });
  dr.on('complete', () => {
    expect(document.body.innerHTML.includes('Second Page Content')).toBe(true);
    // dr?.destroy();
    done();
  });
  dr.run();

  const linkEl = document.getElementById('link-2');
  linkEl?.click();

  void emitAnimationend().then(() => {
    setTimeout(() => {
      void emitAnimationend();
    }, 200);
  });
});

// test('default correct desfult JS options', (done) => {});

// test('default correct desfult CSS options', (done) => {});
