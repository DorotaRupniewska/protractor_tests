'use strict';

var Login = require('./pages/login.page.js');

/** variables **/
var username = 'test.user+dev1@smartfrog.com';
var password = 'Test123!!!';

describe('WebApp', function(){
	var accountPage, loginPage;

	beforeAll(function(){
		loginPage = new Login();
        loginPage.go();
		// loginPage.login(browser.params.login.username, browser.params.login.password);
	});

	afterAll(function(){
		//logout
		//element(by.id('single-button')).click();
	});

	it('should render login page', function(){
        var currentUrl = browser.driver.getCurrentUrl();
        expect(currentUrl).toMatch("/login");
    });

	it('should redirect after login', function(){
	    loginPage.login(username, password);
	    browser.waitForAngular();
		expect(browser.getTitle()).toEqual('Meine Kameras - Smartfrog');
	});

	// it('should display user name in the page header', function(){
	// 	var headerUserName = element(by.className('user-email'));
	// 	expect(headerUserName.getText()).toEqual(username);
	// });



});
