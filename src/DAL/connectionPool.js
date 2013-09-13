'use strict';

//from https://github.com/coopernurse/node-pool
var poolModule = require('generic-pool');
var config = require("../../src/config/" + process.env.NODE_ENV);

var pool = poolModule.Pool({
    name: config.dbConnection,
    create: function(callback) {
        var sqlite3 = require('sqlite3').verbose();
        var db = new sqlite3.Database(config.dbConnection);

        // parameter order: err, resource
        // new in 1.0.6
        callback(null, db);
    },
    destroy: function(db) {
        db.close();
    },
    max: 10,
    // optional. if you set this, make sure to drain() (see step 3)
    min: 1,
    // specifies how long a resource can stay idle in pool before being removed
    idleTimeoutMillis: 30000,
    // if true, logs via console.log - can also be a function
    log: true
});

module.exports = pool;
