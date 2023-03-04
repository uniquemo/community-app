export const checkIfTextOverflowed = (element: HTMLElement | null) => {
  if (!element) return false;
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
};
