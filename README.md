# Used tools:

	- npm
 	- Protractor 
  	- Jasmine
  	- Selenium Server

# Run tests:

	- webdriver-manager start 
	- protractor conf.js

# Run specific suit test:
	
	- protractor conf.js --suite suite_name


Available suite tests (listed in conf.js -> suites):

	- userAccount	
	- login

login with params:	
	protractor conf.js --suite login --parameters.login.username=user_name --parameters.login.password=user_password

# Info

	webdriver-manager is Protractor helper tool to get an instance of a Selenium Server running. Tests also are using a local standalone Selenium Server to control browsers. You will need to have the Java Development Kit (JDK) installed to run the standalone Selenium Server.