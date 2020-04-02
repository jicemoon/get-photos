const { red } = require('chalk');
const parsePage = require('./tools/parsePage');
const log = require('./tools/savelog');
const [totalPage, inputPath] = process.argv.slice(2);

(async () => {
  const host = 'http://www.netbian.com';
  // const path = '/meinv';
  const path = `/${inputPath || 'weimei'}`;
  const pageCount = totalPage || 75;
  for (let i = 1; i <= pageCount; i++) {
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
      log(host + file);
    }
  }
})();
