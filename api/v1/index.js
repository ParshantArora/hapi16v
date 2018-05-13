 let logout = require('./auth/logout');
 let login = require('./auth/login');
 let register = require('./auth/register');
 let addPosts = require('./posts/addPosts');
 let editPost = require('./posts/editPost');
 let deletePost = require('./posts/deletePost');
 console.log(deletePost)
 module.exports = [register,login,logout,addPosts,editPost,deletePost];