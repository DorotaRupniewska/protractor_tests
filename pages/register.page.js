'use strict';

var RegistrationPage = function(){
	browser.get('https://webapp.sf-dev1.com/de-de/register');
};

RegistrationPage.prototype = Object.create({}, {
	emailField: { get: function(){ return element(by.model("vm.email")); }},
	emailRepeatField: { get: function(){ return element(by.model("vm.email2")); }},
	passwordField: { get: function(){ return element(by.model("vm.password")); }},
	countrySelect: { get: function(){ return element(by.model("vm.country")); }},

//TODO add name tag
	termsOfUseLink: { get: function(){ return element(by.linkText("Nutzungsbedingungen")); }},
	privacyPolicyLink: { get: function(){ return element(by.linkText("Datenschutzrichtlinie")); }},
	cookiesLink: { get: function(){ return element(by.linkText("Richtlinien zur Verwendung von Cookies")); }},

	registerButton: { get: function(){ return element(by.buttonText("Jetzt registrieren")); }},

	//methods
	register: { value: function(email, email2, password, country){
		this.emailField.sendKeys(email);
		this.emailRepeatField.sendKeys(email2);
		this.passwordField.sendKeys(password);
		this.countrySelect.sendKeys(country);
		this.registerButton.click();
	}}
});

module.exports = RegistrationPage;