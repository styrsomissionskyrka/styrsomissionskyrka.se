import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

/**
 * @typedef {{ element: React.ReactNode, pluginOptions: any }} Props
 */

/**
 * Create a root wrapper to wrap around the full application. Useful for
 * supplying different Providers.
 *
 * The first wrapping function is there for future use to make it possible to
 * alter the root wrapper based on if it's ssr or browser.
 *
 * @returns {React.FC<Props>}
 */
export const createRootWrapper = () => ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};

/**
 * Wrap the page element with parts of the application that should be persisted
 * across renders.
 *
 * The first wrapping function is there for future use to make it possible to
 * alter the root wrapper based on if it's ssr or browser.
 *
 * @returns {React.FC<Props>}
 */
export const createPageWrapper = () => ({ element }) => {
  return element;
};
