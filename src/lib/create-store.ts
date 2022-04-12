export default function createStore(initialState = {}) {
  const state: any = { ...initialState };
  const listeners: any = {};

  const subscribe = (key: string, listener: any) => {
    if (!listeners[key]) {
      listeners[key] = [];
    }
    listeners[key].push(listener);
  };

  const unsubscribe = (key: string, listener: any) => {
    if (!listeners[key]) {
      return;
    }
    const index = listeners[key].indexOf(listener);
    if (index !== -1) {
      listeners[key].splice(index, 1);
    }
  };

  const notify = (key: string, data: any) => {
    if (!listeners[key]) {
      return;
    }
    listeners[key].forEach((listener: any) => listener(data));
  };

  const get = (key: string) => {
    return state[key];
  };

  const set = (key: string, value: any) => {
    state[key] = value;
    notify(key, value);
  };

  return {
    subscribe,
    unsubscribe,
    get,
    set,
  };
}
