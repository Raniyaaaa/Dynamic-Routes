// const path = require('path');

// const express = require('express');
// const bodyParser = require('body-parser');
// const userController = require('./controllers/user');
// const errorController = require('./controllers/error');
// const sequelize = require('./util/database')

// const User = require('./models/user');
// const cors = require('cors')

// const app = express();
// app.use(cors());

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, "views"));

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
// const userRoutes = require('./routes/user')
// app.use(bodyParser.urlencoded({ extended: true })); // Use for form submissions
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);
// app.use('/user',userRoutes);


// app.use(errorController.get404);

// sequelize.sync()
// .then(result => {
//     // console.log(result)
//     app.listen(3000);
// })
// .catch(err => {
//     console.log(err)
// })


const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/user');
const errorController = require('./controllers/error');
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user');
const cors = require('cors')

const app = express();
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

app.use(bodyParser.urlencoded({ extended: true })); // Use for form submissions
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err))
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/user',userRoutes);


app.use(errorController.get404);

Product.belongsTo(User , {
    constraints: true, onDelete: 'CASCADE'
})
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem});
Product.belongsToMany(Cart, { through: CartItem});



sequelize
.sync()
.then(result => {
    return User.findByPk(1);
})
.then(user => {
    if(!user){
        return User.create({name: "Max", email:'test@gmail.com'})
    }
    return user;
})
.then(user => {
    return user.createCart()   
})
.then(cart => {
    app.listen(3000)
})
.catch(err => {
    console.log(err)
})


