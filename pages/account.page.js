'use strict';

var AccountPage = function(){
	this.go = function(){
        browser.get('https://webapp.sf-dev1.com/de-de/account/');
	};

    this.lastOrderText = element(by.linkText('Last order'));

    this.lastOrder = function(){
        this.lastOrderText.click();
    };
};

module.exports = AccountPage;