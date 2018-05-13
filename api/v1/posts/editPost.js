/*
Author : Parshant Nagpal
FileName : editPosts.js
Description : edit the post based on id
*/
'use strict'
const editPost = require("../../../controllers/v1/posts/editPost");
module.exports = {
	method : "POST",
	path : '/editPost',
	config: {
		auth : 'default',
		handler : editPost
	}
}
