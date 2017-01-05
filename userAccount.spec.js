'use strict';

var AccountPage = require('./pages/account.page.js');
var Login = require('./pages/login.page.js');

/** variables **/
var username = 'test.user+dev1@smartfrog.com';
var password = 'Test123!!!';

describe('user account', function(){
	var accountPage, loginPage;

	beforeAll(function(){
		loginPage = new Login();
        loginPage.login(username, password);
        accountPage = new AccountPage();
    });

    afterAll(function(){
        //logout
        element(by.id('single-button')).click();
    });

	it('should load last order', function(){
	    accountPage.go();
	    browser.waitForAngular();
	    accountPage.lastOrderText.click().then(function(){
            element(by.className("order-header")).element(by.tagName('h1')).getText().then(function(text){
                expect(text.indexOf("Bestellnummer") !== -1).toBe(true);
            });
        });

	  });

    // it('should redirect after login', function(){
    //     expect(browser.getTitle()).toEqual('Mein Konto - Smartfrog');
    // });
});
