'use strict';

var RegistrationPage = require("../pages/register.page.js");
var MainPage = require("../pages/main.page.js");
var Common = require("../commons/common.js");
var WelcomeWizadrHelper = require("../commons/welcomeWizard.helper.js");

var common = new Common();


describe('Welcome wizard German language version', function(){
    var registerPage, mainPage, welcomeWizardHelper;

	beforeAll(function(){
        registerPage = new RegistrationPage();
        mainPage = new MainPage();
        welcomeWizardHelper = new WelcomeWizadrHelper();

        common.setEmail();
        mainPage.go();
        browser.waitForAngular();
        common.logout();
	});

    afterAll(function(){
        welcomeWizardHelper.welcomeWizardWrapper.isDisplayed().then(function() {
            welcomeWizardHelper.tryItBtn.click();
            browser.sleep(1000);
            common.logout();
        }, function() {
            common.logout();
        });
    });

//-- After the user logged in within the WebApp for the first time a 'Welcome Wizard', consisting of six components, is appearing
    it('should be visible after first login', function() {
        registerPage.go();
        expect(registerPage.registerForm.isDisplayed()).toBe(true, "register form not displayed");
        registerPage.fillInRegisterFields(common.email, common.email, common.password, common.countryCode).then(function() {
            registerPage.registerButton.isEnabled().then(function(){
                registerPage.registerButton.click();
                common.errorBlock.isDisplayed().then(function() {
                    common.errorBlock.getText().then(function(err) {
                        console.log("//-- error: ", err);
                    });
                }, function() {
                    browser.sleep(3000);
                    expect(welcomeWizardHelper.welcomeWizardWrapper.isDisplayed()).toBeTruthy();
                    expect(welcomeWizardHelper.carouselControlLeft.isDisplayed()).toBeTruthy();
                    expect(welcomeWizardHelper.carouselControlRight.isDisplayed()).toBeTruthy();
                    expect(welcomeWizardHelper.carouselIndicators.isDisplayed()).toBeTruthy();
                });
            }, function() {
                console.log("//-- welcomeWizard register button not enabled");
            });
        }, function(err) {
            console.log("//-- fillInRegisterFields failed: ", err);
        });

    });

    it('should consisting of six components', function() {
        welcomeWizardHelper.slidesIndiactors.count().then(function(count) {
            expect(count).toEqual(6);
        });
    });

//-- The user can go for- and backward with the arrows within the wizard (slide show)
    it('should have slideshow arrows working as expected', function() {
        welcomeWizardHelper.slidesIndiactors.get(0).click();
        welcomeWizardHelper.carouselControlRight.click();
        welcomeWizardHelper.slidesIndiactors.get(1).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlRight.click();
        welcomeWizardHelper.slidesIndiactors.get(2).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlRight.click();
        welcomeWizardHelper.slidesIndiactors.get(3).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlRight.click();
        welcomeWizardHelper.slidesIndiactors.get(4).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlRight.click();
        welcomeWizardHelper.slidesIndiactors.get(5).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlLeft.click();
        welcomeWizardHelper.slidesIndiactors.get(4).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlLeft.click();
        welcomeWizardHelper.slidesIndiactors.get(3).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlLeft.click();
        welcomeWizardHelper.slidesIndiactors.get(2).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlLeft.click();
        welcomeWizardHelper.slidesIndiactors.get(1).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlLeft.click();
        welcomeWizardHelper.slidesIndiactors.get(0).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });
    });

