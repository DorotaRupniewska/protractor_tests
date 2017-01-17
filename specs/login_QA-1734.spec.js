'use strict';

var LoginPage = require("../pages/login.page.js");
var Common = require("../commons/common.js");
var MainPage = require("../pages/main.page.js");

var common = new Common();

/** variables **/
var userName = "test.user+dev1@smartfrog.com";
var password = "Test123!!!";

describe("Login Page", function(){
    var loginPage, mainPage;

    beforeAll(function(){
        common.logout();
        mainPage = new MainPage();
        loginPage = new LoginPage();
        loginPage.go();
    });

    afterAll(function(){
        common.logout();
    });

    it('should render login page', function(){
        expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + '/login');
    });
    
    it('should login an user', function(){
        loginPage.fillInLoginForm(userName, password);
        browser.waitForAngular();
        loginPage.loginButton.isDisplayed().then(function() {
            loginPage.loginButton.click();
            browser.waitForAngular();
            mainPage.go();
            browser.waitForAngular();
            browser.sleep(2000);
            expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + "/");
        });
    });
});