module.exports = config => config.set({
  browsers: ['FirefoxHeadless'],
  coverageIstanbulReporter: {
    dir: require('path').join(__dirname, '../var'),
    fixWebpackSourcePaths: true,
    reports: ['lcovonly']
  },
  frameworks: ['jasmine', '@angular-devkit/build-angular'],
  plugins: [
    require('karma-coverage-istanbul-reporter'),
    require('karma-firefox-launcher'),
    require('karma-jasmine'),
    require('@angular-devkit/build-angular/plugins/karma')
  ],
  reporters: ['progress'],
  singleRun: true
});
