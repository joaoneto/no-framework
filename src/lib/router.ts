import h from './create-element';
import createPubSub from './pub-sub';

const { publish, subscribe } = createPubSub();

export type RouterProps = {
  children: RouteProps[];
  update?: (path: string) => void;
};

const handleRouteChange = (routes: RouteProps[], pathname: string) => {
  const currentRoute =
    routes.find((route) => {
      return route.exact ? pathname === route.path : pathname.match(route.path);
    }) || routes[routes.length - 1];

  return currentRoute.component() as HTMLElement;
};

export const Router = ({ children }: RouterProps) => {
  const RouterWrapper = document.createElement('div');
  const routes = children || [];

  Router.update = () => {
    publish('router:changeStart', {});
    setTimeout(() => {
      RouterWrapper.replaceChildren(handleRouteChange(routes, window.location.pathname));
      publish('router:changeEnd', {});
    });
  };

  Router.update();

  return RouterWrapper;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
Router.update = () => {};

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('popstate', () => Router.update());
});

Router.push = (path: string) => {
  window.history.pushState(null, '', path);
  Router.update();
};

Router.pop = () => {
  window.history.back();
  Router.update();
};

Router.replace = (path: string) => {
  window.history.replaceState(null, '', path);
  Router.update();
};

Router.onChangeStart = (fn: (...args: any) => void) => {
  subscribe('router:changeStart', fn);
};

Router.onChangeEnd = (fn: (...args: any) => void) => {
  subscribe('router:changeEnd', fn);
};

export type RouteProps = {
  path: string;
  exact?: boolean;
  component: () => JSX.Children;
};

export const Route = ({ path, exact, component }: RouteProps): RouteProps => {
  return {
    path,
    exact,
    component,
  };
};

export interface LinkProps {
  to: string;
  children: any;
}

export const Link = ({ to, children, ...props }: LinkProps): HTMLAnchorElement => {
  const anchor = h('a', { href: to, ...props }, ...children);

  anchor.addEventListener('click', (e: any) => {
    e.preventDefault();
    Router.push(to);
  });

  return anchor;
};
