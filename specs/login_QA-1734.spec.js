'use strict';

var LoginPage = require("../pages/login.page.js");

/** variables **/
var userName = "test.user+dev1@smartfrog.com";
var password = "Test123!!!";

describe("Login Page", function(){
    var loginPage;

    beforeAll(function(){
        loginPage = new LoginPage();
        loginPage.go();
    });

    afterAll(function(){
        //logout
        element(by.className('btn-logout')).click();
        browser.waitForAngular();
    });

    it('should render login page', function(){
        expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL + '/login');
    });
    
    it('should login an user', function(){
        loginPage.login(userName, password);
        browser.waitForAngular();
        browser.refresh();
        expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL + "/");
    });
});