const saveImage = require('./saveImage');
const { readJSONSync } = require('fs-extra');

const sizeList = ['6k', '5k', '4k', '3k', '2k', 'o', 'k'];
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
};
