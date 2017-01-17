'use strict';

var MainPage = require("../pages/main.page.js");

var Common = function(){
  this.seed = 'automation'+ Math.round(getCurrentTime());

//-- variables
  this.email = "test+" + this.seed +"@test.com";
  this.password = "Test123!!!";
  this.countryCode = "DE";

  this.errorBlock = element(by.className("alert"));

//-- methods

    //set before generate unique email
    this.setEmail = function(){
        var seed = Math.round(getCurrentTime());
        this.email = "test+automation" + seed +"@test.com";
        console.log("-- new unique email : " + this.email);
    };

    this.logout = function(){
        var btnLogout = element(by.className('btn-logout'));
        btnLogout.isDisplayed().then(function() {
            btnLogout.click();
            var mainPage = new MainPage();
            mainPage.go();
            browser.waitForAngular();
            // console.log(" --- logged out --- ");
        }, function() {
            // console.log(" --- no logged btn button --- ");
        });
    };

    //select language from header dropdown (currently DE, GB only)
    this.selectLanguage = function(langCode){
        var languageSelect = element(by.className('navbar-right')).element(by.css("button#single-button"));
        languageSelect.isDisplayed().then(function() {
            languageSelect.click();
            browser.waitForAngular();
            browser.sleep(2000);
            // console.log(" --- logged out --- ");
        }, function() {
            // console.log(" --- no logged btn button --- ");
        });
    };

    //clear field before set a given value
    this.setField = function(filed, value){
        filed.clear().then(function(){
            filed.sendKeys(value);
        });
    };

};

var getCurrentTime = function() {
    return new Date().getTime()/1000;
};

module.exports = Common;
