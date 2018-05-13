/*
Author : Parshant Nagpal
Filename : logout.js
Description : 'log out the user session and clear the user token'
*/



'use strict';
const logout = require("../../../controllers/v1/auth/logout");

module.exports = {
		method : 'POST',
		path : '/logout',
        config: {
        auth: 'default',
		handler: logout
	}
	}