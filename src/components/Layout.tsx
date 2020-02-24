import '@reach/skip-nav/styles.css';
import React from 'react';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
import { Header } from './Header';

export const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <SkipNavLink />
      <div>
        <Header />
        <SkipNavContent />
        <main>{children}</main>
      </div>
    </React.Fragment>
  );
};
