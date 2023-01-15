export function getDocumentTitle(element: Document | HTMLElement) {
  return element.querySelector('title')?.textContent ?? '';
}

export function setDocumentTitle(title: string, _document?: Document) {
  (_document || document).title = title;
}
