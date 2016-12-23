exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['*.spec.js'],
  capabilities: {
    browserName: 'chrome'
  },
  suites: {
  	userAccount: 'userAccount.spec.js',
  	login: 'login.spec.js',
  	register: 'registration-QA_2253.spec.js'
  },
  jasmineNodeOpts: {
    showColors: true
  },
  params: {
  	login: {
      username: 'default',
      password: 'default'
    }
  }
}