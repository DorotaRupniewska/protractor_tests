'use strict';

var MainPage = require('../pages/main.page.js');

var navigation = element(by.className("footerNavigation1"));
var navigation2 = element(by.className("footerNavigation2"));
var navigation3 = element(by.className("footerNavigation3"));

var footerLinks1 = [
    // {selector: navigation.element(by.linkText("Häufig gestellte Fragen (FAQ)")), url: browser.params.MAIN_URL_SF + '/faq/'},
    // {selector: navigation.element(by.linkText("Support")), url: browser.params.MAIN_URL_SF + '/support/'},
    // {selector: navigation.element(by.linkText("Kontakt")), url: browser.params.MAIN_URL_SF + '/kontakt/'},
    // {selector: navigation.element(by.linkText("Bezugsquellen")), url: browser.params.MAIN_URL_SF + '/bezugsquellen/'},
    // {selector: navigation.element(by.linkText("Nutzungsbedingungen")), url: browser.params.MAIN_URL_SF + '/nutzungsbedingungen/'},
    // {selector: navigation.element(by.linkText("Datenschutzrichtlinie")), url: browser.params.MAIN_URL_SF + '/datenschutzrichtlinie/'},
    // {selector: navigation.element(by.linkText("Cookies")), url: browser.params.MAIN_URL_SF + '/cookies/'},
    // {selector: navigation.element(by.linkText("Open source")), url: browser.params.MAIN_URL_SF + '/open-source/'},
    // {selector: navigation.element(by.linkText("Ueber uns")), url: browser.params.MAIN_URL_SF + '/ueber-uns/'},
    // {selector: navigation.element(by.linkText("Jobs")), url: browser.params.MAIN_URL_SF + '/jobs/'},
    // {selector: navigation.element(by.linkText("Blog")), url: browser.params.MAIN_URL_SF + '/blog/'},
    // {selector: navigation.element(by.linkText("Presse")), url: browser.params.MAIN_URL_SF + '/presse/'}

    {url: 'https://www.smartfrog.com/de/faq/', text: "Häufig gestellte Fragen (FAQ)"},
    {url: browser.params.MAIN_URL_SF + "/support/", text: "Support"},
    {url: browser.params.MAIN_URL_SF + "/kontakt/", text: "Kontakt"},
    {url: browser.params.MAIN_URL_SF + "/bezugsquellen/", text: "Bezugsquellen"}
];

var footerLinks2 = [
    {url: browser.params.MAIN_URL_SF + "/nutzungsbedingungen/", text: "Nutzungsbedingungen"},
    {url: browser.params.MAIN_URL_SF + "/datenschutzrichtlinie/", text: "Datenschutzrichtlinie"},
    {url: browser.params.MAIN_URL_SF + "/cookies/", text: "Cookies"},
    {url: browser.params.MAIN_URL_SF + "/open-source/", text: "Open source"}
];

var footerLinks3 = [
    {url: browser.params.MAIN_URL_SF + "/ueber-uns/", text: "Über uns"},
    {url: browser.params.MAIN_URL_SF + "/jobs/", text: "Jobs"},
    // {url: browser.params.MAIN_URL_SF + "/blog/", text: "Blog"},
    {url: 'https://www.smartfrog.com/de/blog/', text: "Blog"},
    {url: browser.params.MAIN_URL_SF + "/presse/", text: "Presse"}
];

describe('Main website page', function(){
    var mainPage;

    beforeAll(function(){
        mainPage = new MainPage();
    });

    beforeEach(function() {
        mainPage.go();
    });

    it('should have correct links in the footer1 linkable to correct pages', function(){
        var links1 = navigation.all(by.tagName('li a')).map(function(link){
            return { url: link.getAttribute("href"), text: link.getText() };
        });

        expect(links1).toEqual(footerLinks1);
    });

    it('should have correct links in the footer2 linkable to correct pages', function(){
        var links2 = navigation2.all(by.tagName('li a')).map(function(link){
            return { url: link.getAttribute("href"), text: link.getText() };
        });

        expect(links2).toEqual(footerLinks2);
    });

    it('should have correct links in the footer3 linkable to correct pages', function(){
        var links3 = navigation3.all(by.tagName('li a')).map(function(link){
            return { url: link.getAttribute("href"), text: link.getText() };
        });

        expect(links3).toEqual(footerLinks3);
    });

});
