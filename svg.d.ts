import { SVGProps } from 'react';

type TSVGElementProps = SVGProps<SVGSVGElement>;

declare module '*.svg?react' {
  const content: <TSVGElementProps>;
  export default content;
}
