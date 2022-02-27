const core = require('@actions/core');
const github = require('@actions/github');

async function makeComment() {
  try {
    const message = core.getInput('message');

    const context = github.context;
    if (context.payload.pull_request == null) {
      core.setFailed('No pull request found.');
      return;
    }
    const pull_request_number = context.payload.pull_request.number;
    const myToken = core.getInput('myToken');
    const octokit = github.getOctokit(myToken);


    console.log(!!process.env.GITHUB_TOKEN)
    console.log(!!myToken)
    core.info(octokit)
    core.info(octokit.rest)

    core.info(octokit.context);
    core.info(octokit.info)
    core.info(octokit.issues)
    core.info(pull_request_number);

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