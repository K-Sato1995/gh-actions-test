const core = require('@actions/core');
const makeComment = require('./oktkit')
const analyze = require('./analyze');
const upload = require('./upload');
// const getArtifactURL = require('./artifact')
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
    await upload()
    core.info("=============UPLOAD ENDED================")
    await makeComment()
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
