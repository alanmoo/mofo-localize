var acceptLanguage = require(`accept-language`);
var localeString = require(`locale-string`);

function getLocale(acceptedLanguages, supportedLocales) {
  acceptLanguage.languages(supportedLocales);
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
 * @param {object} supportedLocales - An array of locales your app supports
 */

module.exports = function(acceptLang, path, supportedLocales) {
  var pathSplit = path.split(`/`);
  var locale = pathSplit[1];
  var redirect = ``;

  if (!locale || localeString.parse(locale) === undefined) {
    // No locale or not a valid locale.
    locale = getLocale(acceptLang, supportedLocales);
    redirect = path;
  } else if (supportedLocales.indexOf(locale) === -1) {
    // We have a valid locale, but we currently don't support it.
    locale = getLocale(acceptLang, supportedLocales);
    redirect = getLocation(path);
  }

  return ({
    locale,
    redirect
  });
};
