const { red } = require('chalk');
const inquirer = require('inquirer');
const fse = require('fs-extra');

const { getOutputFold } = require('./tools/utils');
const getTotalPage = require('./tools/getTotalPage');
const parsePage = require('./tools/parsePage');
const getClassify = require('./tools/getClassify');
const log = require('./tools/savelog');
const inputConfigs = [
  {
    type: 'list',
    name: 'inputPath',
    message: '请输入要下载的分类',
    default: function() {
      return 'meinv';
    },
    // validate: function (val) {
    //   const done = this.async();
    //   if ()
    // }
  },
  {
    type: 'number',
    name: 'pageStart',
    message: '请输入起始页数',
    default: function() {
      return 1;
    },
  },
];

(async () => {
  const host = 'http://www.netbian.com';
  // 获取分类列表
  const classify = await getClassify(host);
  inputConfigs[0].choices = classify;
  const { inputPath, pageStart } = await inquirer.prompt(inputConfigs);
  if (!inputPath) {
    throw new Error('请输入下载路径, 如 meinv');
  }
  const path = `/${inputPath}`;
  const [outPath, outFoldName] = getOutputFold(path);
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
  let pageCount;
  try {
    pageCount = await getTotalPage(path, host);
  } catch (e) {
    const { totalPage } = await inquirer.prompt([
      {
        type: 'number',
        name: 'totalPage',
        message: `自动获取总页数失败, 请手动输入(${host + path}): `,
      },
    ]);
    pageCount = totalPage;
  }
  if (!pageCount || pageStart > pageCount) {
    return;
  }
  try {
    for (let i = pageStart || 1; i <= pageCount; i++) {
      const file = i === 1 ? '' : `/index_${i}.htm`;
      console.log(
        '------------ 正在保存第',
        i,
        '/',
        pageCount,
        '页图片 ------------',
      );
      try {
        await parsePage(`${path}${file}`, host);
        console.log(
          '------------ 第',
          i,
          '/',
          pageCount,
          '页图片 保存完成 ------------',
        );
      } catch (e) {
        let str = '------------ 第 ';
        str += i;
        str += ' / ';
        str += pageCount;
        str += ' 页图片 保存错误 ------------';
        console.log(red(str));
        log(`${path} -> ` + host + path + file);
      }
    }
  } catch (e) {
    console.log(red(e.message));
  }
})();
