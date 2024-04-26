/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const { CracoAliasPlugin } = require('react-app-alias-ex')

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {}
    }
  ],
  webpack: {
    alias: {
      ':movinin-types': path.resolve(__dirname, '../packages/movinin-types'),
      ':movinin-helper': path.resolve(__dirname, '../packages/movinin-helper'),
      ':disable-react-devtools': path.resolve(__dirname, '../packages/disable-react-devtools'),
    },
  },
  devServer: {
    watchFiles: {
      paths: ['src/**/*', 'public/**/*', 'package.json'],
      options: {
        usePolling: true,
        interval: 500,
      },
    },
  },
}
