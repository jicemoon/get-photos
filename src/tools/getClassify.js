const getPage = require('./getPage');
/**
 * 获取所有分类
 */
module.exports = async host => {
  const $ = await getPage(host);
  const hrefEles = $('#header .menu .nav.cate a');
  const lens = hrefEles.length;
  const reg = /^\//;
  const rtn = [];
  for (let i = 0; i < lens; i++) {
    const ele = hrefEles[i];
    const href = ele.attribs.href;
    if (reg.test(href)) {
      rtn.push({
        name: ele.firstChild.nodeValue,
        value: href.replace(reg, ''),
      });
    }
  }
  return rtn;
};
