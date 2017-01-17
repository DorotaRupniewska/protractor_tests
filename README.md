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

	- register (QA-2253)
	- login (QA-1734)
	- contactLink (QA-1732)
	- footerLinks (QA-2306)
	- welcomeWizard (QA-2260)

login with params (not used at this version):	
	protractor conf.js --suite login --parameters.login.username=user_name --parameters.login.password=user_password
	
# Parameters
	Some suit tests uses variables that can be change if eeded. For example, you can login or register using different user names and passwords. Variables that can be change are located in files  **.spec.js** at the top of the file
	**/** variables **/** section

//TODO
add parameters to test different environments	

# Info

	webdriver-manager is Protractor helper tool to get an instance of a Selenium Server running. 
	Tests also are using a local standalone Selenium Server to control browsers. 
	You will need to have the Java Development Kit (JDK) installed to run the standalone Selenium Server.
