const artifact = require('@actions/artifact');
// const fs = require('fs')
// const tmp = require('tmp')
const core = require('@actions/core');

// https://github.com/mrdoob/three.js/pull/19326/files
// https://github.com/actions/upload-artifact/issues/14
// https://github.com/actions/upload-artifact/issues/50#issuecomment-702470267
async function upload() {
  const artifactName = "coverage"
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

  console.log(`Uploading ${process.env.GITHUB_WORKSPACE}`);


  const response = await artifactClient.uploadArtifact(artifactName, [`${process.env.GITHUB_WORKSPACE}/output/test/code-coverage.html`], __dirname);
  console.log('Artifact uploaded', response);
}


module.exports = upload;