// Karma configuration
// Generated on Mon Oct 19 2015 17:58:34 GMT+0900 (JST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'expect', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      'vendor/assets/javascripts/bower_components/angular/angular.js',
      'vendor/assets/javascripts/bower_components/angular-animate/angular-animate.js',
      'vendor/assets/javascripts/bower_components/angular-resource/angular-resource.js',
      'vendor/assets/javascripts/bower_components/angular-route/angular-route.js',
      'vendor/assets/javascripts/bower_components/angular-sanitize/angular-sanitize.js',
      'vendor/assets/javascripts/bower_components/angular-touch/angular-touch.js',
      'vendor/assets/javascripts/bower_components/angular-aria/angular-aria.js',
      'vendor/assets/javascripts/bower_components/angular-material/angular-material.js',
      'vendor/assets/javascripts/bower_components/angular-mocks/angular-mocks.js',
      'app/assets/javascripts/module.js',
      'app/assets/javascripts/{**/*, !module}.js',
      'spec/javascripts/**/*_spec.js'
    ],


    // list of files to exclude
    exclude: [
      'app/assets/javascripts/application.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/assets/javascripts/**/*.js': ['jshint']
    },
    jshintPreprocessor: {
      jshintrc: './.jshintrc'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
