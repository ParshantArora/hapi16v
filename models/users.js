const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

var UserData = new Schema({
	   name : String,
	   email : String,
	   password : String,
	   phone : String,
	   address : String, 
});
module.exports = mongoose.model('User',UserData);