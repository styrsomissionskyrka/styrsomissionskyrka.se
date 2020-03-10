import React from 'react';
import { GatsbyBrowser } from 'gatsby';
import { Layout } from '../src/components/Layout';
import { SiteMeta } from '../src/components/SiteMeta';

/**
 * Create a root wrapper to wrap around the full application. Useful for
 * supplying different Providers.
 *
 * The first wrapping function is there for future use to make it possible to
 * alter the root wrapper based on if it's ssr or browser.
 */
export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
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
export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => {
  return (
    <React.StrictMode>
      <SiteMeta {...props} />
      <Layout>{element}</Layout>
    </React.StrictMode>
  );
};
