const isProd = process.env.NODE_ENV === 'production';

module.exports = () => ({
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    isProd &&
      require('@fullhuman/postcss-purgecss')({
        content: ['./src/**/*.tsx'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      }),
  ].filter(Boolean),
});
