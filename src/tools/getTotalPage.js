const { parse, resolve } = require('path');
const { readdirSync } = require('fs-extra');
module.exports = (foldPath) => {
  const fileList = readdirSync(foldPath);
  const jsonFiles = [];
  fileList.forEach((fn) => {
    const p = parse(fn);
    if (p.ext && p.ext.toLowerCase() === '.json') {
      const fullPath = resolve(foldPath, fn);
      jsonFiles.push({
        name: p.name,
        base: p.base,
        path: fullPath,
      });
    }
  });
  return jsonFiles;
};
