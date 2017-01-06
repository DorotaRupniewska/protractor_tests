'use strict';

var RegisterPage = require("./pages/register.page.js");

/** variables **/
var email = "test@test.com";
var incompleteEmail = "asd";
var email2 = "test@test.com";
var password = {
    inclomplete: "asd",
    very_weak: "",
    weak: "",
    average: "",
    strong: ""
};
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
    it('should display correct error message when entering no email address', function(){
        registerPage.setField(registerPage.emailField, "");
        registerPage.emailField.click();
        expect(registerPage.isPopoverCorrect("email")).toBe(true);
    });

    it('should display correct error message when entering incomplete email address', function(){
        registerPage.setField(registerPage.emailField, incompleteEmail);
        registerPage.emailField.click();
        expect(registerPage.isPopoverCorrect("email")).toBe(true);
    });

    it('should display red hint in popover when entering no email address', function(){
        registerPage.setField(registerPage.emailField, "");
        registerPage.emailField.click();
        expect(registerPage.isHintClassCorrect(1, "text-danger")).toBe(true);
    });

    it('should display error icon when entering incomplete email address', function(){
        registerPage.setField(registerPage.emailField, incompleteEmail);
        registerPage.emailField.click();
        expect(registerPage.isIconCorrect(registerPage.emailField, "x")).toBe(true);
    });

//-- Check if there is a 'correct' message when entering a valid Email address
    it('should display correct error message when entering complete email address', function(){
        registerPage.setField(registerPage.emailField, email);
        registerPage.emailField.click();
        expect(registerPage.isPopoverCorrect("email")).toBe(true);
    });

    it('should display correct error message when entering complete email address', function(){
        registerPage.setField(registerPage.emailField, email);
        registerPage.emailField.click();
        expect(registerPage.isPopoverCorrect("email")).toBe(true);
    });

    it('should display red hint in popover when entering complete email address', function(){
        registerPage.setField(registerPage.emailField, email);
        registerPage.emailField.click();
        expect(registerPage.isHintClassCorrect(1, "text-success")).toBe(true);
    });

    it('should display tick icon when entering complete email address', function(){
        registerPage.setField(registerPage.emailField, email);
        registerPage.emailField.click();
        expect(registerPage.isIconCorrect(registerPage.emailField, "tick")).toBe(true);
    });

//-- Check if there is a error message when entering no or an incomplete Email address the second time
    //TODO popover sholud be visible ONLY when first email is corrected
    it('should display correct error message when entering no email address the second time', function(){
        registerPage.setField(registerPage.emailRepeatField, "");
        registerPage.emailRepeatField.click();
        expect(registerPage.isPopoverCorrect("email2")).toBe(true);
    });

    it('should display correct error message when entering incomplete email address the second time', function(){
        registerPage.setField(registerPage.emailRepeatField, incompleteEmail);
        registerPage.emailRepeatField.click();
        expect(registerPage.isPopoverCorrect("email2")).toBe(true);
    });

    it('should display red hint in popover when entering no email address the second time', function(){
        registerPage.setField(registerPage.emailRepeatField, "");
        registerPage.emailRepeatField.click();
        expect(registerPage.isHintClassCorrect(1, "text-danger")).toBe(true);
    });

    xit('should display error icon when entering incomplete email address the second time', function(){
        registerPage.setField(registerPage.emailRepeatField, incompleteEmail);
        registerPage.emailRepeatField.click();
        expect(registerPage.isIconCorrect(registerPage.emailRepeatField, "x")).toBe(true);
    });

//-- Check if there is a 'correct' message when entering a valid Email address the second time
    it('should display correct error message when entering complete email address the second time', function(){
        registerPage.setField(registerPage.emailRepeatField, email);
        registerPage.emailRepeatField.click();
        expect(registerPage.isPopoverCorrect("email2")).toBe(true);
    });

    it('should display correct error message when entering complete email address the second time', function(){
        registerPage.setField(registerPage.emailRepeatField, email);
        registerPage.emailRepeatField.click();
        expect(registerPage.isPopoverCorrect("email2")).toBe(true);
    });

    it('should display red hint in popover when entering complete email address the second time', function(){
        registerPage.setField(registerPage.emailRepeatField, email);
        registerPage.emailRepeatField.click();
        expect(registerPage.isHintClassCorrect(1, "text-success")).toBe(true);
    });

    it('should display tick icon when entering complete email address the second time', function(){
        registerPage.setField(registerPage.emailRepeatField, email);
        registerPage.emailRepeatField.click();
        expect(registerPage.isIconCorrect(registerPage.emailRepeatField, "tick")).toBe(true);
    });

//-- Check if there is a hint 'How to find the correct password' when start to enter a password, incl. the coloring logic for having a weak/strong password
    it('should display correct error message when start to enter a password', function(){
        registerPage.setField(registerPage.passwordField, password.inclomplete);
        registerPage.passwordField.click();
        expect(registerPage.isPopoverCorrect("password")).toBe(true);
    });

    /**
     * hints for password should be (min. 6 chars / max. 64 chars):
     *  - red / green   if password length is less than 6
     *  - green / green if password length is between 6 - 64
     *  - green / red   if password length is more than 64
     */

    it('should display correct hints when password is shorter than 6 characters', function(){
        registerPage.setField(registerPage.passwordField, password.inclomplete);
        registerPage.passwordField.click();

        expect(registerPage.isHintClassCorrect(1, "text-danger")).toBe(true);
        expect(registerPage.isHintClassCorrect(2, "text-success")).toBe(true);

        registerPage.setField(registerPage.passwordField, registerPage.getPassword(5));
        registerPage.passwordField.click();

        expect(registerPage.isHintClassCorrect(1, "text-danger")).toBe(true);
        expect(registerPage.isHintClassCorrect(2, "text-success")).toBe(true);
    });

    it('should display correct hints when password length is between 6 - 64 characters', function(){
        registerPage.setField(registerPage.passwordField, registerPage.getPassword(6));
        registerPage.passwordField.click();

        expect(registerPage.isHintClassCorrect(1, "text-success")).toBe(true);
        expect(registerPage.isHintClassCorrect(2, "text-success")).toBe(true);

        registerPage.setField(registerPage.passwordField, registerPage.getPassword(63));
        registerPage.passwordField.click();

        expect(registerPage.isHintClassCorrect(1, "text-success")).toBe(true);
        expect(registerPage.isHintClassCorrect(2, "text-success")).toBe(true);
    });

    it('should display correct hints when password is longer than 64 characters', function(){
        registerPage.setField(registerPage.passwordField, registerPage.getPassword(66));
        registerPage.passwordField.click();

        expect(registerPage.isHintClassCorrect(1, "text-success")).toBe(true);
        expect(registerPage.isHintClassCorrect(2, "text-danger")).toBe(true);

    });

});