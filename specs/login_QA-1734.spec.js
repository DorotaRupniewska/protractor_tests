'use strict';

var LoginPage = require("../pages/login.page.js");

describe("Login Page", function(){
    var loginPage;

    beforeAll(function(){
        loginPage = new LoginPage();
    });

    it('should render login page', function(){
        loginPage.go();
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL + '/login');
    });
});