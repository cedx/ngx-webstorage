module.exports = config => config.set({
  browsers: ['ChromeHeadless'],
  coverageIstanbulReporter: {
    dir: require('path').join(__dirname, '../var'),
    fixWebpackSourcePaths: true,
    reports: ['lcovonly']
  },
  frameworks: ['jasmine', '@angular-devkit/build-angular'],
  plugins: ['karma-*', '@angular-devkit/build-angular/plugins/karma'],
  reporters: ['progress'],
  singleRun: true
});
