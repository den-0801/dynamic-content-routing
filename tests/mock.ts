const links = `
  <a href="http://localhost:3000/first-page.html" id="link-1" class="action-link">First Page</a>
  <a href="http://localhost:3000/second-page.html" id="link-2" class="action-link">Second Page</a>
  <a href="http://localhost:3000/not-exist.html" id="link-page-not-exist" class="action-link">Page Not Exist</a>
  <a href="" id="link-without-href" class="action-link">Page without href</a>
  <a href="http://localhost:3000/page-without-content.html" id="link-page-without-content" class="action-link">Page without content</a>
`;

const mockFirstPage = `
  ${links}

  <div id="dr-loading-main-content" class="container">
    <div class="dr-loading-part">part 1</div>
    <div class="dr-loading-part">part 2</div>
    First Page Content...
  </div>
`;

const mockSecondPage = `
  ${links}

  <div id="dr-loading-main-content" class="container">
    <div class="dr-loading-part">part 3</div>
    <div class="dr-loading-part">part 4</div>
    Second Page Content...
  </div>
`;

const mockPageWithoutContent = `
  ${links}

  <div class="container">
    Page Without Content...
  </div>
`;

export { mockFirstPage, mockSecondPage, mockPageWithoutContent };
