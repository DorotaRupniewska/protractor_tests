'use strict';

var RegistrationPage = function(){
	//stage env as default variable
	// browser.get('https://webapp.sf-dev1.com/de-de/register');

    this.emailField = element(by.model("vm.email"));
    this.emailRepeatField = element(by.model("vm.email2"));
    this.passwordField = element(by.model("vm.password"));
    this.countrySelect = element(by.model("vm.country"));

    this.popover = element(by.className('popover'));

    //TODO add name tag
    this.termsOfUseLink = element(by.linkText("Nutzungsbedingungen"));
    this.privacyPolicyLink = element(by.linkText("Datenschutzrichtlinie"));
    this.cookiesLink = element(by.linkText("Richtlinien zur Verwendung von Cookies"));

    this.registerButton = element(by.buttonText("Jetzt registrieren"));

    //methods
    this.setField = function(filed, value){
        filed.clear().then(function(){
            filed.sendKeys(value);
        });
    };

    this.isPopoverCorrect = function(type){
      return checkPopover(type, this.popover);
    };

    //icon in text field: green tick or red x
    this.isIconCorrect = function(field, icon){
        var wrapper = field.getWebElement();
        var templateClass = wrapper.getDriver().findElement(by.className("validity-mark")).findElement(by.tagName('span'));

        switch(icon){
            case "x":
                return hasClass(templateClass, "text-danger") && hasClass(templateClass, "fa-times");
            case "tick":
                return hasClass(templateClass, "text-success") && hasClass(templateClass, "fa-check");
            default:
                return false;
        }
    };

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

var checkPopover = function(type, popover){
    if(!popover.isPresent() || !templateData[type]){
        return false;
    }else{
        var template = templateData[type];

        var correctHeader = popover.element(by.tagName('h4')).getText().then(function(value){
            return value === template.header;
        });

        var correctHint = popover.all(by.tagName('li')).then(function(hints){
            for(var i = 0; i < hints.length; i++){
                hints[i].getText().then(function(text){
                    if(template.hints.indexOf(text) == -1){
                        return false;
                    }
                });
            }
            return true;
        });

        return correctHeader && correctHint;
    }
};

var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
};

var templateData = {
    "email": {
        "header": "E-Mail-Adresse muss:",
        "hints": ["gültig sein"]
    },
    "email2": {
        "header": "E-Mail-Adresse muss:",
        "hints": ["übereinstimmen"]
    }
};

module.exports = RegistrationPage;