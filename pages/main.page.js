'use strict';

//main page after login
var MainPage = function(){
    this.go = function(){
        browser.get("https://webapp.sf-dev1.com/de-de/");
    }
};

module.exports = MainPage;