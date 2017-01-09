'use strict';

var AccountPage = function(){
	this.go = function(){
        browser.get(browser.params.MAIN_URL + '/account/');
	};

    this.lastOrderText = element(by.linkText('Last order'));

    this.lastOrder = function(){
        this.lastOrderText.click();
    };
};

module.exports = AccountPage;