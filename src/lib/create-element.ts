import './jsx.d';

export type Component = (...args: any[]) => HTMLElement | DocumentFragment;

export type ComponentChildren = Node | string | number | null;

export type ComponentProps = Record<
  string,
  (ComponentChildren | HTMLElement)[] | string | number | EventListener
> | null;

interface FragmentProps {
  children: ComponentChildren[];
}

export const Fragment = ({ children }: FragmentProps) => {
  const fragment = document.createDocumentFragment();

  children.forEach((child) => {
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
  name: string | Component,
  props?: ComponentProps,
  ...children: ComponentChildren[]
) {
  if (typeof name === 'function') {
    return name({ ...props, children });
  }

  const element = document.createElement(name);

  if (props) {
    Object.entries(props).forEach(([prop, value]) => {
      if (typeof value === 'function') {
        const eventName = prop.toLowerCase().replace(/^on/, '');
        element.addEventListener(eventName, value);
      } else {
        element.setAttribute(prop, String(value));
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
      element.appendChild(createElement(Fragment, null, child));
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
