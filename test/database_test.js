"use strict";
var base = require('./common.js');
var async = require('async');

var db = require("../src/DAL/database");
var TEST_EXERCISE_NAME = 'TEST_EXERCISE_NAME';

exports.existingExercise = {
    setUp: function(callback) {
        console.log("setup start");
        async.series([
        db.CreateTables(),
        db.insertExercise(TEST_EXERCISE_NAME, callback)]);
        console.log("setup end");
    },

    tearDown: function(callback) {
        console.log("tearDown start");
        db.close();
        callback();
        console.log("tearDown end");
    },

    // insertExercise: function(test) {
    //     test.expect(1);
    //     db.insertExercise(TEST_EXERCISE_NAME, function(result) {
    //         test.ok(typeof result.lastID === "number", "Failed to add, result was " + JSON.stringify(result));
    //         console.log(result);
    //         test.done();
    //     });
    // },

    deleteExercise: function(test) {
        test.expect(1);
        db.deleteExercise(TEST_EXERCISE_NAME, function(result) {
            test.ok(typeof result.changes === "number" && result.changes === 1, "Failed to delete, result was " + JSON.stringify(result));
            test.done();
        });
    }
};


base.run_test(__filename);