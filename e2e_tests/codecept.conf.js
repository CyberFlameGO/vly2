exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    WebDriver: {
      url: 'http://localhost:3122',
      browser: 'chrome',
      host: '127.0.0.1',
      port: 4444,
      restart: false,
      windowSize: '1920x1680',
      desiredCapabilities: {
        chromeOptions: {
          args: [ /*"--headless",*/ "--disable-gpu", "--window-size=1200,1000", "--no-sandbox" ]
        }
      }
    },
    REST: {
      endpoint: 'http://site.com/api',
      onRequest: (request) => {
        request.headers.auth = '123';
      }
   },    
  },
  include: {
    I: './steps.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'e2e_tests',
  plugins: {
    wdio: {
      enabled: true,
      services: ['selenium-standalone']
    },
    allure: {
      enabled: true
    }
  }
}