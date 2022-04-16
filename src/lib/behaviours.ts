import createPubSub from './pub-sub';
import { Router } from './router';

const { publish, subscribe, clearSubscribers } = createPubSub();

Router.onChangeStart(() => {
  clearSubscribers();
});

export const listen =
  (eventName: string) => (element: Element, listener: (...args: any) => void) => {
    element.addEventListener(eventName, listener);
    return element;
  };

export const click = listen('click');

export const each =
  (selector: string) =>
  (initialData: any, mapFn: (item: any, i?: number) => Element): Element[] => {
    subscribe(`${selector}:behaviour:remove`, (dataId: string) => {
      const element = document.querySelector(selector);
      if (element) {
        const child = element.querySelector(`[data-id="${dataId}"]`);
        if (child) {
          element.removeChild(child);
        }
      }
    });

    subscribe(`${selector}:behaviour:add`, (item: any) => {
      const element = document.querySelector(selector);
      if (element) {
        element.appendChild(mapFn(item, element.children.length));
      }
    });

    subscribe(`${selector}:behaviour:edit`, ({ dataId, ...item }: any) => {
      const element = document.querySelector(selector);
      if (element) {
        const oldEl = element.querySelector(`[data-id="${dataId}"]`);
        if (oldEl) {
          const newEl = mapFn({ dataId, ...item }, element.children.length);
          if (newEl) {
            element.replaceChild(newEl, oldEl);
          }
        }
      }
    });

    return initialData.map(mapFn);
  };

export const add = (selector: string) => (data: any) => publish(`${selector}:behaviour:add`, data);

export const edit = (selector: string) => (data: any) =>
  publish(`${selector}:behaviour:edit`, data);

export const remove = (selector: string) => (index: string) =>
  publish(`${selector}:behaviour:remove`, index);
