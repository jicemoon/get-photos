const { resolve } = require('path');
const fileRoot = require('../configs/const').photosRootFold;

exports.getOutputFold = path => {
  const fold = path.replace(/^\//g, '').split(/\//)[0];
  return [resolve(fileRoot, fold), fold];
};
