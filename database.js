var Mongoose = require('mongoose');

//load database

Mongoose.connect('mongodb://localhost/hapisixteen');
var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function callback() {
   console.log("Connection with database succeded")
});

exports.db = db;