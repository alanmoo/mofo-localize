/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-disable no-unused-vars */
import { Route, IndexRedirect, Redirect, IndexRoute } from 'react-router';
var locales = Object.keys(require(`../public/locales.json`));


function buildRoutes() {
  var routes = [];

  locales.forEach(function(locale) {
    routes.push(
      <Route key={locale} path={locale}>
        <IndexRoute component={require(`./pages/home.js`)}/>
      </Route>
    );
  });
  return routes;
}
// just need to handle / redirect now
module.exports = (
  <Route path="/">
    {buildRoutes()}
  </Route>
);
