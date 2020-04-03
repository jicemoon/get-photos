const getPage = require('./getPage');
module.exports = async (path, host) => {
  const $ = await getPage(host + path);
  let ele = $('#main .page .prev');
  ele = ele[0].prev;
  const page = ele.firstChild.nodeValue;
  if (/^\d+$/.test(page)) {
    return page - 0;
  } else {
    throw new Error('获取总页数失败');
  }
};
