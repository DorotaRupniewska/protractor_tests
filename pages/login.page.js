'use strict';

var LoginPage = function(){
	browser.get('https://webapp.sf-dev1.com/de-de/login');
};

LoginPage.prototype = Object.create({},{
	userName: 		{ get: function(){ return element(by.model('username'));}},
	password: 		{ get: function(){ return element(by.model('password'));}},
	loginButton: 	{ get: function(){ return element(by.className('btn-login'));}},

	login: { value: function(username, password){
		this.userName.sendKeys(username);
		this.password.sendKeys(password);
		this.loginButton.click();
	}}
});

module.exports = LoginPage;