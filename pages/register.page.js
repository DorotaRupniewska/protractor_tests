'use strict';

var Common = require("../commons/common.js");
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
    var common = new Common();
	// TODO stage env as default variable
	// browser.get('https://webapp.sf-dev1.com/de-de/register');
    this.registerForm  = element(by.className("register-panel-container"));

    this.emailField = element(by.model("vm.email"));
    this.emailRepeatField = element(by.model("vm.email2"));
    this.passwordField = element(by.model("vm.password"));
    this.countrySelect = element(by.model("vm.country"));

    this.passwordPopover = element(by.className("password-group")).element(by.className("popover"));
    this.emailPopover = element(by.name("registerForm")).all(by.className("form-group")).get(0);
    this.email2Popover = element(by.name("registerForm")).all(by.className("form-group")).get(1);

    this.errorBlock = element(by.className("alert"));

    this.popover = {
        "password": {
            template: this.passwordPopover,
            passwordHint: this.passwordPopover.element(by.className("label"))
        },
        "email": {
            template: this.emailPopover,
            passwordHint: this.emailPopover.element(by.className("label"))
        },
        "email2": {
            template: this.email2Popover,
            passwordHint: this.email2Popover.element(by.className("label"))
        }
    }
    //TODO add name tag
    this.termsOfUseLink = element(by.linkText("Nutzungsbedingungen"));
    this.privacyPolicyLink = element(by.linkText("Datenschutzrichtlinie"));
    this.cookiesLink = element(by.linkText("Richtlinien zur Verwendung von Cookies"));

    // this.registerButton = element(by.buttonText("Jetzt registrieren"));
    this.registerButton = element(by.css("button.btn-lg.btn-secondary"));

    //methods
    this.isPopoverCorrect = function(type){
        var popover = this.popover[type];
        return protractor.promise.all([checkPopoverHeader(type, popover.template), checkPopoverHints(type, popover.template)]).then(function(params){
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
    this.isHintClassCorrect = function(index, expectedClass, type){
        var deferred = protractor.promise.defer();
        this.popover[type].template.all(by.tagName('li')).get(index - 1).getAttribute("class").then(function(cls){
            deferred.fulfill(cls === expectedClass);
        });

        return deferred.promise;
    };

    //icon in text field: green tick or red x
    this.isIconCorrect = function (field, icon) {
        var deferred = protractor.promise.defer();
        var wrapper = field.getWebElement();

        getElementClasses(wrapper.getDriver().findElement(by.className("validity-mark")).findElement(by.tagName('span'))).then(function (icoClasses) {
            switch (icon) {
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

    this.getRandomPassword = function(long){
        var pass = "";
        for(var i = 0; i < long; i++){
            pass += "a";
        }

        return pass;
    };

    /**
     * Check if there is a 'How strong is your password' displayed correctly inside popover
     * @param expectedHint - could be one of:
     *  - 'very_weak'               - red
     *  - 'weak'                    - light orange
     *  - 'average'                 - orange
     *  - 'strong' or 'very_strong' - green (marked with the same color)
     */
    this.isStrongPasswordHintCorrect = function(expectedHint){
        if(!expectedHint){
            return false;
        }else{
            var deferred = protractor.promise.defer();
            getElementClasses(this.popover["password"].passwordHint).then(function(classes){
                switch(expectedHint){
                    case "very_weak":
                        deferred.fulfill(stringContain(classes, "label-danger"));
                        break;
                    case "weak":
                        deferred.fulfill(stringContain(classes, "label-warning"));
                        break;
                    case "average":
                        deferred.fulfill(stringContain(classes, "label-primary"));
                        break;
                    case "strong":
                    case "very_strong":
                        deferred.fulfill(stringContain(classes, "label-success"));
                        break;
                    default:
                        deferred.reject("unknown password strength name " + expectedHint);
                }
            });
            return deferred.promise;
        }
    };

    this.fillInRegisterFields = function(email, email2, password, country){
        var deferred = protractor.promise.defer();
        this.countrySelect.sendKeys(country);
        protractor.promise.all([
            common.setField(this.emailField, email),
            common.setField(this.emailRepeatField, email2),
            common.setField(this.passwordField, password)
        ]).then(function(){
            deferred.fulfill();
        }, function(err) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    this.go = function(langCode){
        var langCode = langCode || null;
        if(langCode){
            browser.get(browser.params["MAIN_URL_DEV_" + langCode] + '/register');
        }else{
            browser.get(browser.params.MAIN_URL_DEV + '/register');
        }
    }
};

var checkPopoverHeader = function (type, popover) {
    var deferred = protractor.promise.defer();
    var template = templateData[type];

    if(!popover.isDisplayed() || !templateData[type]){
        console.log("//-- no popover or template for " + type);
        return deferred.reject("no popover or template for " + type);
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

    field.getAttribute('class').then(function(classes){
        // console.log("classes ", classes);
        deferred.fulfill(classes);
    });

    return deferred.promise;
};

module.exports = RegistrationPage;