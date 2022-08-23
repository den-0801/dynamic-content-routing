import { Router } from '@/dynamic-route/router';
import { EmitEventType } from '@/dynamic-route/router/types';
import { HrefNotFoundError } from '@/dynamic-route/router/errors';

import { mockFirstPage } from '../mock';

beforeAll(() => {
  document.body.innerHTML = mockFirstPage;
});

test('default correct behavior', (done) => {
  const router = new Router();
  router.run();
  router.on('action', (event: EmitEventType) => {
    expect(event.href).toContain('second-page.html');
    expect(event.type).toBe('link-click');
    router.destroy();
    done();
  });

  const linkEl = document.getElementById('link-2');
  linkEl?.click();
});

test('error behavior: link without href', (done) => {
  const router = new Router();
  router.run();
  router.on('error', (event: HrefNotFoundError) => {
    expect(event).toBeInstanceOf(HrefNotFoundError);
    router.destroy();
    done();
  });

  const linkEl = document.getElementById('link-without-href');
  linkEl?.click();
});
