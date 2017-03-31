exports.config = {

  // node ./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update

  specs: [
    './protractor/**/*.prot.js'
  ],

  // configure multiple browsers to run tests
  multiCapabilities: [{
    'browserName': 'chrome',
    'chromeOptions': {
      args: ['--disable-web-security']
    }
  }],

  // url where your app is running, relative URLs are prepending with this URL
  baseUrl: 'http://localhost:9000/',

  // testing framework, jasmine is the default
  framework: 'jasmine'
};
