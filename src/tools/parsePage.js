const saveImage = require('./saveImage');
const { readJSONSync } = require('fs-extra');

module.exports = async (path, classify, pageIdx) => {
  const json = readJSONSync(path);
  const photos = json.photos.photo || [];
  const lens = photos.length;
  for (let idx = 0; idx < lens; idx++) {
    const photo = photos[idx];
    try {
      for (let j = 0, le = sizeList.length; j < le; j++) {
        const img = photo[`url_${sizeList[j]}_cdn`];
        if (img) {
          await saveImage(img, idx + 1, lens, classify, pageIdx);
          break;
        }
      }
    } catch (e) {}
  }
  // const $ = await getPage(host + path);
  // const hrefEles = $('#main .list li a');
  // const lens = hrefEles.length;
  // for (let i = 0; i < lens; i++) {
  //   const a = hrefEles[i];
  //   const href = a.attribs.href;
  //   if (/^\/.+\.html?$/.test(href)) {
  //     try {
  //       const pic$ = await getPage(host + href);
  //       const imgEles = pic$('#main .endpage .pic a img');
  //       if (imgEles && imgEles[0]) {
  //         const imgSrc = imgEles[0].attribs.src;
  //         await saveImage(imgSrc, path, i + 1, lens, classify);
  //       }
  //     } catch (e) {
  //       console.log(
  //         red(`======${idx}/${lens}======${host + href}======下载失败=======`),
  //       );
  //       log(`${classify} -> ${host + href}`);
  //     }
  //   } else {
  //     console.log(`======${i + 1}/${lens}======不需要保存=======`);
  //   }
  // }
};
