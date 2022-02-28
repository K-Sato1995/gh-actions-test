process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const core = require('@actions/core');

const analyze = () => {
  const path = core.getInput('configPath');

  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin

  core.info(path)
  const webpackConfigProd = require(path)


  // pushing BundleAnalyzerPlugin to plugins array
  webpackConfigProd.plugins.push(
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  )
  // actually running compilation and waiting for plugin to start explorer
  webpack(webpackConfigProd, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(err)
    }
  })
}


module.exports = analyze;