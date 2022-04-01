declare namespace JSX {
  interface Element {
    [key: string]: any;
    children?: any;
  }

  interface Fragment {
    key?: string;
    children?: any;
  }

  interface IntrinsicElements {
    [key: string]: Element;
  }
}
