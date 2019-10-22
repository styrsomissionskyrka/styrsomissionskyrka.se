import React, { Suspense } from 'react';
import * as rtl from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

export * from '@testing-library/react';

const Wrappers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<p>suspense</p>}>
        <>{children}</>
      </Suspense>
    </ThemeProvider>
  );
};

export const render = (
  ui: React.ReactElement,
  options: Omit<rtl.RenderOptions, 'queries' | 'wrapper'>,
) => {
  return rtl.render(ui, { ...options, wrapper: Wrappers });
};
