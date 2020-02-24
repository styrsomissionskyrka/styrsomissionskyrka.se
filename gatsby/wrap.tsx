import React from 'react';
import { WrapPageElementBrowserArgs, WrapRootElementBrowserArgs } from 'gatsby';
import { Layout } from '../src/components/Layout';

/**
 * Create a root wrapper to wrap around the full application. Useful for
 * supplying different Providers.
 *
 * The first wrapping function is there for future use to make it possible to
 * alter the root wrapper based on if it's ssr or browser.
 */
export const createRootWrapper = (): React.FC<WrapRootElementBrowserArgs> => ({
  element,
}) => {
  return <React.Fragment>{element}</React.Fragment>;
};

/**
 * Wrap the page element with parts of the application that should be persisted
 * across renders.
 *
 * The first wrapping function is there for future use to make it possible to
 * alter the root wrapper based on if it's ssr or browser.
 */
export const createPageWrapper = (): React.FC<WrapPageElementBrowserArgs> => ({
  element,
}) => {
  return (
    <React.Fragment>
      <Layout>{element}</Layout>
    </React.Fragment>
  );
};
