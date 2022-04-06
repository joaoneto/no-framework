/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace JSX {
  export type Children = string | JSX.Element | (string | JSX.Element)[] | null;

  // HTMLElement will be nice to have here, but I'm not finding a way to infer a generic render
  // for <Route /> as { path: string; component: () => JSX.Element } is not assignable to JSX.Element
  // export type Element = HTMLElement;
  export type Element = any;

  export type ElementAttrs<T> = Omit<T, 'children' | 'style'> & IntrinsicAttributes;

  export type Fragment = DocumentFragment;

  export interface LibraryManagedAttributes {}

  export interface ElementChildrenAttribute {
    children: {};
  }

  export interface IntrinsicAttributes extends LibraryManagedAttributes {
    className?: string;
    style?: Partial<CSSStyleDeclaration>;
    children?: Children;
  }

  export type IntrinsicElements = {
    [tagName in keyof HTMLElementTagNameMap]: ElementAttrs<Partial<HTMLElementTagNameMap[tagName]>>;
  };
}
