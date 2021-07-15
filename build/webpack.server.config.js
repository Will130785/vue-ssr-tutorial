const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  // Point enrty to your apps server entry file
  entry: '../src/entry-server.js',
  // This allows webpack to handle dynamic imports in a Node-appropriate fashion and also tells 'vue-loader' to emit server oriented code when compiling Vue components
  target: 'node',
  // for bundle renderer source map support
  devtool: 'source-map',
  // this tells the server bundle to use Node-style exports
  output: {
    libraryTarget: 'comminjs2'
  },
  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // Externalise app dependencies. This makes the server build much faster and generates a smaller bundle file
  externals: nodeExternals({
    // Do not externalixe dependencies that need to be processed by webpack
    // You can add more file types here e.g. raw *.vue files
    // You should also whitelist deps that modifies 'global' (e.g. polyfills)
    whitelist: /\.css$/
  }),
  // This is the plugin that turns the entire output of the server build into a single JSON file. The default file name will be vue-ssr-server-bundle.json
  plugins: [
    new VueSSRServerPlugin()
  ]
})
