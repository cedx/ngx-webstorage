/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = config => config.set({
  browsers: ['ChromeHeadless'],
  client: {clearContext: false},
  coverageIstanbulReporter: {
    dir: require('path').resolve(__dirname, '../var'),
    fixWebpackSourcePaths: true,
    reports: ['lcovonly']
  },
  frameworks: ['jasmine', '@angular-devkit/build-angular'],
  plugins: ['karma-*', '@angular-devkit/build-angular/plugins/karma'],
  reporters: ['progress'],
  singleRun: true
});
