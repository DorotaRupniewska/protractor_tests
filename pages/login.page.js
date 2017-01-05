'use strict';

var LoginPage = function(){
    this.userName = element(by.model('username'));
    this.password = element(by.model('password'));
    this.loginButton = element(by.className('btn-login'));

    this.login = function(username, password){
        this.userName.sendKeys(username);
        this.password.sendKeys(password);
        this.loginButton.click();
    };

    this.go = function(){
        browser.get('https://webapp.sf-dev1.com/de-de/login');
    }
};

module.exports = LoginPage;