const core = require('@actions/core');
const makeComment = require('./oktkit')
const analyze = require('./analyze');
const upload = require('./upload');
// const deployPages = require('./deploy')

// most @actions toolkit packages have async methods
async function run() {
  try {
    // const ms = core.getInput('milliseconds');
    // const name = core.getInput('name')

    core.info("=============ANALYZE CALLED================")
    const result = await analyze()
    core.info(result)
    core.info("=============ANALYZE ENDED================")
    // await deployPages()
    core.info("=============UPLOAD CALLED================")
    const result2 = await upload()
    const itemPath = result2.artifactItems[0]
    core.info("=============UPLOAD ENDED================")

    await makeComment(itemPath)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
