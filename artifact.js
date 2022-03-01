// const core = require('@actions/core');
const github = require('@actions/github');



const getArtifactURL = async () => {
  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

  const result = await octokit.request('GET /repos/{owner}/{repo}/actions/artifacts', {
    owner: 'octocat',
    repo: 'hello-world'
  })

  return result

}


module.exports = getArtifactURL;