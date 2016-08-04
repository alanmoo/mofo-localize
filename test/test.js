'use strict';

var expect = require('chai').expect;
var mofoLocalize = require('../index');

describe('parsing no locales', function() {
    var supportedLocales = {"en-US":{}, "en-CA":{}, "fr":{}}
    it('should match and return en-US', function() {
        var result = mofoLocalize.parseLocale('en-US', "/", supportedLocales);
        expect(result.locale).to.equal('en-US');
    });
    it('should return en-US regardless of case', function() {
        var result = mofoLocalize.parseLocale('en-us', "/", supportedLocales);
        expect(result.locale).to.equal('en-US');
    });
    it('should return en-CA', function() {
        var result = mofoLocalize.parseLocale('en-CA', "/", supportedLocales);
        expect(result.locale).to.equal('en-CA');
    });
    it('should fall back to en-US', function() {
        var result = mofoLocalize.parseLocale('es', "/", supportedLocales);
        expect(result.locale).to.equal('en-US');
    })
})

describe('parseLocale with supportedLocale', function() {
    var supportedLocales = {"en-US":{}, "en-CA":{}, "es":{}}
    var clientLangs = 'es';
    var path = "/es/foo";

    it('should accept /es/ and not redirect', function() {
        var result = mofoLocalize.parseLocale(clientLangs, path, supportedLocales);
        expect(result).to.deep.equal({locale:'es', redirect:''});
    });
    
    it('should accept /es/foo and not redirect', function() {
        var result = mofoLocalize.parseLocale(clientLangs, '/es/foo', supportedLocales);
        expect(result).to.deep.equal({locale:'es', redirect:''});
    });

    it('should accept /foo and redirect to /es/foo', function() {
        var result = mofoLocalize.parseLocale(clientLangs, '/foo', supportedLocales);
        expect(result).to.deep.equal({locale:'es', redirect: '/foo'});
    });

});

describe('parseLocale with unsupported locale', function() {
    var supportedLocales = {"en-US":{}, "en-CA":{}, "es":{}}
    var clientLangs = 'fr';

    it('should accept /fr/ and redirect to /en-US/', function() {
        var result = mofoLocalize.parseLocale(clientLangs, '/fr/', supportedLocales);
        expect(result).to.deep.equal({locale:'en-US', redirect:'/'});
    });
    it('should accept /fr/foo and redirect to /en-US/foo', function() {
        var result = mofoLocalize.parseLocale(clientLangs, '/fr/foo', supportedLocales);
        expect(result).to.deep.equal({locale:'en-US', redirect:'/foo'});
    });
});