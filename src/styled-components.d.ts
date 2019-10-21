import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    screens: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
