'use strict';

var invoiceAddress = {
    "salutation": {
        "current": "Ms",
        "new": "Mr"
    },
    "firstname": {
        "current": "Test Test",
        "new": "Firstname"
    },
    "lastname": {
        "current": "Test 2",
        "new": "Lastname"
    },
    "company": {
        "current": "Smartfrog",
        "new": "Company name"
    },
    "street": {
        "current": "Mohrenstr.",
        "new": "Somestr."
    },
    "number": {
        "current": "34",
        "new": "123"
    },
    "zipcode": {
        "current": "10117",
        "new": "91056"
    },
    "city": {
        "current": "Berlin",
        "new": "Krakow"
    },
    "mobile": {
        "current": "",
        "new": "12-12-123"
    }
};

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

    //change invoice address
    this.changeInvoiceAddressForm = element(by.className("invoice-address-edit-form"));
    this.changeInvoiceAddressLink = this.accountOverviewWrapper.get(2).element(by.tagName('a'));
    this.invoiceSalutationField = this.changeInvoiceAddressForm.element(by.model("vm.address.salutation"));
    this.invoiceFirstNameField = this.changeInvoiceAddressForm.element(by.model("vm.address.firstName"));
    this.invoiceLastNameField = this.changeInvoiceAddressForm.element(by.model("vm.address.name"));
    this.invoiceCompanyField = this.changeInvoiceAddressForm.element(by.model("vm.address.companyName"));
    this.invoiceStreetField = this.changeInvoiceAddressForm.element(by.model("vm.address.street"));
    this.invoiceNumberField = this.changeInvoiceAddressForm.element(by.model("vm.address.houseNumber"));
    this.invoiceZipCodeField = this.changeInvoiceAddressForm.element(by.model("vm.address.zip"));
    this.invoiceCityField = this.changeInvoiceAddressForm.element(by.model("vm.address.city"));
    this.invoiceMobileField = this.changeInvoiceAddressForm.element(by.model("vm.address.mobilePhoneNumber"));

    this.changeInvoiceAddressBtn = this.changeInvoiceAddressForm.element(by.css("[type='submit']"));
    this.changeInvoiceAddressSuccessBlock = this.changeInvoiceAddressForm.element(by.className('alert-success'));

    //disable account
    this.disableAccountLink = this.accountOverviewWrapper.get(3).element(by.tagName('a'));
    this.disableAccountPopup = element(by.className("modal-disable-account"));
    this.disableAccountPopupCancelBtn = this.disableAccountPopup.all(by.repeater("btn in dialog.buttons")).get(0);

    //subscribe / unsubscribe to the newsletter
    this.changeNewsletterSubscriptionStatusLink = this.accountOverviewWrapper.get(4).element(by.tagName('a'));

    //invoices
    this.invoicesLink = this.accountOverviewWrapper.get(5).element(by.tagName('a'));
    this.invoicesListWrapper = element(by.className("invoices-list-table"));
    this.invoicesList = this.invoicesListWrapper.all(by.repeater("invoice in vm.invoicesList"));

    //orders
    this.ordersLink = this.accountOverviewWrapper.last().all(by.tagName('a')).last();
    this.ordersListWrapper = element(by.className("invoices-list-table"));
    this.ordersList = this.ordersListWrapper.all(by.repeater("order in vm.ordersList"));

    //methods
    this.fillInChangeEmailForm = function(email) {
        this.userEmailField.sendKeys("");
        this.userEmailField.sendKeys(email);
        this.userEmailConfirmField.sendKeys("");
        this.userEmailConfirmField.sendKeys(email);
    };

    this.fillInChangePasswordForm = function(password) {
        this.currentPasswordField.sendKeys("");
        this.newPasswordField.sendKeys("");
        this.newPasswordConfirmField.sendKeys("");
        this.currentPasswordField.sendKeys(password);
        this.newPasswordField.sendKeys(password);
        this.newPasswordConfirmField.sendKeys(password);
    };

    //TODO check change salutation !!!
    this.fillInChangeInvoiceAddressForm = function(isNew){
        var version = isNew ? "new": "current";
        this.clearInvoiceAddressForm();

        this.invoiceSalutationField.sendKeys(invoiceAddress.salutation[version]);
        this.invoiceFirstNameField.sendKeys(invoiceAddress.firstname[version]);
        this.invoiceLastNameField.sendKeys(invoiceAddress.lastname[version]);
        this.invoiceCompanyField.sendKeys(invoiceAddress.company[version]);
        this.invoiceStreetField.sendKeys(invoiceAddress.street[version]);
        this.invoiceNumberField.sendKeys(invoiceAddress.number[version]);
        this.invoiceZipCodeField.sendKeys(invoiceAddress.zipcode[version]);
        this.invoiceCityField.sendKeys(invoiceAddress.city[version]);
        this.invoiceMobileField.sendKeys(invoiceAddress.mobile[version]);
    };

    this.clearInvoiceAddressForm = function(){
        this.invoiceFirstNameField.clear();
        this.invoiceLastNameField.clear();
        this.invoiceCompanyField.clear();
        this.invoiceStreetField.clear();
        this.invoiceNumberField.clear();
        this.invoiceZipCodeField.clear();
        this.invoiceCityField.clear();
        this.invoiceMobileField.clear();
    };

	this.go = function(){
        browser.get(browser.params.MAIN_URL_DEV + '/account/');
	};

};

module.exports = AccountPage;