'use strict';

var MainPage = require('../pages/main.page.js');

var navigation = element(by.className("footerNavigation1"));
var navigation2 = element(by.className("footerNavigation2"));
var navigation3 = element(by.className("footerNavigation3"));

describe('Page footer', function(){
    var mainPage;

    beforeAll(function(){
        mainPage = new MainPage();
    });

    beforeEach(function() {
        mainPage.go();
    });

//-- check if links are correct (attributes href and clickable names)
    it('should have correct links in the footer1 linkable to correct pages', function(){
        var links1 = navigation.all(by.tagName('li a')).map(function(link){
            return { url: link.getAttribute("href"), text: link.getText() };
        });

        expect(links1).toEqual(mainPage.footerLinks1);
    });

    it('should have correct links in the footer2 linkable to correct pages', function(){
        var links2 = navigation2.all(by.tagName('li a')).map(function(link){
            return { url: link.getAttribute("href"), text: link.getText() };
        });

        expect(links2).toEqual(mainPage.footerLinks2);
    });

    it('should have correct links in the footer3 linkable to correct pages', function(){
        var links3 = navigation3.all(by.tagName('li a')).map(function(link){
            return { url: link.getAttribute("href"), text: link.getText() };
        });

        expect(links3).toEqual(mainPage.footerLinks3);
    });

//-- check if each link open correct page
    //TODO check in loop over elements get from HTML
    it('should have correct links in the footer that trigger correct pages', function(){
        // var links1 = navigation.all(by.tagName('li a'));
        // expect(mainPage.ifLinkOpenCorrectPage(links1)).toBe(true);

        expect(mainPage.isPageCorrect("https://www.smartfrog.com/de/faq/")).toBe(true);
        expect(mainPage.isPageCorrect("https://www.smartfrog.com/de-de/support/")).toBe(true);
        expect(mainPage.isPageCorrect("https://www.smartfrog.com/de-de/kontakt/")).toBe(true);
        expect(mainPage.isPageCorrect("https://www.smartfrog.com/de-de/bezugsquellen/")).toBe(true);

        expect(mainPage.isPageCorrect("https://www.smartfrog.com/de-de/nutzungsbedingungen/")).toBe(true);
        expect(mainPage.isPageCorrect("https://www.smartfrog.com/de-de/datenschutzrichtlinie/")).toBe(true);
        expect(mainPage.isPageCorrect("https://www.smartfrog.com/de-de/cookies/")).toBe(true);
        expect(mainPage.isPageCorrect("https://www.smartfrog.com/de-de/open-source/")).toBe(true);

        expect(mainPage.isPageCorrect("https://www.smartfrog.com/de-de/ueber-uns/")).toBe(true);
        expect(mainPage.isPageCorrect("https://www.smartfrog.com/de-de/jobs/")).toBe(true);
        expect(mainPage.isPageCorrect("https://www.smartfrog.com/de/blog/")).toBe(true);
        expect(mainPage.isPageCorrect("https://www.smartfrog.com/de-de/presse/")).toBe(true);
    });

});