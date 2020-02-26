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
    siteUrl: 'https://www.styrsomissionskyrka.se',
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
        path: path.join(__dirname, './src/images'),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Styrsö Missionskyrka',
        short_name: 'SMK',
        start_url: '/',
        background_color: '#921755',
        theme_color: '#921755',
        display: 'minimal-ui',
        icon: 'src/images/smk-icon.png',
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
