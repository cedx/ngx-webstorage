module.exports = config => config.set({
  browsers: ['ChromeHeadless'],
  files: ['src/**/*.ts', 'test/**/*.ts'],
  frameworks: ['mocha', 'karma-typescript'],
  karmaTypescriptConfig: {
    include: ['test/**/*.ts'],
    reports: {lcovonly: {
      directory: 'var',
      filename: 'lcov.info',
      subdirectory: () => ''
    }},
    tsconfig: 'tsconfig.json'
  },
  preprocessors: {
    'src/**/*.ts': ['karma-typescript', 'coverage'],
    'test/**/*.ts': ['karma-typescript']
  },
  reporters: ['progress', 'karma-typescript', 'coverage'],
  singleRun: true
});
