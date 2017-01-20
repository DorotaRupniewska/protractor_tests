'use strict';

var MainPage = require('../../pages/shop/main.page.js');

/** VARIABLES **/
var userName = "test.user+dev1@smartfrog.com";
var password = "Test123!!!";

describe("Shop app DE desktop version", function() {
    var mainPage;

    beforeAll(function() {
        mainPage = new MainPage();

        mainPage.go();
        browser.driver.manage().window().maximize();
        browser.waitForAngular();
    });

    it('should render shop page as design', function() {
        browser.sleep(2000);
        expect(mainPage.surveillanceBundle.isDisplayed()).toBe(true, "Survaillence bundle box is not displayed");
        expect(mainPage.cameraPackageBundle.isDisplayed()).toBe(true, "Camera package box is not displayed");
    });

    it("should login user from main page", function() {
        mainPage.fillInLoginForm(userName, password);
        mainPage.loginButton.click();
        browser.waitForAngular();
        expect(mainPage.loginStatus.getText()).toEqual(userName);
    });

    it("should logout user from shop", function() {
        mainPage.logoutButton.isDisplayed().then(function() {
            mainPage.logoutButton.click();
            browser.sleep(1000);
            mainPage.go();
            browser.waitForAngular();
            expect(mainPage.loginButton.isDisplayed()).toBe(true, "logout failed");
        });
    });

    it('should allow to add an item to the cart and then login as existing user', function() {
        mainPage.go();
        browser.waitForAngular();

        mainPage.surveillanceBundle.isDisplayed().then(function() {
            mainPage.addToCartButton.isDisplayed().then(function() {
                mainPage.addToCartButton.click();
                browser.waitForAngular();
                expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_SHOP + "/cart");
                mainPage.goToPayementButton.isDisplayed().then(function(){
                    mainPage.goToPayementButton.click();
                    browser.waitForAngular();
                    expect(mainPage.loginPageWrapper.isDisplayed()).toBe(true, "no redirection to shop login page");

                });
            });
        });
    });
});