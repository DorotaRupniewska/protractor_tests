'use strict';

//-- correct slider template
var slidersTempaltes = {
    "slide_1": {
        "background": 'url("https://webapp.sf-dev1.com/7cef6b9ffab56e1e8838b7f4adf06bb8.jpg")',
        "descriptions": {
            "text-rec-live": {
                "DE": "LIVE aufnehmen",
                "GB": "Record LIVE"
            },
            "text-sf-camera": {
                "DE": "Smartfrog Cam",
                "GB": "Smartfrog Cam"
            },
            "text-watch-any": {
                "DE": "Unterwegs ansehen",
                "GB": "Watch anywhere"
            },
            "text-sp": {
                "DE": "Smartphone",
                "GB": "Smartphone"
            },
            "text-tablet": {
                "DE": "Tablet",
                "GB": "Tablet"
            },
            "text-three": {
                "DE": "3",
                "GB": "3"
            },
            "text-view-opt": {
                "DE": "Ansichtsoptionen",
                "GB": "viewing options"
            },
            "text-notebook": {
                "DE": "Notebook",
                "GB": "Notebook"
            }
        }
    },
    "slide_2": {
        "background": 'url("https://webapp.sf-dev1.com/86ae4d957885c6639a638645d7c564f6.jpg")',
        "header": {
            "key": "welcome_wizard.monitor._header",
            "value": {
                "DE": "Schau LIVE von überall was gerade Zuhause passiert",
                "GB": "Keep an eye on things at home"
            }
        }
    },
    "slide_3": {
        "background": 'url("https://webapp.sf-dev1.com/b71fc9e767b0ecf193ee7a6c382daf53.jpg")',
        "header": {
            "key": "welcome_wizard.pets._header",
            "value": {
                "DE": "Schau von überall was dein Haustier macht",
                "GB": "See what your pets are doing"
            }
        }
    },
    "slide_4": {
        "background": 'url("https://webapp.sf-dev1.com/1e4543da6eae76369b7afa3441d13b93.jpg")',
        "header": {
            "key": "welcome_wizard.children._header",
            "value": {
                "DE": "Schau rund um die Uhr, ob es deinem Kind gut geht",
                "GB": "Keep your children in sight"
            }
        }
    },
    "slide_5": {
        "background": 'url("https://webapp.sf-dev1.com/906b58c368dab93181631620b0fe2c59.jpg")',
        "header": {
            "key": "welcome_wizard.grandparents._header",
            "value": {
                "DE": "Schau jederzeit ob es deinen Großeltern gut geht",
                "GB": "Keep in touch with the grandparents"
            }
        }
    },
    "slide_6": {
        "background": 'url("https://webapp.sf-dev1.com/85709e71164339a11f0abc55e6c49a6e.jpg")',
        "header": {
            "key": "welcome_wizard.safety._header",
            "value": {
                "DE": "Schütze deine Familie ganz einfach mit Smartfrog",
                "GB": "The easiest way to protect your home and family"
            }
        }
    }
};

var WelcomeWizardHelper = function() {
    this.welcomeWizardWrapper = element(by.className("instructions-modal"));
    this.carouselControlLeft = this.welcomeWizardWrapper.element(by.className("glyphicon-chevron-left"));
    this.carouselControlRight = this.welcomeWizardWrapper.element(by.className("glyphicon-chevron-right"));
    this.carouselIndicators = this.welcomeWizardWrapper.element(by.className("carousel-indicators"));
    this.slidesIndiactors = this.welcomeWizardWrapper.all(by.repeater("slide in slides"));

    //template
    this.modalContentWrapper = this.welcomeWizardWrapper.element(by.className("modal-content"));
    this.modalBody = this.modalContentWrapper.element(by.id("welcome-carousel"));
    this.modalFooter = this.modalContentWrapper.element(by.className("modal-footer"));
    this.modalCloseBtn = this.modalContentWrapper.element(by.className("close-btn"));
    this.tryItBtn = this.modalFooter.element(by.className("try-it-now-button"));
    // this.cameraImage = this.modalContentWrapper.element(by.className("camera-without-text"));

    //methods

    //is slide with given number (nr: 1 - 6) displayed as expected
    this.isSlideCorrect = function(nr, countryCode) {
        var deferred = protractor.promise.defer();
        var countryCode = countryCode || 'DE';
        if(nr < 1 || nr > 6){
            deferred.reject("no slide with numebr " + nr);
        }else{
            protractor.promise.all([
                isSlideBackgroundCorrect(nr, this.modalBody),
                isSlideBodyCorrect(nr, this.modalBody, countryCode)
            ]).then(function(list) {
                // console.log("list ", list);
                list.map(function(item) {
                    if(!item.isCorrect){
                        return deferred.reject(item.errorMsg);
                    }
                });
                deferred.fulfill(true);
            }, function(err) {
                deferred.reject("error ", err);
            });
        }

        return deferred.promise;
    };

    this.isCameraImageDisplayed = function(nr) {
        return this.modalBody.element(by.className("step-"+ nr +"-bg")).element(by.className("camera-without-text")).isDisplayed();
    }
};

var isSlideBackgroundCorrect = function(nr, slideWrapper) {
    return slideWrapper.element(by.className("step-"+ nr +"-bg")).getCssValue("background-image").then(function(bg) {
        var errorMsg = "",
            templateBg = slidersTempaltes["slide_" + nr].background;
        if(bg !== templateBg){
            errorMsg = "incorrect background for slide " + nr;
        }
        return {
            isCorrect: bg === templateBg,
            errorMsg: errorMsg
        };
    })
};

var isSlideBodyCorrect = function(nr, slideBody, countryCode) {
    //as for now only first slide has different template
    if(nr === 1){
        return isSlide1TemplateCorrect(slideBody, countryCode)

    }else{
        return isSlideTemplateCorrect(nr, slideBody, countryCode);
    }
};

var isSlide1TemplateCorrect = function(slideBody, countryCode) {
    var descriptionsTempalte = slidersTempaltes["slide_1"].descriptions;
    var promisesList = [];

    for(var key in descriptionsTempalte){
        promisesList.push(getTextForElement(key, slideBody, countryCode));
    }

    return protractor.promise.all(promisesList).then(function() {
        return {
            isCorrect: true,
            errorMsg: ""
        }
    }, function(err) {
        return {
            isCorrect: false,
            errorMsg: "[slide 1] " + err
        }
    });
};

var getTextForElement = function(key, slideBody, countryCode){
    var deferred = protractor.promise.defer();
    var descriptionsTemplate = slidersTempaltes["slide_1"].descriptions;

    return slideBody.element(by.className(key)).getText().then(function(text) {
        if(text !== descriptionsTemplate[key][countryCode]){
            return deferred.reject("incorect text for " + descriptionsTemplate[key][countryCode]);
        }
        deferred.fulfill(true);
        return deferred.promise;
    });
};

var isSlideTemplateCorrect = function(nr, slideBody, countryCode) {
    var header = slideBody.element(by.className("step-"+ nr +"-bg")).element(by.tagName("h1")),
        correctHeaderTranslateKey = slidersTempaltes["slide_" + nr].header.value[countryCode],
        isCorrect = true, errorMsg = "";

    return header.getText().then(function(text) {
        var text = text.replace(/\n/g,' ');
        if(correctHeaderTranslateKey !== text){
            isCorrect = false;
            errorMsg = "incorrect header text "+ text +", for slide " + nr;
        }
        return {
            isCorrect: isCorrect,
            errorMsg: errorMsg
        }
    });

};
module.exports = WelcomeWizardHelper;