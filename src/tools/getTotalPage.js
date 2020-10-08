const { parse, resolve } = require('path');
const { readdirSync, statSync } = require('fs-extra');
module.exports = (foldPath) => {
  const fileList = readdirSync(foldPath);
  const jsonFiles = [];
  fileList.forEach((fn) => {
    const p = parse(fn);
    const fullPath = resolve(foldPath, fn);
    if (statSync(fullPath).isFile() && p.ext && p.ext.toLowerCase() === '.json') {
      jsonFiles.push({
        name: p.name - 0,
        base: p.base,
        path: fullPath,
      });
    }
  });
  jsonFiles.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });
  return jsonFiles;
};
