import {
  DefaultTheme,
  StyledProps,
  CSSObject,
  SimpleInterpolation,
  css,
} from 'styled-components';

export const createSelector = <
  R extends keyof DefaultTheme,
  K extends keyof DefaultTheme[R],
  P
>(
  rootKey: R,
) => (key: K) => (props: StyledProps<P>) => props.theme[rootKey][key];

export const screen = (scr: keyof DefaultTheme['screens']) => {
  return (
    first: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media (min-width: ${p => p.theme.screens[scr]}) {
      ${css(first, ...interpolations)};
    }
  `;
};

export const theme: DefaultTheme = {
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};
