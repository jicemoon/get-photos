const rp = require('request-promise');
const cheerio = require('cheerio');
const iconvLite = require('iconv-lite');

/**
 * @param { string } url
 * @returns { import('request-promise').RequestPromise<CheerioStatic>}
 */
module.exports = url => {
  const options = {
    uri: url,
    encoding: null,
    transform(body) {
      const $ = cheerio.load(body);
      const charset = $('meta[charset]');
      let lang;
      if (charset.length > 0) {
        lang = charset[0].attribs.charset.toLowerCase();
      }
      return lang ? cheerio.load(iconvLite.decode(body, lang)) : $;
    },
  };
  return rp(options);
};
