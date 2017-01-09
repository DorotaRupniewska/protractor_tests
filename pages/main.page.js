'use strict';

//main page after login
var MainPage = function(){
    this.go = function(){
        browser.get(browser.params.MAIN_URL);
    }
};

module.exports = MainPage;