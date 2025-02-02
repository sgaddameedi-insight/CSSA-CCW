/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * Modify the webpack config by exporting an Object or Function.
 *
 * If the value is an Object, it will be merged into the final
 * config using `webpack-merge`.
 *
 * If the value is a function, it will receive the resolved config
 * as the argument. The function can either mutate the config and
 * return nothing, OR return a cloned or merged version of the config.
 *
 * https://cli.vuejs.org/config/#configurewebpack
 */
const { GenerateSW } = require('workbox-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
module.exports = {
  // ... other options
  plugins: [
    new GenerateSW(),
    new StyleLintPlugin({
      files: ['**/*.{vue,css,sss,less,scss,sass}'],
    }),
  ],
};
