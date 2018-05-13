var bcrypt = require('bcrypt');
const User = require('../../../models/users');
const config = require("../../../config/default.json")
module.exports = function (request, reply) {
  /*
   Check if the payload contains password ,email and name 
   */
  if (request.payload["password"] && request.payload["email"] && request.payload["name"]) {
    /*
    Check if the same email id is registered or not 
    */
    User.find({ email: request.payload.email }).then((data) => {
      if (data.length == 0) {
        let { password } = request.payload;
        /*
        if any user not found then encrypt password  with bycypt
        */
        bcrypt.hash(password, config.Jwt.saltRounds, function (err, hash) {
          request.payload = { ...request.payload, password: hash }
          const userdata = new User(request.payload);
          userdata.save().then((data) => {
            console.log("data saved")
            reply(data)
          })
        });
      }
      else {
        reply({ message: "user with " + request.payload.email + " is already registered" })
      }
    })
  } else {
    reply("Please fill the full details")
  }
}