'use strict';

/**
 *  german version for desktop
 */
var MainPage = function() {

    this.bundleWrapper = element(by.className("products-container"));
    this.surveillanceBundle = this.bundleWrapper.all(by.repeater("product in vm.productsList")).get(0);
    this.cameraPackageBundle = this.bundleWrapper.all(by.repeater("product in vm.productsList")).get(1);

    //login
    this.headerLoginWrapper = element(by.className("login-form"));
    this.userNameField = this.headerLoginWrapper.element(by.model("username"));
    this.userPasswordField = this.headerLoginWrapper.element(by.model("password"));
    this.loginButton = this.headerLoginWrapper.element(by.className("login-btn"));
    this.loginStatus = element(by.className("login-status")).element(by.className("tx-frog-userhandling"));

    //logout
    this.logoutButton = element(by.className("logout")).element(by.tagName("a"));

    //cart
    this.addToCartButton = this.surveillanceBundle.element(by.tagName("button"));
    this.cartWrapper = element(by.className("cart"));
    this.goToPayementButton = this.cartWrapper.element(by.className("btn-to-payment"));
    this.loginPageWrapper = element(by.className("login"));
    this.shopUserName = this.loginPageWrapper.element(by.model("username"));


    //methods
    this.go = function(){
        browser.get(browser.params.MAIN_URL_SHOP + "/products");
    };

    this.fillInLoginForm = function(userName, password){
        this.userNameField.sendKeys("");
        this.userPasswordField.sendKeys("");

        this.userNameField.sendKeys(userName);
        this.userPasswordField.sendKeys(password);
    };
};

module.exports = MainPage;