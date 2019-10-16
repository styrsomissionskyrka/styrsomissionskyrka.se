/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MenuQuery
// ====================================================

export interface MenuQuery_allContentfulPage_edges_node {
  __typename: 'ContentfulPage';
  id: string;
  slug: string | null;
  title: string | null;
}

export interface MenuQuery_allContentfulPage_edges {
  __typename: 'ContentfulPageEdge';
  node: MenuQuery_allContentfulPage_edges_node;
}

export interface MenuQuery_allContentfulPage {
  __typename: 'ContentfulPageConnection';
  edges: MenuQuery_allContentfulPage_edges[];
}

export interface MenuQuery {
  allContentfulPage: MenuQuery_allContentfulPage;
}

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

// ====================================================
// GraphQL query operation: EventQuery
// ====================================================

export interface EventQuery_contentfulEvent {
  __typename: 'ContentfulEvent';
  startDate: any | null;
  title: string | null;
}

export interface EventQuery {
  contentfulEvent: EventQuery_contentfulEvent | null;
}

export interface EventQueryVariables {
  id?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PageQuery
// ====================================================

export interface PageQuery_contentfulPage {
  __typename: 'ContentfulPage';
  title: string | null;
}

export interface PageQuery {
  contentfulPage: PageQuery_contentfulPage | null;
}

export interface PageQueryVariables {
  id?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RetreatQuery
// ====================================================

export interface RetreatQuery_contentfulRetreat {
  __typename: 'ContentfulRetreat';
  startDate: any | null;
  title: string | null;
}

export interface RetreatQuery {
  contentfulRetreat: RetreatQuery_contentfulRetreat | null;
}

export interface RetreatQueryVariables {
  id?: string | null;
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
