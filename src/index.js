const { red } = require('chalk');
const inquirer = require('inquirer');
const fse = require('fs-extra');
const { resolve } = require('path');

const { getOutputFold } = require('./tools/utils');
const getTotalPage = require('./tools/getTotalPage');
const parsePage = require('./tools/parsePage');
const getClassify = require('./tools/getClassify');
const log = require('./tools/savelog');

(async () => {
  // 获取分类列表;
  const jsonRootFold = resolve(__dirname, '../json');
  const classify = getClassify(jsonRootFold);
  const { inputPath } = await inquirer.prompt([classify]);
  if (!inputPath) {
    throw new Error('请选择路径');
  }
  const [foldPath, foldName] = inputPath.split('|||');
  const [outPath, outFoldName] = getOutputFold(foldName);
  // 已存在输出目录, 是否继续
  if (fse.existsSync(outPath)) {
    const { isContinue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isContinue',
        message: `输出文件夹已存在${outFoldName}, 是否继续?`,
      },
    ]);
    if (!isContinue) {
      return;
    }
  }
  const pageList = getTotalPage(foldPath);
  console.log(pageList);
  const pageCount = pageList.length;
  try {
    for (let i = 1; i <= pageCount; i++) {
      const file = pageList[i - 1];
      console.log(
        '------------ 正在保存第',
        i,
        '/',
        pageCount,
        `页(${file.base})图片 ------------`,
      );
      try {
        await parsePage(file.path, foldName, i);
        console.log(
          '------------ 第',
          i,
          '/',
          pageCount,
          `页(${file.base})图片 保存完成------------`,
        );
      } catch (e) {
        let str = '------------ 第 ';
        str += i;
        str += ' / ';
        str += pageCount;
        str += `页(${file.base})图片 保存错误------------`;
        console.log(red(str));
        log(`${file.base} => ${file.path}`);
      }
    }
  } catch (e) {
    console.log(red(e.message));
  }
})();
