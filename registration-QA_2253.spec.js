'use strict';

var RegisterPage = require("./pages/register.page.js");

var email = "";
var email2 = "";
var password = "";
var country = "";

describe("Registration page", function(){
var registerPage;

	beforeAll(function(){
		registerPage = new RegisterPage();
	});

//-- Check if all the described linkages (privacy policy, etc.) are implemented
	it('should display Terms of Use link', function(){
		expect(registerPage.termsOfUseLink.getTagName()).toBe('a');
	});

	it('should display Privacy Policy link', function(){
		expect(registerPage.privacyPolicyLink.getTagName()).toBe('a');
	});

	it('should display Cookies link', function(){
		expect(registerPage.cookiesLink.getTagName()).toBe('a');
	});

//-- Check if there is a error message when entering no or an incomplete Email address

});