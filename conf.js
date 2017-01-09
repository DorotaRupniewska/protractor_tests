exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['specs/*.spec.js'],
  capabilities: {
    browserName: 'chrome'
  },
  suites: {
  	login: 'specs/login_QA-1734.spec.js',
  	register: 'specs/registration_QA-2253.spec.js'
  },
  jasmineNodeOpts: {
    showColors: true
  },
  params: {
    MAIN_URL: "https://webapp.sf-dev1.com/de-de",
  	login: {
      username: 'default',
      password: 'default'
    }
  }
}