/*
Author : Parshant Nagpal
Filename : addPosts.js
Description : 'Add posts by 'user
*/

'use strict'

const addPosts = require("../../../controllers/v1/posts/addPosts");

module.exports = {
	method : "POST",
	path : '/addPosts',
   config: {
        auth: 'default',
	handler : addPosts
}
}