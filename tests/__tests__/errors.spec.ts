import { DynamicRoute } from '@/dynamic-route';
import { RequestError, HrefNotFoundError, LoadingContentElementNotFoundError } from '@/dynamic-route/errors';

import { mockFirstPage } from '../mock';

let dr: DynamicRoute | null = null;

beforeEach(() => {
  document.body.innerHTML = mockFirstPage;
});

afterEach(() => {
  dr?.destroy();
});

test('href is empty', (done) => {
  dr = new DynamicRoute({
    animationType: 'js',
  });
  dr.run();
  dr.on('complete', () => {});
  dr.on('error', (err: HrefNotFoundError) => {
    expect(err).toBeInstanceOf(HrefNotFoundError);
    done();
  });

  const linkEl = document.getElementById('link-without-href');
  linkEl?.click();
});

test('page not found', (done) => {
  dr = new DynamicRoute({
    animationType: 'js',
  });
  dr.run();
  dr.on('complete', () => {});
  dr.on('error', (err: RequestError) => {
    expect(err).toBeInstanceOf(RequestError);
    expect(err?.response?.status).toBe(404);
    done();
  });

  const linkEl = document.getElementById('link-page-not-exist');
  linkEl?.click();
});

test('page without content (dr)', (done) => {
  dr = new DynamicRoute({
    animationType: 'js',
  });
  dr.run();
  dr.on('complete', () => {});
  dr.on('error', (err: LoadingContentElementNotFoundError) => {
    expect(err).toBeInstanceOf(LoadingContentElementNotFoundError);
    done();
  });

  const linkEl = document.getElementById('link-page-without-content');
  linkEl?.click();
});
