export const checkIfTextOverflowed = (element: HTMLElement | null) => {
  if (!element) return false;
  const {
    scrollHeight,
    clientHeight,
    scrollWidth,
    clientWidth
  } = element;
  return scrollHeight > clientHeight || scrollWidth > clientWidth;
};

export const toggleDOMVisibility = (element: HTMLElement, visible: boolean) => {
  if (!element) return;
  element.style.opacity = visible ? '1' : '0';
};

export const setDOMId = (element: HTMLElement, id: string) => {
  if (!element) return;
  element.id = id;
};
