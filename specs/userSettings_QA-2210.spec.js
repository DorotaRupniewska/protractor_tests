'use strict';

var LoginPage = require("../pages/login.page.js");
var AccountPage = require("../pages/account.page.js");
var MainPage = require("../pages/main.page.js");
var Common = require("../commons/common.js");
var common = new Common();

/** variables **/
var userName = "test.user+dev1@smartfrog.com";
var password = "Test123!!!";
var newUserEmail = "test.user+dev1+new@smartfrog.com";


describe("User setting page", function(){
    var loginPage, accountPage, mainPage;

    beforeAll(function(){
        loginPage = new LoginPage();
        accountPage = new AccountPage();
        mainPage = new MainPage();

        common.logout();
        loginPage.go();
    });

    afterAll(function() {
        common.logout();
    });


    it('should allow to access the "Mein Konto" / "My Account" page after login', function(){
        loginPage.fillInLoginForm(userName, password);
        browser.waitForAngular();
        loginPage.loginButton.isDisplayed().then(function() {
            loginPage.loginButton.click();
            browser.waitForAngular();
            mainPage.go();
            browser.waitForAngular();
            accountPage.go();
            browser.sleep(2000);
            expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + "/account/");
        });
    });

//--update his Email Address
    xit('should allow the user to change his email address', function() {
        accountPage.changeEmailLink.isDisplayed().then(function() {
            accountPage.changeEmailLink.click();
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + "/account/email");
            accountPage.fillInChangeEmailForm(newUserEmail);
            accountPage.changeEmailBtn.isDisplayed().then(function() {
                accountPage.changeEmailBtn.click();
                accountPage.changeEmailSpinnerIco.isDisplayed().then(function(isSpinnerVisible) {
                    if(!isSpinnerVisible){
                        expect(accountPage.successBlock.isDisplayed()).toBe(true, "success message should be displayed");
                        accountPage.fillInChangeEmailForm(userName);
                        accountPage.changeEmailBtn.click();
                        browser.waitForAngular();
                        browser.sleep(2000);
                        accountPage.changeEmailSpinnerIco.isDisplayed().then(function(isVisible){
                            if(!isVisible){
                                expect(accountPage.successBlock.isDisplayed()).toBe(true, "success message should be displayed");
                                browser.waitForAngular();
                                browser.sleep(2000);
                            }
                        });
                    }
                });
            });
        });
    });

//-- update his password
    xit('should allow the user to update his password', function() {
        accountPage.go();
        browser.waitForAngular();

        accountPage.changePasswordLink.isDisplayed().then(function() {
            accountPage.changePasswordLink.click();
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + "/account/password");
            accountPage.fillInChangePasswordForm(password, password);
            accountPage.changePasswordBtn.isDisplayed().then(function() {
                accountPage.changePasswordBtn.click();
                accountPage.changePasswordSpinnerIco.isDisplayed().then(function(isSpinnerVisible) {
                    if(!isSpinnerVisible){
                        expect(accountPage.successBlock.isDisplayed()).toBe(true, "success message should be displayed");
                    }
                });
            });
        });
    });

//-- update his Invoice Address
    it('should allow the user to update his invoice address', function() {
        accountPage.go();
        browser.waitForAngular();

        accountPage.changeInvoiceAddressLink.isDisplayed().then(function() {
            accountPage.changeInvoiceAddressLink.click();
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + "/account/invoice-address");
            accountPage.fillInChangeInvoiceAddressForm(false);
            accountPage.changeInvoiceAddressBtn.isDisplayed().then(function() {
                accountPage.changeInvoiceAddressBtn.click();
                accountPage.changeInvoiceAddressSuccessBlock.isDisplayed().then(function() {
                    browser.sleep(2000);
                    console.log("invoice address changed");
                })
            });
        });
    });

});






















