/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace NF {
  type Children<C = any> = C | C[];

  type Props<P = any> = P & {
    className?: string;
  };
}

declare namespace JSX {
  type Element = any;

  type Fragment = DocumentFragment;

  interface ElementAttributesProperty {
    props: NF.Props;
  }

  interface ElementChildrenAttribute {
    children: NF.Children;
  }

  interface IntrinsicAttributes {
    [key: string]: any;
  }

  type IntrinsicElements = {
    // [tagName in keyof HTMLElementTagNameMap]: Partial<HTMLElementTagNameMap[tagName]>;
    [tagName in keyof HTMLElementTagNameMap]: any;
  };
}
