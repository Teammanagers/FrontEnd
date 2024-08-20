import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      mainBlue: string;
      subBlue: string;
      subLightBlue: string;
      background: string;
      black: string;
      darkGray: string;
      gray: string;
      silver: string;
      lightGray: string;
      red: string;
    };
  }
}
