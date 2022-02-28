const core = require('@actions/core');
// const makeComment = require('./oktkit')
const analyze = require('./analyze');
const upload = require('./upload');
const deployPages = require('./deploy')

// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('milliseconds');
    const name = core.getInput('name')
    core.info(`Waiting ${ms} milliseconds ...`);
    core.info(`HELLO ${name}`)
    // await analyze()
    await deployPages()
    await upload()
    // await makeComment()
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
