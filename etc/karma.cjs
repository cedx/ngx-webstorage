module.exports = configuration => configuration.set({
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
  frameworks: ['jasmine', '@angular-devkit/build-angular'],
  plugins: ['karma-*', '@angular-devkit/build-angular/plugins/karma'],
  reporters: ['progress'],
  singleRun: true
});
