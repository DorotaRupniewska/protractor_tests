'use strict';

var MainPage = function() {

    //methods
    this.go = function(){
        browser.get(browser.params.MAIN_URL_SHOP);
    };
};

module.exports = MainPage;