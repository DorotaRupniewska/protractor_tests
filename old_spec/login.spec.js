'use strict';

var Login = require('./pages/login.page.js');
var Main = require('./pages/main.page.js');

/** variables **/
var username = 'test.user+dev1@smartfrog.com';
var password = 'Test123!!!';

describe('WebApp', function(){
	var mainUserPage, loginPage;

	beforeAll(function(){
        mainUserPage = new Main();
		loginPage = new Login();
        loginPage.go();
        // loginPage.login(browser.params.login.username, browser.params.login.password);
	});

	afterAll(function(){
		//logout
		element(by.id('single-button')).click();
	});

	it('should render login page', function(){
        var currentUrl = browser.driver.getCurrentUrl();
        expect(currentUrl).toMatch("/login");
    });

	it('should open "My account" page', function(){
        loginPage.login(username, password);
        mainUserPage.go();
        browser.waitForAngular();
	    expect(browser.getTitle()).toEqual('Meine Kameras - Smartfrog');
	});

	// it('should display user name in the page header', function(){
	// 	var headerUserName = element(by.className('user-email'));
	// 	expect(headerUserName.getText()).toEqual(username);
	// });

});
