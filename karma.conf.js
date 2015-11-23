module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],

        files: [
            'js/calculatorService.js',
            'test/calculatorService.spec.js'
        ],

        browsers: ['PhantomJS'],

        reporters: ['progress'],

        singleRun: true
    });
};