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

    const webpackConfigProd = require(`${process.env.GITHUB_WORKSPACE}/${configPath}`)


    core.info(JSON.stringify(webpackConfigProd))

    if (!webpackConfigProd.plugins) {
      webpackConfigProd["plugins"] = []
    }

    // pushing BundleAnalyzerPlugin to plugins array
    webpackConfigProd.plugins.push(
      new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false, reportFilename: `${process.env.GITHUB_WORKSPACE}/analyzeOutput/index.html` }),
    )

    // actually running compilation and waiting for plugin to start explorer
    core.info("=============================================")

    const compiler = webpack(webpackConfigProd)

    await build(compiler)
    // core.info("Before run")
    // await compiler.run((err, stats) => { // [Stats Object](#stats-object)
    //   core.info("IN  run")
    //   core.info(stats)

    //   if (err || stats.hasErrors()) {
    //     core.info(err)
    //   }
    //   compiler.close((closeErr) => {
    //     core.info(closeErr)
    //   });
    // });

    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve('20 seconds');
    //   }, 20000);
    // });
  } catch (err) {
    core.info(err)
    core.setFailed(err.message);
  }
}




function build(compiler) {
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => { // [Stats Object](#stats-object)
      if (err || stats.hasErrors()) {
        reject(err)
      }
      compiler.close((closeErr) => {
        reject(closeErr)
      });
    });

    compiler.hooks.done.tap('IDoNotUnderstandWhatThisStringIsForButItCannotBeEmpty', () => {
      resolve('compile finished');
    });
  });
}

module.exports = analyze;