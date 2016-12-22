'use strict';

var AccountPage = require('./pages/account.page.js');
var Login = require('./pages/login.page.js');

var username = 'test.user+dev1@smartfrog.com';
var password = 'Test123!!!';

describe('user account', function(){
	var accountPage, loginPage;

	beforeEach(function(){
		accountPage = new AccountPage();
		loginPage = new Login();
		loginPage.login(username, password);
	});

	it('should load last order', function(){
	    var link = element(by.linkText('Last order'));
	    // expect(link.getTagName()).toBe('a');
	    link.click();
	    element(by.className("order-header")).element(by.tagName('h1')).getText().then(function(text){
	    	expect(text.indexOf("Bestellnummer") !== -1).toBe(true);
	    });
	  })

});
