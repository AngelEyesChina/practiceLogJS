var base = require('./common.js');

var helloWorld = require("../src/helloWorld");

exports.helloWorldTest = function (test) {
    test.equal(helloWorld(), "Hello world!");
    test.done();
};

base.run_test(__filename);