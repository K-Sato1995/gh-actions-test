const artifact = require('@actions/artifact');
// const fs = require('fs')
// const tmp = require('tmp')
const core = require('@actions/core');

// https://github.com/mrdoob/three.js/pull/19326/files
// https://github.com/actions/upload-artifact/issues/14
// https://github.com/actions/upload-artifact/issues/50#issuecomment-702470267

// Cant put the link to comment easily 
// probaly better to host the html file somewhere (github.page, netlify, vercecl...s)
/// https://medium.com/front-end-weekly/ci-cd-with-github-actions-to-deploy-on-github-pages-73e225f8f131
// https://github.com/K-Sato1995/gh-actions-test/tree/gh-pages
// https://k-sato1995.github.io/gh-actions-test/index.html
async function upload() {
  const artifactName = "report"
  // const fileName = 'artifactfile.html'
  // const data = ''
  const artifactClient = artifact.create();

  // const dir = tmp.dirSync();
  // const file = tmp.fileSync({ name: fileName, dir: dir.name });

  core.info("=========UPLOAD============")
  // console.log(dir)
  // core.info(file)
  core.info("============================")

  // fs.writeFileSync(file.name, JSON.stringify(data, null, 2));

  const response = await artifactClient.uploadArtifact(artifactName, [`${process.env.GITHUB_WORKSPACE}/analyzeOutput/index.html`], process.env.GITHUB_WORKSPACE);
  console.log('Artifact uploaded', response);
}


module.exports = upload;