import React from 'react';
import { PluginOptions } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

interface Props {
  element: React.ReactNode;
  pluginOptions: PluginOptions;
}

/**
 * Create a root wrapper to wrap around the full application. Useful for
 * supplying different Providers.
 *
 * The first wrapping function is there for future use to make it possible to
 * alter the root wrapper based on if it's ssr or browser.
 */
export const createRootWrapper = (): React.FC<Props> => ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};

/**
 * Wrap the page element with parts of the application that should be persisted
 * across renders.
 *
 * The first wrapping function is there for future use to make it possible to
 * alter the root wrapper based on if it's ssr or browser.
 */
export const createPageWrapper = (): React.FC<Props> => ({ element }) => {
  return <React.Fragment>{element}</React.Fragment>;
};
