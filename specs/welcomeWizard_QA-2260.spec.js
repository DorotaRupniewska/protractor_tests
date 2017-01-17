'use strict';

var RegistrationPage = require("../pages/register.page.js");
var MainPage = require("../pages/main.page.js");
var Common = require("../commons/common.js");
var WelcomeWizadrHelper = require("../commons/welcomeWizard.helper.js");

var common = new Common();


describe('Welcome wizard', function(){
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

    //GERMAN
    describe("template in German version", function() {
        it('should have first slide implemented as designed', function() {
            expect(welcomeWizardHelper.isSlideCorrect(1, "DE")).toBeTruthy();
        });

        it('should have all slide implemented as designed', function() {
            // expect(welcomeWizardHelper.isSlideCorrect(2)).toBeTruthy();
            // expect(welcomeWizardHelper.isSlideCorrect(3)).toBeTruthy();
            // expect(welcomeWizardHelper.isSlideCorrect(4)).toBeTruthy();
            // expect(welcomeWizardHelper.isSlideCorrect(5)).toBeTruthy();
            // expect(welcomeWizardHelper.isSlideCorrect(6)).toBeTruthy();
        });
    });

});