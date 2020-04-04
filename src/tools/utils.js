const { resolve } = require('path');
const fileRoot = require('../configs/const').photosRootFold;

exports.getOutputFold = (path) => {
  const folds = path.replace(/^\//g, '').split(/\/+/);
  let fold;
  for (i = folds.length - 1; i > -1; i--) {
    if (folds[i]) {
      fold = folds[i];
      break;
    }
  }
  return [resolve(fileRoot, fold), fold];
};
