process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const core = require('@actions/core');

const analyze = () => {
  try {
    const path = core.getInput('configPath');

    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
      .BundleAnalyzerPlugin

    core.info(process.env.GITHUB_WORKSPACE)
    core.info(path)
    core.info(`${process.env.GITHUB_WORKSPACE}/${path}`)
    const webpackConfigProd = require(`${process.env.GITHUB_WORKSPACE}/${path}`)


    // pushing BundleAnalyzerPlugin to plugins array
    webpackConfigProd.plugins.push(
      new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    )
    // actually running compilation and waiting for plugin to start explorer
    const compiler = webpack(webpackConfigProd)
    compiler.run((err, stats) => { // [Stats Object](#stats-object)
      core.info(stats)

      if (err || stats.hasErrors()) {
        core.info(err)
      }
      compiler.close((closeErr) => {
        core.info(closeErr)
      });
    });

  } catch (err) {
    core.info(err)
    core.setFailed(err.message);
  }
}


module.exports = analyze;