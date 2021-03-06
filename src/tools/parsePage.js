const { red } = require('chalk');
const getPage = require('./getPage');
const saveImage = require('./saveImage');
const log = require('./savelog');

module.exports = async (path, host, classify) => {
  const $ = await getPage(host + path);
  const hrefEles = $('#main .list li a');
  const lens = hrefEles.length;
  for (let i = 0; i < lens; i++) {
    const a = hrefEles[i];
    const href = a.attribs.href;
    if (/^\/.+\.html?$/.test(href)) {
      try {
        const pic$ = await getPage(host + href);
        const imgEles = pic$('#main .endpage .pic a img');
        if (imgEles && imgEles[0]) {
          const imgSrc = imgEles[0].attribs.src;
          await saveImage(imgSrc, path, i + 1, lens, classify);
        }
      } catch (e) {
        console.log(
          red(`======${idx}/${lens}======${host + href}======下载失败=======`),
        );
        log(`${classify} -> ${host + href}`);
      }
    } else {
      console.log(`======${i + 1}/${lens}======不需要保存=======`);
    }
  }
};
