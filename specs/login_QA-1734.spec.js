'use strict';

var LoginPage = require("../pages/login.page.js");
var MainPage = require("../pages/main.page.js");

/** variables **/
var userName = "test.user+dev1@smartfrog.com";
var password = "Test123!!!";

describe("Login Page", function(){
    var loginPage, mainPage;

    beforeAll(function(){
        loginPage = new LoginPage();
    });

    beforeEach(function(){
        loginPage.go();
    });

    afterAll(function(){
        //logout
        var btnLogout = element(by.className('btn-logout'));
        btnLogout.isDisplayed().then(function() {
            element(by.className('btn-logout')).click();
            browser.waitForAngular();
            console.log(" --- logged out --- ");
        }, function() {
            console.log(" no logged btn button ");
        });
    });

    it('should render login page', function(){
        expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + '/login');
    });
    
    it('should login an user', function(){
        mainPage = new MainPage();
        loginPage.login(userName, password);
        browser.waitForAngular();
        mainPage.go();
        expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + "/");
    });
});