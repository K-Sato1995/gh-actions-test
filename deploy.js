const core = require('@actions/core');
const github = require('@actions/github');

async function deployPages() {
  try {
    const context = github.context;
    core.info('============GITHUB INFO=============')
    core.info(github.context)
    core.info(context.payload)
    core.info('========================')
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

    await octokit.request('POST /repos/K-Sato1995/gh-actions-test/pages', {
      source: {
        branch: 'gh-pages',
        path: 'report'
      }
    })


  } catch (error) {
    core.setFailed(error.message);
  }
}


module.exports = deployPages;