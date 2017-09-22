'use strict';

const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

module.exports = config => config.set({
  browsers: ['Firefox'],
  frameworks: ['mocha'],
  client: {
    mocha: {opts: true}
  },
  coverageReporter: {
    dir: 'var',
    includeAllSources: true,
    subdir: '.',
    type: 'lcovonly'
  },
  files: [
    {pattern: 'test/**/*.js', watched: false}
  ],
  preprocessors: {
    'src/**/*.js': ['coverage'],
    'test/**/*.js': ['rollup']
  },
  reporters: [
    'progress',
    'coverage'
  ],
  rollupPreprocessor: {
    format: 'iife',
    name: 'webStorage',
    plugins: [
      nodeResolve(),
      commonjs({namedExports: {chai: ['expect']}})
    ],
    sourcemap: 'inline'
  }
});
