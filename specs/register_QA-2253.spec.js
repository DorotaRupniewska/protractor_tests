'use strict';

var RegisterPage = require("../pages/register.page.js");
var MainPage = require("../pages/main.page.js");
var seed = 'automation'+ Math.round(new Date().getTime()/1000);

/** variables **/
var email = "test+" + seed +"@test.com";
var incompleteEmail = "asd";
var email2 = "test+" + seed +"@test.com";
var password = {
    inclomplete: "asd",
    very_weak: "asdqwe",  //red
    weak: "asdqweAa",       //light orange
    average: "asdqweAa1",    //orange
    strong: "asdqweAa1@"      //green
};
var countryCode = "DE";

describe("Registration page", function(){
	var registerPage, mainPage;

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
        registerPage.setField(registerPage.emailField, email);
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
        registerPage.setField(registerPage.emailRepeatField, "");
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

//-- Check if there is a 'How strong is your password'-note after entering six letters/numbers/etc. in the password field
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

        registerPage.setField(registerPage.passwordField, registerPage.getRandomPassword(5));
        registerPage.passwordField.click();

        expect(registerPage.isHintClassCorrect(1, "text-danger")).toBe(true);
        expect(registerPage.isHintClassCorrect(2, "text-success")).toBe(true);
    });

    it('should display correct hints when password length is between 6 - 64 characters', function(){
        registerPage.setField(registerPage.passwordField, registerPage.getRandomPassword(6));
        registerPage.passwordField.click();

        expect(registerPage.isHintClassCorrect(1, "text-success")).toBe(true);
        expect(registerPage.isHintClassCorrect(2, "text-success")).toBe(true);

        registerPage.setField(registerPage.passwordField, registerPage.getRandomPassword(63));
        registerPage.passwordField.click();

        expect(registerPage.isHintClassCorrect(1, "text-success")).toBe(true);
        expect(registerPage.isHintClassCorrect(2, "text-success")).toBe(true);
    });

    it('should display correct hints when password is longer than 64 characters', function(){
        registerPage.setField(registerPage.passwordField, registerPage.getRandomPassword(66));
        registerPage.passwordField.click();

        expect(registerPage.isHintClassCorrect(1, "text-success")).toBe(true);
        expect(registerPage.isHintClassCorrect(2, "text-danger")).toBe(true);

    });

//-- Check if there is a 'How strong is your password' note after entering six letters/numbers/etc. in the password field
    it('should display "How strong is your password" note after entering six characters', function(){
        registerPage.setField(registerPage.passwordField, registerPage.getRandomPassword(6));
        registerPage.passwordField.click();

        expect(registerPage.popoverPasswordHint.isDisplayed()).toBe(true);
    });

    it('should display correct hint "How strong is your password" if very weak password provided', function(){
        registerPage.setField(registerPage.passwordField, password.very_weak);
        registerPage.passwordField.click();

        expect(registerPage.isStrongPasswordHintCorrect('very_weak')).toBe(true);
    });

    it('should display correct hint "How strong is your password" if weak password provided', function(){
        registerPage.setField(registerPage.passwordField, password.weak);
        registerPage.passwordField.click();

        expect(registerPage.isStrongPasswordHintCorrect('weak')).toBe(true);
    });

    it('should display correct hint "How strong is your password" if average password provided', function(){
        registerPage.setField(registerPage.passwordField, password.average);
        registerPage.passwordField.click();

        expect(registerPage.isStrongPasswordHintCorrect('average')).toBe(true);
    });

    it('should display correct hint "How strong is your password" if strong password provided', function(){
        registerPage.setField(registerPage.passwordField, password.strong);
        registerPage.passwordField.click();

        expect(registerPage.isStrongPasswordHintCorrect('strong')).toBe(true);
    });

//-- Check if the 'Register now' button leads you to a logged in page
    it('should keep "Register" button disabled until all required field are fill in', function(){
        registerPage.fillInRegisterFields("", "", "", "");
        expect(registerPage.registerButton.isEnabled()).toBe(false);

        registerPage.fillInRegisterFields(email, "", "", "");
        expect(registerPage.registerButton.isEnabled()).toBe(false);

        registerPage.fillInRegisterFields("", email, "", "");
        expect(registerPage.registerButton.isEnabled()).toBe(false);

        registerPage.fillInRegisterFields("", "", password.inclomplete, "");
        expect(registerPage.registerButton.isEnabled()).toBe(false);
    });

    it('should enable "Register" button if all required fields are fill in', function(){
        registerPage.fillInRegisterFields(email, email, password.average, countryCode);

        expect(registerPage.registerButton.isEnabled()).toBe(true);
    });

//--  Check if the 'Register now' button leads you to a logged in page
    it('should redirect to a logged in page after registration', function(){
        //TODO handle redirect
        registerPage.fillInRegisterFields(email, email, password.average, countryCode);
        registerPage.registerButton.isEnabled().then(function(){
            registerPage.registerButton.click();
            browser.waitForAngular();
            mainPage = new MainPage();
            mainPage.go();
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + "/");
        });

    });

});