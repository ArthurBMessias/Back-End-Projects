const fs = require('fs/promises');

function readFile(fileName) {
  return fs
    .readFile(fileName, 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}

function writeFile(data) {
  return fs.writeFile('./talker.json', JSON.stringify(data));
}

module.exports = { readFile, writeFile };
