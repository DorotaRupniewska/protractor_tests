exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./specs/*.spec.js'],
  capabilities: {
    browserName: 'chrome'
  },
  suites: {
  	login: './specs/login_QA-1734.spec.js',
  	register: './specs/register_QA-2253.spec.js',
    contactLink: './specs/contactLink_QA-1732.spec.js',
    footerLinks: './specs/footerLinks_QA-2306.spec.js',
    welcomeWizard: './specs/welcomeWizard_QA-2260.spec.js'
  },
  jasmineNodeOpts: {
    showColors: true
  },
  params: {
    MAIN_URL_DEV: "https://webapp.sf-dev1.com/de-de",
    MAIN_URL_SF: "https://www.smartfrog.com/de-de",
  	login: {
      username: 'default',
      password: 'default'
    }
  }
}