import 'styled-components';

type Colors = {
  black: string,
  shadow: string,
  purple: string,
  danger: string,
  gray: {
    dark: string,
    medium: string,
    light: string,
  },
  white: {
    background: string,
    details: string,
  },
  pink: {
    dark: string,
    light: string,
  },
  hover: {
    purple: string,
    danger: string,
    gray: {
      medium: string,
      light: string,
    }
  }
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
  }
}