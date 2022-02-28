process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const core = require('@actions/core');

const analyze = async () => {
  try {
    const path = core.getInput('configPath');

    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
      .BundleAnalyzerPlugin

    core.info("=====================ABOUT PATH=============")
    core.info(process.env.GITHUB_WORKSPACE)
    core.info(path)
    core.info(`${process.env.GITHUB_WORKSPACE}/${path}`)
    core.info("=============================================")

    const webpackConfigProd = require(`${process.env.GITHUB_WORKSPACE}/${path}`)

    core.info("=====================ABOUT WPSETTING=============")

    core.info(webpackConfigProd)

    if (!webpackConfigProd.plugins) {
      webpackConfigProd["plugins"] = []
    }

    // pushing BundleAnalyzerPlugin to plugins array
    webpackConfigProd.plugins.push(
      new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    )


    core.info(webpackConfigProd.plugins)
    // actually running compilation and waiting for plugin to start explorer
    core.info("=============================================")

    const compiler = webpack(webpackConfigProd)
    core.info(compiler)

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