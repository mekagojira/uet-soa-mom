const got = require("got");
const cheerio = require("cheerio");

module.exports = async (url) => {
  const resp = await got(url);
  const $ = cheerio.load(resp.body);
  console.log($("title").text());
};
