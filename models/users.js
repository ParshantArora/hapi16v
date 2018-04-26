const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

var UserData = new Schema({
	   name : { type: String, required: true },
	   email : { type: String, required: true },
	   password : { type: String, default: '' },
	   phone : { type: String, default: '' },
	   address : { type: String, default: '' }, 
	   token: { type: String, default: '' },
});
module.exports = mongoose.model('User',UserData);