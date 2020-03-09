import React from 'react';
import { graphql, useStaticQuery, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';
import { MetadataQuery } from './__generated__/MetadataQuery';

export const SiteMeta: React.FC<PageProps> = ({ location }) => {
  const { site } = useStaticQuery<MetadataQuery>(METADATA_QUERY);

  return (
    <Helmet
      defer={false}
      titleTemplate={`%s | ${site?.siteMetadata?.title}`}
      defaultTitle={site?.siteMetadata?.title ?? ''}
    >
      {site?.siteMetadata?.description && (
        <meta name="description" content={site.siteMetadata.description} />
      )}
      <link
        rel="canonical"
        href={(site?.siteMetadata?.siteUrl ?? '') + location.pathname}
      />
    </Helmet>
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
