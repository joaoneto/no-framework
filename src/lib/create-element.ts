/* eslint-disable @typescript-eslint/no-explicit-any */
export const Fragment = ({ children }: { children: any[] }) => {
  const fragment = document.createDocumentFragment();

  children?.forEach((child) => {
    if (!child) return;
    if (typeof child === 'string' || typeof child === 'number') {
      fragment.appendChild(document.createTextNode(child.toString()));
    }

    if (Array.isArray(child)) {
      fragment.appendChild(Fragment({ children: child }));
      return;
    }

    if (child instanceof Node) {
      fragment.appendChild(child);
    }
  });

  return fragment;
};

function createElement(
  name: keyof HTMLElementTagNameMap | ((props: any) => any),
  props: any,
  ...children: any[]
) {
  if (typeof name === 'function') {
    return name({ ...props, children });
  }

  const element = document.createElement(name);

  if (props) {
    Object.entries(props).forEach(([prop, value]) => {
      if (prop === 'style' && typeof value === 'object') {
        Object.entries(value as CSSStyleDeclaration).forEach(([styleName, styleValue]) => {
          element.style[styleName] = styleValue;
        });
      } else if (prop === 'className') {
        element.classList.add(...((value as string) || '').trim().split(/\s+/));
      } else {
        element.setAttribute(prop, value === true ? '' : String(value));
      }
    });
  }

  children.forEach((child) => {
    if (!child) return;
    if (typeof child === 'string' || typeof child === 'number') {
      element.appendChild(document.createTextNode(String(child)));
      return;
    }

    if (Array.isArray(child)) {
      element.appendChild(Fragment({ children: child }));
      return;
    }

    element.appendChild(child);
  });

  return element;
}

declare global {
  interface Window {
    _createElement: typeof createElement;
    _Fragment: typeof Fragment;
  }
}
window._createElement = createElement;
window._Fragment = Fragment;

export default createElement;
