/*
Author : Parshant Nagpal
Filename : deletePost.js
Description : delete the post based on id
*/
'use strict'
const deletePost = require('../../../controllers/v1/posts/deletePost');
module.exports = {
	method : "DELETE",
	path : '/deletePost',
	config : {
		auth : 'default',
		handler : deletePost
	}
}