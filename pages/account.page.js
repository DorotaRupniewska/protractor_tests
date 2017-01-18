'use strict';

var AccountPage = function(){
    this.accountOverviewWrapper = element(by.className('account-overview')).all(by.className("item-wrapper"));

    this.errorBlock = element(by.className('alert-danger'));
    this.successBlock = element(by.className('alert-success'));
    //TODO check texts for error/success in each language version

    //change email
    this.changeEmailForm = element(by.className("account-edit-form"));
    this.changeEmailLink = this.accountOverviewWrapper.get(0).element(by.tagName('a'));
    this.userEmailField = this.changeEmailForm.element(by.model("vm.email"));
    this.userEmailConfirmField = this.changeEmailForm.element(by.model("vm.emailConfirm"));
    this.changeEmailBtn = this.changeEmailForm.element(by.css("[type='submit']"));
    this.changeEmailSpinnerIco = this.changeEmailForm.element(by.className("fa-spinner"));

    //change password
    this.changePasswordForm = element(by.className("password-edit-form"));
    this.changePasswordLink = this.accountOverviewWrapper.get(1).element(by.tagName('a'));
    this.currentPasswordField = this.changePasswordForm.element(by.model("vm.currentPassword"));
    this.newPasswordField = this.changePasswordForm.element(by.model("vm.newPassword"));
    this.newPasswordConfirmField = this.changePasswordForm.element(by.model("vm.passwordConfirm"));
    this.changePasswordBtn = this.changePasswordForm.element(by.css("[type='submit']"));
    this.changePasswordSpinnerIco = this.changePasswordForm.element(by.className("fa-spinner"));

    //methods
    this.fillInChangeEmailForm = function(email) {
        this.userEmailField.sendKeys("");
        this.userEmailField.sendKeys(email);
        this.userEmailConfirmField.sendKeys("");
        this.userEmailConfirmField.sendKeys(email);
    };

    this.fillInChangePasswordForm = function(currentPassword, newPassword) {
        this.currentPasswordField.sendKeys("");
        this.currentPasswordField.sendKeys(currentPassword);
        this.newPasswordField.sendKeys("");
        this.newPasswordField.sendKeys(newPassword);
        this.newPasswordConfirmField.sendKeys("");
        this.newPasswordConfirmField.sendKeys(newPassword);
    }

	this.go = function(){
        browser.get(browser.params.MAIN_URL_DEV + '/account/');
	};

};

module.exports = AccountPage;