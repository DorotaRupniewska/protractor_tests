'use strict';

var LoginPage = function(){
    this.userName = element(by.model('username'));
    this.pass = element(by.model('password'));
    this.loginButton = element(by.className('btn-login'));

    this.login = function(username, password){
        this.userName.sendKeys(username);
        this.pass.sendKeys(password);
        this.loginButton.click();
    };

    this.go = function(){
        browser.get(browser.params.MAIN_URL_DEV + '/login');
    }
};

module.exports = LoginPage;