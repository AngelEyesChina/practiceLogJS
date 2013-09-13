// inside 'test' folder

var base = require('./common.js');

exports["test 1"] = function(test){
    test.expect(1);
    test.ok(true, "this assertion should pass");
    test.done();
};

exports["test 2"] = function(test){
    test.ok(true, "this assertion should pass");
    test.done();
};

base.run_test(__filename);