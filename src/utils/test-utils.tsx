import React, { Suspense } from 'react';
import * as rtl from '@testing-library/react';

export * from '@testing-library/react';

const Wrappers: React.FC = ({ children }) => {
  return <Suspense fallback={<p>suspense</p>}>{children}</Suspense>;
};

export const render = (
  ui: React.ReactElement,
  options: Omit<rtl.RenderOptions, 'queries' | 'wrapper'>,
) => {
  return rtl.render(ui, { ...options, wrapper: Wrappers });
};
