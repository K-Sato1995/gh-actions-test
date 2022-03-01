process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const core = require('@actions/core');
const path = require('path')

const analyze = async () => {
  try {
    const configPath = core.getInput('configPath');

    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
      .BundleAnalyzerPlugin

    core.info("=====================ABOUT PATH=============")
    core.info(process.env.GITHUB_WORKSPACE)
    core.info(configPath)
    core.info(path)
    const dirPath = path.resolve(__dirname, configPath);
    core.info(dirPath)
    core.info(`${process.env.GITHUB_WORKSPACE}/${configPath}`)
    core.info("=============================================")

    const webpackConfigProd = require(`cc/${configPath}`)


    core.info(JSON.stringify(webpackConfigProd))

    if (!webpackConfigProd.plugins) {
      webpackConfigProd["plugins"] = []
    }

    // pushing BundleAnalyzerPlugin to plugins array
    webpackConfigProd.plugins.push(
      new BundleAnalyzerPlugin({ analyzerMode: 'static', reportFilename: `${process.env.GITHUB_WORKSPACE}/analyzeOutput/index.html` }),
    )

    // actually running compilation and waiting for plugin to start explorer
    core.info("=============================================")

    const compiler = webpack(webpackConfigProd)


    core.info("Before run")
    compiler.run((err, stats) => { // [Stats Object](#stats-object)
      core.info("IN  run")
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