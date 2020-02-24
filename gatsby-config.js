require('dotenv').config();
require('source-map-support').install();
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
    strict: false,
  },
});

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
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
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
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: path.join(__dirname, './src/pages'),
        ignore: ['__generated__/**'],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript',
    'gatsby-plugin-extract-schema',
    'gatsby-plugin-postcss',
    'gatsby-transformer-sharp',
  ],
};
