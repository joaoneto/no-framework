type Callback<T = any> = (state: T) => void;

const globalState = {};

export default function createStore<T>(key: string, initialState: T) {
  const listeners: Callback<T>[] = [];

  if (!globalState[key]) {
    globalState[key] = initialState;
  }

  const subscribe = (listener: Callback<T>) => {
    if (!listeners[key]) {
      listeners[key] = [];
    }
    listeners[key].push(listener);
  };

  const unsubscribe = (listener: Callback<T>) => {
    if (!listeners[key]) {
      return;
    }
    const index = listeners[key].indexOf(listener);
    if (index !== -1) {
      listeners[key].splice(index, 1);
    }
  };

  const notify = (data: T) => {
    if (!listeners[key]) {
      return;
    }
    listeners[key].forEach((listener: Callback<T>) => listener(data));
  };

  const get = (): T => {
    return globalState[key];
  };

  const set = (value: T) => {
    globalState[key] = value;
    notify(value);
  };

  return {
    subscribe,
    unsubscribe,
    get,
    set,
  };
}
