'use strict';

var Common = require("../commons/common.js");

var LoginPage = function(){
    var common = new Common();

    this.pass = element(by.model('password'));
    this._userName = element(by.model('username'));
    this.loginButton = element(by.className('btn-login'));

    this.fillInLoginForm = function(username, password){
        var deferred = protractor.promise.defer();
        protractor.promise.all([
            common.setField(this._userName, username),
            common.setField(this.pass, password)
        ]).then(function(){
            deferred.fulfill();
        });

        return deferred.promise;
    };

    this.go = function(){
        browser.get(browser.params.MAIN_URL_DEV + '/login');
    }
};

module.exports = LoginPage;