require('dotenv').config();
const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Styrsö Missionskyrka',
    description: '-',
    author: '@adambrgmn',
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'styrso-missionskyrka',
        short_name: 'SMK',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript',
    'gatsby-plugin-extract-schema',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: path.join(__dirname, './src/pages'),
        ignore: ['__generated__/**'],
      },
    },
  ],
};
