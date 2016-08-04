var acceptLanguage = require(`accept-language`);
var langmap = require(`langmap`);

function getLocale(acceptedLanguages, supportedLocales) {
    acceptLanguage.languages(Object.keys(supportedLocales));
    return acceptLanguage.get(acceptedLanguages);
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
