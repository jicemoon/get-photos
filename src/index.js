const { red } = require('chalk');
const getTotalPage = require('./tools/getTotalPage');
const parsePage = require('./tools/parsePage');
const log = require('./tools/savelog');
const [inputPath, pageStart, totalPage] = process.argv.slice(2);

(async () => {
  const host = 'http://www.netbian.com';
  // const path = '/meinv';
  if (!inputPath) {
    throw new Error('请输入下载路径, 如 meinv');
  }
  const path = `/${inputPath}`;
  try {
    const pageCount =
      totalPage && totalPage != 0 ? totalPage - 0 : getTotalPage(path, host);
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
