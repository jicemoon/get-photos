const { resolve } = require('path');
const fse = require('fs-extra');
const { red } = require('chalk');
const log = require('./savelog');
const rp = require('request-promise');
const fileRoot = resolve(__dirname, '../../photos');

/**
 * 保存图片
 * @param { string } url
 * @param { string } path
 */
async function saveImage(url, path, idx, lens) {
  const fold = path.replace(/^\//g, '').split(/\//)[0];
  const foldPath = resolve(fileRoot, fold);
  await fse.mkdirs(foldPath);
  const urlList = url.split(/\//);
  const fileName = urlList[urlList.length - 1];
  const filePath = resolve(foldPath, fileName);
  console.log(`======${idx}/${lens}======`, fileName, '======start=====');
  try {
    const binary = await rp.get(url, { encoding: null });
    await fse.writeFile(filePath, binary, 'binary');
    console.log(`======${idx}/${lens}======`, fileName, '======end=====');
  } catch (e) {
    console.log(
      red(`======${idx}/${lens}====== ${fileName} ======保存失败=====`),
    );
    log(`${path} -> ` + url);
  }
}
module.exports = saveImage;
