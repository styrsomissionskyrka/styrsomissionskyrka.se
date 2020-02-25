import '@reach/skip-nav/styles.css';
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
import { Header } from './Header';
import { MetadataQuery } from './__generated__/MetadataQuery';

export const Layout: React.FC = ({ children }) => {
  const { site } = useStaticQuery<MetadataQuery>(METADATA_QUERY);

  return (
    <React.Fragment>
      <Helmet
        defer={false}
        titleTemplate={`%s | ${site?.siteMetadata?.title}`}
        defaultTitle={site?.siteMetadata?.title ?? ''}
      >
        <meta
          name="description"
          content={site?.siteMetadata?.description ?? ''}
        />
        <link rel="canonical" href={site?.siteMetadata?.siteUrl ?? ''} />
      </Helmet>
      <SkipNavLink />
      <div>
        <Header />
        <SkipNavContent>
          <main>{children}</main>
        </SkipNavContent>
      </div>
    </React.Fragment>
  );
};

const METADATA_QUERY = graphql`
  query MetadataQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
