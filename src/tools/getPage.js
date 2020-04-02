const rp = require('request-promise');
const cheerio = require('cheerio');

/**
 * @param { string } url
 * @returns { import('request-promise').RequestPromise<CheerioStatic>}
 */
module.exports = url => {
  const options = {
    uri: url,
    transform(body) {
      return cheerio.load(body);
    },
  };
  return rp(options);
};
