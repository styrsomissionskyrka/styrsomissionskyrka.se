/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IndexQuery
// ====================================================

export interface IndexQuery_site_siteMetadata {
  __typename: 'SiteSiteMetadata';
  title: string | null;
}

export interface IndexQuery_site {
  __typename: 'Site';
  siteMetadata: IndexQuery_site_siteMetadata | null;
}

export interface IndexQuery_allContentfulEvent_edges_node {
  __typename: 'ContentfulEvent';
  id: string;
  title: string | null;
  slug: string | null;
  startDate: any | null;
}

export interface IndexQuery_allContentfulEvent_edges {
  __typename: 'ContentfulEventEdge';
  node: IndexQuery_allContentfulEvent_edges_node;
}

export interface IndexQuery_allContentfulEvent {
  __typename: 'ContentfulEventConnection';
  edges: IndexQuery_allContentfulEvent_edges[];
}

export interface IndexQuery {
  site: IndexQuery_site | null;
  allContentfulEvent: IndexQuery_allContentfulEvent;
}

export interface IndexQueryVariables {
  today?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
