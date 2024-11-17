const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');
const cors = require('cors');
const app = express();
const port = 3007;

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

/*class Products extends Model{}
Products.init({
    ref: DataTypes.INTEGER,
    title:DataTypes.STRING,
    price:DataTypes.FLOAT
},{ sequelize, modelName: 'product' });*/
// Define Order model
class Order extends Model {}
Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
},
  Code_Client: DataTypes.INTEGER,
  /*ProductREF:{
    type: DataTypes.INTEGER,
    references: {
      model: Products,
      key: 'ref'
    }
  },*/
    Date: DataTypes.STRING,
    Total_TTC: DataTypes.FLOAT,
    Status: DataTypes.STRING,
    Date_of_payment:DataTypes.STRING,
    Payment_Method: DataTypes.STRING,
    Delivery_price: DataTypes.INTEGER,
    Total_price_of_products: DataTypes.FLOAT,
    Address: DataTypes.STRING,
    Delivery_company: DataTypes.STRING
}, { sequelize, modelName: 'order' });

// Sync models with database
sequelize.sync();
/*Order.hasMany(Products, { foreignKey: 'ProductREF' });
Products.belongsTo(Order, { foreignKey: 'ProductREF' });
// Middleware for parsing request body

/*app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CRUD routes for User model
app.get('/orders', async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
});

app.get('/orders/:id', async (req, res) => {
  const user = await Order.findByPk(req.params.id);
  res.json(user);
});

app.put('/orders/:id', async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (order) {
    await order.update(req.body);
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

app.post('/orders', async (req, res) => {
    const order = await Order.create(req.body);
    res.json(order);
  });

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

