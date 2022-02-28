require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 612:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

process.env.NODE_ENV = 'production'

const webpack = __nccwpck_require__(218)
const core = __nccwpck_require__(450);

const analyze = async () => {
  try {
    const path = core.getInput('configPath');

    const BundleAnalyzerPlugin = (__nccwpck_require__(511).BundleAnalyzerPlugin)

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

/***/ }),

/***/ 450:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 218:
/***/ ((module) => {

module.exports = eval("require")("webpack");


/***/ }),

/***/ 511:
/***/ ((module) => {

module.exports = eval("require")("webpack-bundle-analyzer");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(450);
// const makeComment = require('./oktkit')
const analyze = __nccwpck_require__(612);

// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('milliseconds');
    const name = core.getInput('name')
    core.info(`Waiting ${ms} milliseconds ...`);
    core.info(`HELLO ${name}`)
    await analyze()
    // await makeComment()
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map