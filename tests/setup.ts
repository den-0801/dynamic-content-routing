import { mockFirstPage, mockSecondPage, mockPageWithoutContent } from './mock';

// import fetchMock from 'jest-fetch-mock';

const getSuccessResponse = () => {
  return {
    ok: true,
    redirected: false,
    status: 200,
    statusText: 'OK',
    type: 'basic',
  };
};

function fetchMock(url: string, options: any) {
  if (url.includes('first-page.html')) {
    return Promise.resolve({ ...getSuccessResponse(), text: () => Promise.resolve(mockFirstPage) });
  }
  if (url.includes('second-page.html')) {
    return Promise.resolve({ ...getSuccessResponse(), text: () => Promise.resolve(mockSecondPage) });
  }
  if (url.includes('page-without-content.html')) {
    return Promise.resolve({ ...getSuccessResponse(), text: () => Promise.resolve(mockPageWithoutContent) });
  }
  return Promise.resolve({
    ok: false,
    redirected: false,
    status: 404,
    statusText: 'Not Found',
    type: 'basic',
  });
}

function mockPushState(data: any, unused: string, url?: string | URL | null | undefined) {
  return '';
}

beforeAll(() => {
  history.pushState = jest.fn(mockPushState as jest.Mock);

  global.fetch = jest.fn(fetchMock as jest.Mock);

  // fetchMock.mockIf(/.*/, (req) => {
  //   fetchMock(req.url);
  // });
});
