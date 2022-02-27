process.env.NODE_ENV = 'production'

const webpack = require('webpack')

const analyze = () => {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  const webpackConfigProd = require('react-scripts/config/webpack.config')(
    'production',
  )

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