var Parser = require(`accept-language-parser`);
var bestLang = require(`bestlang`);
var langmap = require(`langmap`);

function getLocale(acceptLang, supportedLocales) {
  var langHeader = Parser.parse(acceptLang);
  var langArray = langHeader.map(l => { `${l.code}${l.region ? `-` + l.region : ``}`; });

  return bestLang(langArray, Object.keys(supportedLocales), `en-US`);
}

function getLocation(location) {
  return `/` + location.split(`/`).splice(2).join(`/`);
}

/**
 * A function to figure out which locale to provide to a user.
 * @constructor
 * @param {array} acceptedLang - Array of acceptable languages. Usually based on client settings
 * @param {string} path - A URL path fragment.
 * @param {object} supportedLocales - An object whose keys are each locales, like: { "en-US":{}, "en-CA":{} }
 */

module.exports = function(acceptLang, path, supportedLocales) {
  var pathSplit = path.split(`/`);
  var locale = pathSplit[1];
  var redirect = ``;

  if (!locale || !langmap[locale]) {
    // No locale or not a valid locale.
    locale = getLocale(acceptLang, supportedLocales);
    redirect = path;
  } else if (!supportedLocales[locale]) {
    // We have a valid locale, but we currently don't support it.
    locale = getLocale(acceptLang, supportedLocales);
    redirect = getLocation(path);
  }

  return ({
    locale,
    redirect
  });
};
