'use strict';

//main page after login
var MainPage = function(){
    var navigation = element(by.className("footerNavigation1"));

    //TODO add html tags to search links
    this.faqLink = navigation.element(by.linkText("Häufig gestellte Fragen (FAQ)"));
    this.supportLink = navigation.element(by.linkText("Support"));
    this.contactLink = navigation.element(by.linkText("Kontakt"));
    this.refSourceLink = navigation.element(by.linkText("Bezugsquellen"));

    //methods
    this.go = function(){
        browser.get(browser.params.MAIN_URL_DEV);
    }
};

module.exports = MainPage;