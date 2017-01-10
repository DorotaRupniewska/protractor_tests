'use strict';

// mock_url - correct URL of given page (link should redirect to this url, at least now is redirecting after real click)
var footerLinksToRedirect = {
    "https://www.smartfrog.com/de/faq/": {mock_url: "https://support.smartfrog.com/hc/de", name: "Häufig gestellte Fragen (FAQ)"},
    "https://www.smartfrog.com/de-de/support/": {mock_url: "https://www.smartfrog.com/de-de/support/", name: "Support"},
    "https://www.smartfrog.com/de-de/kontakt/": {mock_url: "https://www.smartfrog.com/de-de/kontakt/", name: "Kontakt"},
    "https://www.smartfrog.com/de-de/bezugsquellen/": {mock_url: "https://www.smartfrog.com/de-de/bezugsquellen/", name: "Bezugsquellen"},

    "https://www.smartfrog.com/de-de/nutzungsbedingungen/": {mock_url: "https://www.smartfrog.com/de-de/nutzungsbedingungen/", name: "Nutzungsbedingungen"},
    "https://www.smartfrog.com/de-de/datenschutzrichtlinie/": {mock_url: "https://www.smartfrog.com/de-de/datenschutzrichtlinie/", name: "Datenschutzrichtlinie"},
    "https://www.smartfrog.com/de-de/cookies/": {mock_url: "https://www.smartfrog.com/de-de/cookies/", name: "Cookies"},
    "https://www.smartfrog.com/de-de/open-source/": {mock_url: "https://www.smartfrog.com/de-de/open-source/", name: "Open source"},

    "https://www.smartfrog.com/de-de/ueber-uns/": {mock_url: "https://www.smartfrog.com/de-de/ueber-uns/", name: "Über uns"},
    "https://www.smartfrog.com/de-de/jobs/": {mock_url: "https://www.smartfrog.com/de-de/jobs/", name: "Jobs"},
    "https://www.smartfrog.com/de/blog/": {mock_url: "https://blog.smartfrog.com/de/", name: "Blog"},
    "https://www.smartfrog.com/de-de/presse/": {mock_url: "https://www.smartfrog.com/de-de/presse/", name: "Press"}
};

var navigation = element(by.className("footerNavigation1"));

