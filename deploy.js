const core = require('@actions/core');
const github = require('@actions/github');

// API DOC: https://docs.github.com/en/rest/reference/pages#create-a-github-pages-site
async function deployPages() {
  try {
    const context = github.context;
    core.info('============GITHUB INFO=============')
    core.info(github.context)
    core.info(context.payload)
    core.info('========================')
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

    await octokit.request('POST /repos/K-Sato1995/gh-actions-test/pages/builds')


  } catch (error) {
    core.setFailed(error.message);
  }
}


module.exports = deployPages;