'use strict';

var Login = require('./pages/login.page.js');

var username = 'test.user+dev1@smartfrog.com';
var password = 'Test123!!!';

describe('Login', function(){
	var accountPage, loginPage;

	beforeAll(function(){
		loginPage = new Login();
		// loginPage.login(browser.params.login.username, browser.params.login.password);		
		loginPage.login(username, password);
	});

	afterAll(function(){
		//logout
		element(by.tagName('form.navbar-form')).element(by.tagName('button.btn-logout')).click();
	});


	it('should redirect after login', function(){
		expect(browser.getTitle()).toEqual('Meine Kameras - Smartfrog');
	});

	it('should display user name in the page header', function(){
		var headerUserName = element(by.className('user-email'));
		expect(headerUserName.getText()).toEqual(username);
	});



});
