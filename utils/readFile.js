const fs = require('fs/promises');

function readFile() {
  return fs
    .readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}

function writeFile(data) {
  return fs.writeFile('.talker.json', JSON.stringify(data));
}

module.exports = { readFile, writeFile };
