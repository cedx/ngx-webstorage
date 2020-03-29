module.exports = config => config.set({
  basePath: '..',
  browsers: ['ChromeHeadless'],
  client: {
    clearContext: false
  },
  coverageIstanbulReporter: {
    dir: 'var',
    fixWebpackSourcePaths: true,
    reports: ['lcovonly']
  },
  frameworks: ['mocha', 'chai', '@angular-devkit/build-angular'],
  plugins: ['karma-*', '@angular-devkit/build-angular/plugins/karma'],
  reporters: ['progress'],
  singleRun: true
});