//-- The following six components/ tiles for the welcome wizard need to be implemented (design, wording, etc. needs to look exactly the same as shown within the screenshots)
    it('should have template implemented exactly as designed', function(){
        expect(welcomeWizardHelper.modalBody.isDisplayed()).toBeTruthy();
        expect(welcomeWizardHelper.modalFooter.isDisplayed()).toBeTruthy();
        expect(welcomeWizardHelper.modalCloseBtn.isDisplayed()).toBeTruthy();
        expect(welcomeWizardHelper.tryItBtn.isDisplayed()).toBeTruthy();
        expect(welcomeWizardHelper.tryItBtn.getCssValue("background-color")).toEqual("rgba(49, 128, 202, 1)");
    });

    it('should have first slide implemented as designed', function() {
        expect(welcomeWizardHelper.isSlideCorrect(1, "DE")).toBeTruthy();
    });

    it('should have all slide implemented as designed', function() {
        welcomeWizardHelper.slidesIndiactors.get(1).click();
        expect(welcomeWizardHelper.isSlideCorrect(2, "DE")).toBeTruthy();
        expect(welcomeWizardHelper.isCameraImageDisplayed(2)).toBe(true, "no camera image on slide 2");
        expect(welcomeWizardHelper.modalCloseBtn.isDisplayed()).toBe(true, "no close modal icon on slide 2");

        welcomeWizardHelper.slidesIndiactors.get(2).click();
        expect(welcomeWizardHelper.isSlideCorrect(3, "DE")).toBeTruthy();
        expect(welcomeWizardHelper.isCameraImageDisplayed(3)).toBe(true, "no camera image on slide 2");
        expect(welcomeWizardHelper.modalCloseBtn.isDisplayed()).toBe(true, "no close modal icon on slide 2");

        welcomeWizardHelper.slidesIndiactors.get(3).click();
        expect(welcomeWizardHelper.isSlideCorrect(4, "DE")).toBeTruthy();
        expect(welcomeWizardHelper.isCameraImageDisplayed(4)).toBe(true, "no camera image on slide 2");
        expect(welcomeWizardHelper.modalCloseBtn.isDisplayed()).toBe(true, "no close modal icon on slide 2");

        welcomeWizardHelper.slidesIndiactors.get(4).click();
        expect(welcomeWizardHelper.isSlideCorrect(5, "DE")).toBeTruthy();
        expect(welcomeWizardHelper.isCameraImageDisplayed(5)).toBe(true, "no camera image on slide 2");
        expect(welcomeWizardHelper.modalCloseBtn.isDisplayed()).toBe(true, "no close modal icon on slide 2");

        welcomeWizardHelper.slidesIndiactors.get(5).click();
        expect(welcomeWizardHelper.isSlideCorrect(6, "DE")).toBeTruthy();
        expect(welcomeWizardHelper.isCameraImageDisplayed(6)).toBe(true, "no camera image on slide 2");
        expect(welcomeWizardHelper.modalCloseBtn.isDisplayed()).toBe(true, "no close modal icon on slide 2");
    });

});

describe('Welcome wizard English language version', function() {
    var registerPage, mainPage, welcomeWizardHelper;

    beforeAll(function() {
        registerPage = new RegistrationPage();
        mainPage = new MainPage();
        welcomeWizardHelper = new WelcomeWizadrHelper();

        common.setEmail();
        mainPage.go();
        browser.waitForAngular();
        common.logout();
    });

    afterAll(function() {
        welcomeWizardHelper.welcomeWizardWrapper.isDisplayed().then(function() {
            welcomeWizardHelper.tryItBtn.click();
            browser.sleep(1000);
            common.logout();
        }, function() {
            common.logout();
        });
    });

//-- After the user logged in within the WebApp for the first time a 'Welcome Wizard', consisting of six components, is appearing
    it('should be visible after first login', function() {
        //   !!! can't register with English language version !!!
        //  TODO change is fixed
        registerPage.go("GB");
        expect(registerPage.registerForm.isDisplayed()).toBe(true, "register form not displayed");
        registerPage.fillInRegisterFields(common.email, common.email, common.password, "GB").then(function() {
            registerPage.registerButton.isEnabled().then(function(){
                registerPage.registerButton.click();
                common.errorBlock.isDisplayed().then(function() {
                    common.errorBlock.getText().then(function(err) {
                        console.log("//-- error: ", err);
                    });
                }, function() {
                    browser.sleep(3000);
                    expect(welcomeWizardHelper.welcomeWizardWrapper.isDisplayed()).toBe(true, "");
                    expect(welcomeWizardHelper.carouselControlLeft.isDisplayed()).toBe(true, "");
                    expect(welcomeWizardHelper.carouselControlRight.isDisplayed()).toBe(true, "");
                    expect(welcomeWizardHelper.carouselIndicators.isDisplayed()).toBe(true, "");
                });
            }, function() {
                console.log("//-- welcomeWizard register button not enabled");
            });
        }, function(err) {
            console.log("//-- fillInRegisterFields failed: ", err);
        });

    });

    it('should consisting of six components', function() {
        welcomeWizardHelper.slidesIndiactors.count().then(function(count) {
            expect(count).toEqual(6);
        });
    });

//-- The user can go for- and backward with the arrows within the wizard (slide show)
    it('should have slideshow arrows working as expected', function() {
        welcomeWizardHelper.slidesIndiactors.get(0).click();
        welcomeWizardHelper.carouselControlRight.click();
        welcomeWizardHelper.slidesIndiactors.get(1).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlRight.click();
        welcomeWizardHelper.slidesIndiactors.get(2).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlRight.click();
        welcomeWizardHelper.slidesIndiactors.get(3).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlRight.click();
        welcomeWizardHelper.slidesIndiactors.get(4).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlRight.click();
        welcomeWizardHelper.slidesIndiactors.get(5).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlLeft.click();
        welcomeWizardHelper.slidesIndiactors.get(4).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlLeft.click();
        welcomeWizardHelper.slidesIndiactors.get(3).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlLeft.click();
        welcomeWizardHelper.slidesIndiactors.get(2).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlLeft.click();
        welcomeWizardHelper.slidesIndiactors.get(1).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });

        welcomeWizardHelper.carouselControlLeft.click();
        welcomeWizardHelper.slidesIndiactors.get(0).getAttribute("class").then(function(classes) {
            expect(classes.indexOf('active')).toBeGreaterThan(-1);
        });
    });

