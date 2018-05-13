const User = require('../../../models/users');
module.exports = function (request, reply) {

        console.log("equest.auth", JSON.stringify(request.auth.credentials.loginUser))
        User.updateOne({ email: request.auth.credentials.loginUser.email }, { token: '' }, { multi: false }, (err, res) => {
                if (err) return handleError(err)
                reply({ message: request.auth.credentials.loginUser.name + ' Successfully logged out' }).code(200)
        })
}
