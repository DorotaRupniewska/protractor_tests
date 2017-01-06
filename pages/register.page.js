'use strict';

//-- variables

// correct texts for popover
var templateData = {
    "email": {
        "header": "E-Mail-Adresse muss:",
        "hints": ["gültig sein"]
    },
    "email2": {
        "header": "E-Mail-Adresse muss:",
        "hints": ["übereinstimmen"]
    },
    "password": {
        "header": "Passwort muss enthalten:",
        "hints": ["min. 6 Zeichen", "max. 64 Zeichen"]
    }
};

var RegistrationPage = function(){
	// TODO stage env as default variable
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

    this.isPopoverCorrect = function(type, isCorrect){
        return protractor.promise.all([checkPopoverHeader(type, this.popover), checkPopoverHints(type, this.popover)]).then(function(params){
            var out = true;
            params.forEach(function(p){
                if(!p){
                    out = false;
                }
            })
            return out;
        });
    };

     /**
      * is hint in popover green or red (state error / success accordingly)
      * check hint on 'index' position
      * (e.g. when there are 3 hint we can check hint with index 1, 2 or 3)
      **/
    this.isHintClassCorrect = function(index, expectedClass){
    var deferred = protractor.promise.defer();
        this.popover.all(by.tagName('li')).get(index - 1).getAttribute("class").then(function(cls){
            deferred.fulfill(cls === expectedClass);
        });

        return deferred.promise;
    };

    //icon in text field: green tick or red x
    this.isIconCorrect = function(field, icon){
    var deferred = protractor.promise.defer();
        getElementClasses(field).then(function(icoClasses){
            switch(icon){
                case "x":
                    deferred.fulfill(stringContain(icoClasses, "text-danger") && stringContain(icoClasses, "fa-times"));
                    break;
                case "tick":
                    deferred.fulfill(stringContain(icoClasses, "text-success") && stringContain(icoClasses, "fa-check"));
                    break;
                default:
                    deferred.reject("unknown icon '" + icon + "'");
                    break;
            }
        });

        return deferred.promise;
    };

    this.getPassword = function(long){
        var pass = "";
        for(var i = 0; i < long; i++){
            pass += "a";
        }

        return pass;
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

var checkPopoverHeader = function (type, popover) {
    var deferred = protractor.promise.defer();
    var template = templateData[type];

    if(!popover.isPresent() || !templateData[type]){
        deferred.reject("no popover or template for " + type);
    }

    popover.element(by.tagName('h4')).getText().then(function (value) {
        deferred.fulfill(template.header === value);
    });

    return deferred.promise;
};

var checkPopoverHints = function(type, popover){
    var deferred = protractor.promise.defer();
    var template = templateData[type];
    var liList = popover.all(by.tagName('li'));

    liList.count().then(function(value){
        if(value != template.hints.length){
            deferred.reject("hints list should be [" + template.hints +"]");
        };
    });


    liList.then(function(hints){
        var promiseLists = [];
        for(var i = 0; i < hints.length; i++){
            promiseLists.push(hints[i].getText());
        }

        return protractor.promise.all(promiseLists).then(function(list){
            for(var i = 0; i < list.length; i++){
                if(template.hints.indexOf(list[i]) == -1){
                    deferred.reject("no template for hint " + list[i]);
                }
            }
            deferred.fulfill(true);
        });
    });
    return deferred.promise;
};

var stringContain = function(str, check){
    return str.indexOf(check) !== -1;
};

var getElementClasses = function(field){
    var deferred = protractor.promise.defer();
    var wrapper = field.getWebElement();

    //TODO move element finder outside
    wrapper.getDriver().findElement(by.className("validity-mark")).findElement(by.tagName('span')).getAttribute('class').then(function(classes){
        console.log("classes ", classes);
        deferred.fulfill(classes);
    });

    return deferred.promise;
}

module.exports = RegistrationPage;