//-- The following six components/ tiles for the welcome wizard need to be implemented (design, wording, etc. needs to look exactly the same as shown within the screenshots)
    it('should have template implemented exactly as designed', function(){
        expect(welcomeWizardHelper.modalBody.isDisplayed()).toBe(true, "no modal body");
        expect(welcomeWizardHelper.modalFooter.isDisplayed()).toBe(true, "no modal footer");
        expect(welcomeWizardHelper.modalCloseBtn.isDisplayed()).toBe(true, "no close modal icon");
        expect(welcomeWizardHelper.tryItBtn.isDisplayed()).toBe(true, "no 'Try It' button");
        expect(welcomeWizardHelper.tryItBtn.getCssValue("background-color")).toEqual("rgba(49, 128, 202, 1)");
    });

    it('should have first slide implemented as designed', function() {
        welcomeWizardHelper.slidesIndiactors.get(0).click();
        expect(welcomeWizardHelper.isSlideCorrect(1, "GB")).toBeTruthy();
        expect(welcomeWizardHelper.modalCloseBtn.isDisplayed()).toBe(true, "no close modal icon on slide 1");
    });

    it('should have all slides implemented as designed', function() {
        welcomeWizardHelper.slidesIndiactors.get(1).click();
        expect(welcomeWizardHelper.isSlideCorrect(2, "GB")).toBeTruthy();
        expect(welcomeWizardHelper.isCameraImageDisplayed(2)).toBe(true, "no camera image on slide 2");
        expect(welcomeWizardHelper.modalCloseBtn.isDisplayed()).toBe(true, "no close modal icon on slide 2");

        welcomeWizardHelper.slidesIndiactors.get(2).click();
        expect(welcomeWizardHelper.isSlideCorrect(3, "GB")).toBeTruthy();
        expect(welcomeWizardHelper.isCameraImageDisplayed(3)).toBe(true, "no camera image on slide 3");
        expect(welcomeWizardHelper.modalCloseBtn.isDisplayed()).toBe(true, "no close modal icon on slide 3");

        welcomeWizardHelper.slidesIndiactors.get(3).click();
        expect(welcomeWizardHelper.isSlideCorrect(4, "GB")).toBeTruthy();
        expect(welcomeWizardHelper.isCameraImageDisplayed(4)).toBe(true, "no camera image on slide 4");
        expect(welcomeWizardHelper.modalCloseBtn.isDisplayed()).toBe(true, "no close modal icon on slide 4");

        welcomeWizardHelper.slidesIndiactors.get(4).click();
        expect(welcomeWizardHelper.isSlideCorrect(5, "GB")).toBeTruthy();
        expect(welcomeWizardHelper.isCameraImageDisplayed(5)).toBe(true, "no camera image on slide 5");
        expect(welcomeWizardHelper.modalCloseBtn.isDisplayed()).toBe(true, "no close modal icon on slide 5");

        welcomeWizardHelper.slidesIndiactors.get(5).click();
        expect(welcomeWizardHelper.isSlideCorrect(6, "GB")).toBeTruthy();
        expect(welcomeWizardHelper.isCameraImageDisplayed(6)).toBe(true, "no camera image on slide 6");
        expect(welcomeWizardHelper.modalCloseBtn.isDisplayed()).toBe(true, "no close modal icon on slide 6");
    });

});