//main page after login
var MainPage = function(){

    this.contactLink = navigation.element(by.linkText("Kontakt"));

    //TODO add html tags to find proper link e.g. 'name'
    // {url: link_url, text: clickable_text, name: faq}
    // and then
    // forEach navigation e -> element(e.name).click() ...
    this.footerLinks1 = [
        // {selector: navigation.element(by.linkText("Häufig gestellte Fragen (FAQ)")), url: browser.params.MAIN_URL_SF + '/faq/'},
        // {selector: navigation.element(by.linkText("Support")), url: browser.params.MAIN_URL_SF + '/support/'},
        // {selector: navigation.element(by.linkText("Kontakt")), url: browser.params.MAIN_URL_SF + '/kontakt/'},
        // {selector: navigation.element(by.linkText("Bezugsquellen")), url: browser.params.MAIN_URL_SF + '/bezugsquellen/'},
        // {selector: navigation.element(by.linkText("Nutzungsbedingungen")), url: browser.params.MAIN_URL_SF + '/nutzungsbedingungen/'},
        // {selector: navigation.element(by.linkText("Datenschutzrichtlinie")), url: browser.params.MAIN_URL_SF + '/datenschutzrichtlinie/'},
        // {selector: navigation.element(by.linkText("Cookies")), url: browser.params.MAIN_URL_SF + '/cookies/'},
        // {selector: navigation.element(by.linkText("Open source")), url: browser.params.MAIN_URL_SF + '/open-source/'},
        // {selector: navigation.element(by.linkText("Ueber uns")), url: browser.params.MAIN_URL_SF + '/ueber-uns/'},
        // {selector: navigation.element(by.linkText("Jobs")), url: browser.params.MAIN_URL_SF + '/jobs/'},
        // {selector: navigation.element(by.linkText("Blog")), url: browser.params.MAIN_URL_SF + '/blog/'},
        // {selector: navigation.element(by.linkText("Presse")), url: browser.params.MAIN_URL_SF + '/presse/'}
        {url: 'https://www.smartfrog.com/de/faq/', text: "Häufig gestellte Fragen (FAQ)"},
        {url: browser.params.MAIN_URL_SF + "/support/", text: "Support"},
        {url: browser.params.MAIN_URL_SF + "/kontakt/", text: "Kontakt"},
        {url: browser.params.MAIN_URL_SF + "/bezugsquellen/", text: "Bezugsquellen"}
    ];

    this.footerLinks2 = [
        {url: browser.params.MAIN_URL_SF + "/nutzungsbedingungen/", text: "Nutzungsbedingungen"},
        {url: browser.params.MAIN_URL_SF + "/datenschutzrichtlinie/", text: "Datenschutzrichtlinie"},
        {url: browser.params.MAIN_URL_SF + "/cookies/", text: "Cookies"},
        {url: browser.params.MAIN_URL_SF + "/open-source/", text: "Open source"}
    ];

    this.footerLinks3 = [
        {url: browser.params.MAIN_URL_SF + "/ueber-uns/", text: "Über uns"},
        {url: browser.params.MAIN_URL_SF + "/jobs/", text: "Jobs"},
        // {url: browser.params.MAIN_URL_SF + "/blog/", text: "Blog"},
        {url: 'https://www.smartfrog.com/de/blog/', text: "Blog"},
        {url: browser.params.MAIN_URL_SF + "/presse/", text: "Presse"}
    ];

    //methods
    this.go = function(){
        browser.get(browser.params.MAIN_URL_DEV);
    };

    /**
     * check if each link opens correct page
     * @param links array of links to check
     * @returns promise
     *
     * !! at now it is too complicated - so never use
     * !! to refactor maybe
     */
    this.ifLinkOpenCorrectPage = function(links){
        var deferred = protractor.promise.defer();
        var promiseLists = [];

        //check with hardcoded footerLinks

        links.then(function(linkList) {
            for(var i = 0; i < linkList.length; i++){
                promiseLists.push(linkList[i].getAttribute("href"));
            }

            return protractor.promise.all(promiseLists).then(function(list){
                for(var i = 0; i < list.length; i++){
                    if(!footerLinksToRedirect[list[i]]){
                        return deferred.reject("no link " + list[i]);
                    }else{
                        console.log("for: ", footerLinksToRedirect[list[i]].name);
                        isPageCorrect(list[i], footerLinksToRedirect[list[i]].mock_url).then(function(resp) {
                            console.log("isPageCorrect true ", resp);
                        }, function(resp){
                            // deferred.fulfill(true);
                            console.log("isPageCorrect false ", resp);
                            return deferred.reject(resp);
                        });
                    }
                }
                deferred.fulfill(true);
            });
        });

        return deferred.promise;
    };

    this.isPageCorrect = function(hrefLink) {
        if(!footerLinksToRedirect[hrefLink]){
            return false;
        }
        var mockUrl = footerLinksToRedirect[hrefLink].mock_url;
        return isPageCorrect(hrefLink, mockUrl);
    }
};

/**
 *
 * @param hrefLink to redirect to
 * @mockUrl hardcoded url
 * @returns promise
 */
var isPageCorrect = function(hrefLink, mockUrl){
    browser.ignoreSynchronization = true;
    browser.get(hrefLink);
    return browser.getCurrentUrl().then(function(gotUrl){
        //for clear fail info purpose
        if(gotUrl !== mockUrl){
            console.log("failed for link ", footerLinksToRedirect[hrefLink].name);
        }
        return gotUrl === mockUrl;
    });

};


module.exports = MainPage;