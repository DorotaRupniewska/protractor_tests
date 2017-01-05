'use strict';

var RegisterPage = require("./pages/register.page.js");

/** variables **/
var email = "test@test.com";
var email2 = "";
var password = "";
var country = "";

describe("Registration page", function(){
	var registerPage;

	beforeAll(function(){
		registerPage = new RegisterPage();
		registerPage.go();
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
    it('should display an error message when entering no email address', function(){
        registerPage.setField(registerPage.emailField, "");
        registerPage.emailField.click();
        expect(registerPage.isPopoverCorrect("email")).toBe(true);
    });

    it('should display an error message when entering incomplete email address', function(){
        registerPage.setField(registerPage.emailField, "asd");
        registerPage.emailField.click();
        expect(registerPage.isPopoverCorrect("email")).toBe(true);
    });

    it('should display error icon when entering incomplete email address', function(){
        registerPage.setField(registerPage.emailField, "asd");
        registerPage.emailField.click();
        expect(registerPage.isIconCorrect(registerPage.emailField, "x")).toBe(true);
    });

    it('should display tick icon when entering complete email address', function(){
        registerPage.setField(registerPage.emailField, email);
        registerPage.emailField.click();
        expect(registerPage.isIconCorrect(registerPage.emailField, "tick")).toBe(true);
    });

});