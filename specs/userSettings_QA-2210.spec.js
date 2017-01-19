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
    it('should allow the user to change his email address', function() {
        accountPage.changeEmailLink.isDisplayed().then(function() {
            accountPage.changeEmailLink.click();
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + "/account/email");
            accountPage.fillInChangeEmailForm(newUserEmail);
            accountPage.changeEmailBtn.isDisplayed().then(function() {
                accountPage.changeEmailBtn.click();
                browser.sleep(2000);
                accountPage.changeEmailSpinnerIco.isDisplayed().then(function(isSpinnerVisible) {
                    if(!isSpinnerVisible){
                        expect(accountPage.successBlock.isDisplayed()).toBe(true, "success message should be displayed");
                    }
                });
            });
        });
    });

    it('should change user email to previous one', function() {
        accountPage.go();
        browser.waitForAngular();

        accountPage.changeEmailLink.isDisplayed().then(function() {
            accountPage.changeEmailLink.click();
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + "/account/email");
            accountPage.fillInChangeEmailForm(userName);
            accountPage.changeEmailBtn.click();
            browser.waitForAngular();
            browser.sleep(2000);
            accountPage.changeEmailSpinnerIco.isDisplayed().then(function(isVisible){
                if(!isVisible){
                    expect(accountPage.successBlock.isDisplayed()).toBe(true, "success message should be displayed");
                    browser.waitForAngular();
                }
            });
        });

    });

//-- update his password
    //TODO terminated session after change password needs to be handle first
    // current info: 'For security purposes we have terminated your session, due to the recent inactivity. Please enter your password again.
    xit('should allow the user to update his password', function() {
        accountPage.go();
        browser.waitForAngular();

        accountPage.changePasswordLink.isDisplayed().then(function() {
            accountPage.changePasswordLink.click();
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + "/account/password");
            accountPage.fillInChangePasswordForm(password);
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
            accountPage.fillInChangeInvoiceAddressForm(true);
            accountPage.changeInvoiceAddressBtn.isDisplayed().then(function() {
                accountPage.changeInvoiceAddressBtn.click();
                browser.waitForAngular();
                accountPage.changeInvoiceAddressSuccessBlock.isDisplayed().then(function(isSuccess) {
                    browser.sleep(2000);
                    expect(isSuccess).toBe(true, "error occurs while saving invoice address");

                    accountPage.go();
                    browser.waitForAngular();
                    accountPage.changeInvoiceAddressLink.isDisplayed().then(function() {
                        accountPage.changeInvoiceAddressLink.click();
                        browser.waitForAngular();
                        accountPage.fillInChangeInvoiceAddressForm(false);
                        accountPage.changeInvoiceAddressBtn.isDisplayed().then(function() {
                            accountPage.changeInvoiceAddressBtn.click();
                            browser.waitForAngular();
                            accountPage.changeInvoiceAddressSuccessBlock.isDisplayed().then(function(isSuccess) {
                                browser.sleep(2000);
                                expect(isSuccess).toBe(true, "error occurs while saving invoice address second time");
                            });
                        });
                    });
                })
            });
        });
    });

//-- disable Account - open popup
    it("should allow the user to disable his account", function() {
        accountPage.go();
        browser.waitForAngular();
        accountPage.disableAccountLink.isDisplayed().then(function() {
            accountPage.disableAccountLink.click();
            browser.sleep(2000);
            expect(accountPage.disableAccountPopup.isDisplayed()).toBe(true, "popup is not displayed");
            accountPage.disableAccountPopupCancelBtn.isDisplayed().then(function() {
                accountPage.disableAccountPopupCancelBtn.click();
                browser.sleep(2000);
                expect(accountPage.disableAccountLink.isDisplayed()).toBe(true, "'Disable account' link is not displayed");
                browser.sleep(2000);
            });
        });
    });

//-- subscrible/unsubscribe to Newsletter
    it("should allow user to change the status of his newsletter subscription", function() {
        accountPage.go();
        browser.waitForAngular();

        accountPage.changeNewsletterSubscriptionStatusLink.isDisplayed().then(function() {
            accountPage.changeNewsletterSubscriptionStatusLink.getText().then(function(newsletterStatus) {
                browser.sleep(2000);
                accountPage.changeNewsletterSubscriptionStatusLink.click();
                accountPage.changeNewsletterSubscriptionStatusLink.getText().then(function(changedStatus) {
                    browser.sleep(2000);
                    expect(accountPage.successBlock.isDisplayed()).toBe(true, "success message not displayed");
                    expect(newsletterStatus === changedStatus).toBe(false, "newsletter subscription status not changed");
                });
            });
        });
    });

//-- view all invoices, open a page with list of past invoices
    it("should allow the user to view all invoices", function() {
        accountPage.go();
        browser.waitForAngular();

        accountPage.invoicesLink.isDisplayed().then(function() {
            accountPage.invoicesLink.click();
            browser.waitForAngular();
            browser.sleep(2000);
            expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + "/account/invoices");
            expect(accountPage.invoicesList.count()).toBeGreaterThan(0);
        });
    });

//-- view the orders, open a page with a list of all orders
    it("should allow the user to view all orders", function() {
        accountPage.go();
        browser.waitForAngular();

        accountPage.ordersLink.isDisplayed().then(function() {
            accountPage.ordersLink.click();
            browser.waitForAngular();
            browser.sleep(2000);
            expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + "/account/orders");
            expect(accountPage.ordersList.count()).toBeGreaterThan(0);
        });
    });

});






















