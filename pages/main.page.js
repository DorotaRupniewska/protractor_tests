'use strict';

//main page after login
var MainPage = function(){
    this.contactLink = element(by.className("footerNavigation1")).element(by.linkText("Kontakt"));

    //methods
    this.go = function(){
        browser.get(browser.params.MAIN_URL_DEV);
    }
};

module.exports = MainPage;