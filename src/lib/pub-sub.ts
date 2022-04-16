type Subscribe = (message: any) => void;

interface PubSub {
  [key: string]: Subscribe[];
}

const createPubSub = () => {
  let events: PubSub = {};

  const publish = (event: string, message: any) => {
    if (events[event]) {
      events[event].forEach((fn) => fn(message));
    }
  };

  const subscribe = (event: string, fn: Subscribe) => {
    if (!events[event]) events[event] = [];
    events[event].push(fn);
  };

  const unsubscribe = (event: string, fn: Subscribe) => {
    if (!events[event]) return;
    const index = events[event].indexOf(fn);
    if (index !== -1) {
      events[event].splice(index, 1);
    }
  };

  const crearSubscribers = () => {
    events = {};
  };

  return {
    publish,
    subscribe,
    unsubscribe,
    crearSubscribers,
  };
};

export default createPubSub;
