const { resolve } = require('path');
const { readdirSync, lstatSync } = require('fs-extra');
/**
 * 获取所有分类
 */
module.exports = (jsonRootFold) => {
  const fileList = readdirSync(jsonRootFold);
  const folds = [];
  fileList.forEach((value) => {
    const absPath = resolve(jsonRootFold, value);
    if (lstatSync(absPath).isDirectory()) {
      folds.push({
        name: value,
        value: absPath + '|||' + value,
      });
    }
  });
  return {
    type: 'list',
    name: 'inputPath',
    message: '请选择要下载的文件夹',
    choices: folds,
  };
};
