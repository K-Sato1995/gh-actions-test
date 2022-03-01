const core = require('@actions/core');
const github = require('@actions/github');

async function makeComment(str) {
  try {
    const message = `[download artifact](${process.env.GITHUB_WORKSPACE}${str})`

    const context = github.context;

    if (context.payload.pull_request == null) {
      core.setFailed('No pull request found.');
      return;
    }
    const pull_request_number = context.payload.pull_request.number;
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pull_request_number,
      body: message
    });

  } catch (error) {
    core.setFailed(error.message);
  }
}


module.exports = makeComment;