//table names
var tables = {
    exercises: "exercises"
};

var fields = {
    exercises: {
        name: "name"
    }
};

var common = {
    basicSelectExercises: "SELECT rowid AS id, * FROM " + tables.exercises
};

var runQuery = function(queryFunction, callback) {
    pool.acquire(function(err, db) {
        if (err) {
            console.log(err);
            console.log("query was " + JSON.stringify(queryFunction));
            callback(err);
        }
        else {
            queryFunction(db, function(err, result) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, result);
                }
            });
            pool.release(db);
        }
    });
};

var pool = require("./connectionPool");
module.exports = {
    CreateTables: function(callback) {
        runQuery(function(db) {
            console.log("adding exercises table");
            db.run("CREATE TABLE IF NOT EXISTS " + tables.exercises + " (TEXT " + fields.exercises.name + ")", callback);
        }, callback);
    },

    insertExercise: function(name, callback) {
        runQuery(function(db) {
            db.run("INSERT INTO " + tables.exercises + " VALUES($name)", {
                $name: name
            }, callback);
        });
    },

    deleteExercise: function(name, callback) {
        runQuery(function(db) {
            db.run("DELETE FROM " + tables.exercises + " WHERE " + fields.exercises.name + " = '$name'", {
                $name: name
            }, callback);
        });
    },

    renameExercise: function() {
        //TODO replace with real logic
    },

    switchExerciseStateForDate: function() {
        //TODO replace with real logic
    },

    getExercise: function(name, callback) {
        var db = pool.runQuery(
        db.each(common.basicSelectExercises + " where " + fields.exercises.name + " = " + name, callback));
    },

    getAllExercises: function() {
        var db = pool.runQuery(
        db.each(common.basicSelectExercises, function(err, row) {
            console.log(row.id + ": " + row.info); //TODO replace with real logic
        }));
    },

    // Only call this once in your application -- at the point you want
    // to shutdown and stop using this pool.
    close: function() {
        pool.destroyAllNow();
        console.log("database.close called.");
    }
};
