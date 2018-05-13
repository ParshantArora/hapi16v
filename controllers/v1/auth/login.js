var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../../../models/users');
const config = require("../../../config/default.json");

module.exports = function (request, reply) {
      console.log(request)
      if (request.payload["password"] && request.payload["email"]) { // check email and password field exists
            /*
            check if the same email id exists 
            */
            console.log(request.payload.email)
            User.find({ email: request.payload.email }).then((data) => {
                  if (data.length > 0) {
                        /*
                        Compare the password with existed password data in user data by using bycrypt
                        */
                        bcrypt.compare(request.payload.password, data[0].password, function (err, res) {
                              if (res) {
                                    /* 
                                    if Password matches then a jwat token was created
                                    */

                                    var token = jwt.sign(request.payload, config.Jwt.key, { expiresIn: config.Jwt.expiresInTime, algorithm: config.Jwt.algorithmUsed }, function (err, token) {

                                          /*
                                          save the token created using jwt in the user
                                          */
                                          User.updateOne({ email: request.payload.email }, { token: token }, { multi: false }, function (err, raw) {
                                                if (err) return handleError(err);
                                                console.log('The raw response from Mongo was ', raw);
                                                reply({ mressage: 'Your are logged in mr ' + request.payload.name, token: token }).code(200)
                                          });
                                    });
                              }
                              else {
                                    reply("Either the email or password is incorect")
                              }
                        })
                  } else {
                        reply("no user with " + request.payload.email + " found")

                  }

            })

      } else {
            reply("Please fill email and Password")
      }
}