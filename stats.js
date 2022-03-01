// https://webpack.js.org/api/stats/#chunk-objects
// https://github.com/webpack-contrib/webpack-bundle-analyzer/issues/61

const fs = require('fs');
const rawdata = fs.readFileSync('output/stats.json');
const stats = JSON.parse(rawdata);
const assets = stats.assets

const isJS = (fileName) => {
  return fileName.split('.').pop() === 'js';
}

const formatBytes = (bytes, decimals = 2) => {
  let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

  let i = 0

  for (i; bytes > 1024; i++) {
    bytes /= 1024;
  }

  return parseFloat(bytes.toFixed(decimals)) + ' ' + units[i]
}

const outputs = assets.filter(asset => isJS(asset.name)).map(asset => {

  const { name, size } = asset

  return {
    name,
    size
  }
})

function formatTable(rows) {
  const rowStrs = rows.map(({ name, size }) => {
    return `| \`${name}\` | ${formatBytes(size)} |`;
  });

  return `| Name | Bundle Size(Parsed)  |
  | ------ | ------ |
  ${rowStrs.join('\n')}`;
}

console.log(outputs)
console.log(formatTable(outputs))
