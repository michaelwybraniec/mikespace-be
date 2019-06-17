var mongoose = require('mongoose');
var config = require("../../config/config.json");

// @ TODO remove for production level.
//mongoose.set('debug', true);

var db = function () {

    var initFlag = false;

    return {

        config: function (addr, dbname, opts, callback) {
            if (!initFlag) {

                // ================== MONGO SETUP ==================
                mongoose.connect(config.database.server, {
                    // auth: {
                    //     authdb: config.database.authdb,
                    //     user: config.database.username,
                    //     password: config.database.password
                    // },
                    useNewUrlParser: true
                }, function (err, db) {
                    if (err) throw 'Unable to connect to the server. Please start the server. Error: ' + err;
                    else console.log('Connected to Mongo successfully!');
                }); 
                mongoose.set('useFindAndModify', false);
                mongoose.set('useCreateIndex', true);

                // mongoose.connect(config.database.ip, {
                //     useNewUrlParser: true
                // }, function (err, db) {
                //     if (err) throw 'Unable to connect to the server: ' + err
                //     else  console.log('Connected to MongoDB Server');
                // });

                var db = mongoose.connection;

                db.on('error', function (err) {
                    // Connection Error
                    console.log('Mongodb error encountered [' + err + ']');

                    if (callback) callback('ERR-MONGODB', 'mongodb - ' + err.message);
                });

                db.once('open', function () {
                    initFlag = true;
                    if (callback) callback(null);
                });
            } else {
                if (callback) callback(null);
            }
        }
    };

};

module.exports = db();
