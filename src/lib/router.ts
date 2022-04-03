import h from './create-element';

export type RouterProps = {
  // @todo: fix children type
  children?: RouteProps[];
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
  Router.update = () =>
    RouterWrapper.replaceChildren(handleRouteChange(routes, window.location.pathname));

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

export type RouteProps = {
  path: string;
  exact?: boolean;
  component: () => JSX.Element | HTMLElement;
};

export const Route = ({ path, exact, component }: RouteProps) => {
  return {
    path,
    exact,
    component,
  };
};

export interface LinkProps {
  to: string;
  className: string;
  // @todo: fix children type
  children?: any;
}

export const Link = ({ to, className, children, ...props }: LinkProps) => {
  const anchor = h('a', { href: to, className, ...props }, ...children);

  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    Router.push(to);
  });

  return anchor;
};
