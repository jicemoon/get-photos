const { resolve } = require('path');
const fse = require('fs-extra');
const logFilePath = resolve(__dirname, '../../photos/log.txt');

module.exports = async str => {
  let old = '';
  if (fse.existsSync(logFilePath)) {
    old = await fse.readFile(logFilePath, 'utf-8');
  }
  old += str + '\n';
  fse.writeFile(logFilePath, old, 'utf-8');
};
