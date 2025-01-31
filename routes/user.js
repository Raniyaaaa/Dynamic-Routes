// const express = require('express');
// const userController = require('../controllers/user'); // Ensure this path is correct

// const router = express.Router();

// console.log("User Controller:", userController); // Debugging step - check if this logs an object

// // Routes
// router.get('/add-user', userController.getAddUser);
// router.post('/add-user', userController.postAddUser);
// router.get('/edit-user/:userId', userController.getEditUser);
// router.post('/edit-user', userController.postEditUser);
// router.post('/delete-user', userController.postDeleteUser);

// module.exports = router;
const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

// ➤ Get Add User (Show Form and Users List)
router.get('/add-user', userController.getAddUser);

// ➤ Get Edit User (Load User Data for Editing)
router.get('/edit-user/:userId', userController.getEditUser);

// ➤ Post Add User (Submit Form)
router.post('/add-user', userController.postAddUser);

// ➤ Post Edit User (Update Existing User)
router.post('/edit-user/:userId', userController.postEditUser);

// ➤ Post Delete User (Remove User)
router.post('/delete-user', userController.postDeleteUser);

module.exports = router;
