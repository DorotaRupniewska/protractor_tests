'use strict';

var AccountPage = function(){
	browser.get('https://webapp.sf-dev1.com/de-de/account/');
};

AccountPage.prototype = Object.create({}, {
	lastOrderText: { get: function(){ return element(by.linkText('Last order')); }},

	lastOrder: { value: function(){
		this.lastOrderText.click();
	}}
});


module.exports = AccountPage;