const User = require('../models/user');

// ➤ Get Add User (Show Form and Users List)
exports.getAddUser = (req, res, next) => {
    User.findAll() // Fetch all users from the database
      .then(users => {
        res.render('user/edit-user', {
          pageTitle: 'Add User',
          path: '/user/add-user',
          editing: false,
          user: null, // Ensure `user` is null when adding
          users: users // Pass the actual list of users to the template
        });
      })
      .catch(err => {
        console.log(err); // Log any error that occurs while fetching users
    });
};

// ➤ Get Edit User (Load User Data for Editing)
exports.getEditUser = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/user/add-user');
    }
    const userId = req.params.userId;
    
    User.findByPk(userId)
      .then(user => {
        if (!user) {
          return res.redirect('/user/add-user');
        }
        return User.findAll().then(users => {
            res.render('user/edit-user', {
                pageTitle: 'Edit User',
                path: '/user/edit-user',
                editing: editMode === 'true', // Ensure Boolean value
                user: user,
                users: users
              });
        });
      })
      .catch(err => {
        console.log(err);
      });
};

// ➤ Post Add User (Submit Form)
exports.postAddUser = (req, res, next) => {
    const { name, email, phone } = req.body;
  
    User.create({ name, email, phone })
      .then(result => {
        console.log('Created User');
        res.redirect('/user/add-user'); // Redirect back to form with updated user list
      })
      .catch(err => {
        console.log(err);
      });
};

// ➤ Post Edit User (Update Existing User)
exports.postEditUser = (req, res, next) => {
    const userId = req.body.userId;
    const { name, email, phone } = req.body;
  
    User.findByPk(userId)
      .then(user => {
        if (!user) {
          return res.redirect('/user/add-user');
        }
        user.name = name;
        user.email = email;
        user.phone = phone;
        return user.save();
      })
      .then(result => {
        console.log('UPDATED USER!!');
        res.redirect('/user/add-user'); // After editing, redirect to the add-user page
      })
      .catch(err => {
        console.log(err);
      });
};

// ➤ Post Delete User (Remove User)
exports.postDeleteUser = (req, res, next) => {
  const userId = req.body.userId;
  
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.redirect('/user/add-user');
      }
      return user.destroy();
    })
    .then(() => {
      console.log('User Deleted Successfully');
      res.redirect('/user/add-user');
    })
    .catch(err => {
      console.log(err);
    });
};
