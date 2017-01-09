'use strict';

var MainPage = require('../pages/main.page.js');

describe('Main website page', function(){
    var mainPage;

    beforeAll(function(){
        mainPage = new MainPage();
        mainPage.go();
    });

    afterAll(function() {
        browser.ignoreSynchronization = false;
    });

    it('should have "Contact" link in the footer', function(){
        mainPage.contactLink.getAttribute('href').then(function(tagName){
            expect(tagName).toBe(browser.params.MAIN_URL_SF + '/kontakt/');
        });
    });

    it('should have "Contact" page accessible', function(){
        mainPage.contactLink.getAttribute('href').then(function(tagName){
            browser.ignoreSynchronization = true;
            browser.get(tagName);
            expect(tagName).toBe(browser.params.MAIN_URL_SF + '/kontakt/');
        });
    });
});