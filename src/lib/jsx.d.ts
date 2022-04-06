/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace JSX {
  export type BaseElement<T = any> = T;

  export type Element = BaseElement<any>;

  export type ElementAttrs<T = any extends infer R ? R : any> = Omit<T, 'children' | 'style'> &
    IntrinsicAttributes;

  export type Fragment = DocumentFragment;

  export interface LibraryManagedAttributes {}

  export interface ElementChildrenAttribute {
    children: any;
  }

  export interface IntrinsicAttributes extends LibraryManagedAttributes {
    className?: string;
    style?: Partial<CSSStyleDeclaration>;
    children?: any;
  }

  export type IntrinsicElements = {
    [tagName in keyof HTMLElementTagNameMap]: ElementAttrs<Partial<HTMLElementTagNameMap[tagName]>>;
  };
}
