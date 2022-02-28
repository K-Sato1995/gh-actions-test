const artifact = require('@actions/artifact');
const fs = require('fs')
const tmp = require('tmp')
const core = require('@actions/core');

// https://github.com/mrdoob/three.js/pull/19326/files
// https://github.com/actions/upload-artifact/issues/14
async function upload() {
  const artifactName = "namee of artifact"
  const fileName = 'artifactfile.html'
  const data = ''
  const artifactClient = artifact.create();

  const dir = tmp.dirSync();
  const file = tmp.fileSync({ name: fileName, dir: dir.name });

  console.log("=========UPLOAD============")
  console.log(dir)
  core.info(file)
  console.log("============================")

  fs.writeFileSync(file.name, JSON.stringify(data, null, 2));

  console.log(`Uploading ${file.name}`);
  const response = await artifactClient.uploadArtifact(artifactName, [file.name], dir.name);
  console.log('Artifact uploaded', response);
}


module.exports = upload;