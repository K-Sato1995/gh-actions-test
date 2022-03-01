process.env.NODE_ENV = 'production'

const webpack = require('webpack')

const analyze = () => {
  try {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
      .BundleAnalyzerPlugin

    const webpackConfigProd = require('./webpack.config')

    if (!webpackConfigProd.plugins) {
      webpackConfigProd["plugins"] = []
    }

    // pushing BundleAnalyzerPlugin to plugins array
    webpackConfigProd.plugins.push(
      new BundleAnalyzerPlugin({ analyzerMode: 'static', reportFilename: `${__dirname}/output/report.html` }),
    )
    // actually running compilation and waiting for plugin to start explorer
    const compiler = webpack(webpackConfigProd)
    compiler.run((err, stats) => { // [Stats Object](#stats-object)
      // console.log(stats)

      if (err || stats.hasErrors()) {
        console.log(err)
      }
      compiler.close((closeErr) => {
        console.log(closeErr)
      });
    });

  } catch (err) {
    console.log(err)
  }
}

analyze()
