'use strict';

var RegistrationPage = function(){
	//stage env as default variable
	// browser.get('https://webapp.sf-dev1.com/de-de/register');

    this.emailField = element(by.model("vm.email"));
    this.emailRepeatField = element(by.model("vm.email2"));
    this.passwordField = element(by.model("vm.password"));
    this.countrySelect = element(by.model("vm.country"));

    //TODO add name tag
    this.termsOfUseLink = element(by.linkText("Nutzungsbedingungen"));
    this.privacyPolicyLink = element(by.linkText("Datenschutzrichtlinie"));
    this.cookiesLink = element(by.linkText("Richtlinien zur Verwendung von Cookies"));

    this.registerButton = element(by.buttonText("Jetzt registrieren"));

    //methods
    this.register = function(email, email2, password, country){
        this.emailField.sendKeys(email);
        this.emailRepeatField.sendKeys(email2);
        this.passwordField.sendKeys(password);
        this.countrySelect.sendKeys(country);
        this.registerButton.click();
    };

    this.go = function(){
		browser.get('https://webapp.sf-dev1.com/de-de/register');
    }
};

module.exports = RegistrationPage;