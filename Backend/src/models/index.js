const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Import semua model
const User = require('./userModel');
const Order = require('./orderModel');
const Menu = require('./menuModel');
const MenuDetail = require('./menudetailModel');
const OrderDetail = require('./orderdetailModel');
const PaymentTransaction = require('./paymentTransactionModel'); // ✅ tambahkan ini

// RELASI

// User & Order
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// Order & OrderDetail
Order.hasMany(OrderDetail, { foreignKey: 'order_id' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });

// Menu & OrderDetail
Menu.hasMany(OrderDetail, { foreignKey: 'menu_id' });
OrderDetail.belongsTo(Menu, { foreignKey: 'menu_id' });

// Menu & MenuDetail
Menu.hasOne(MenuDetail, { foreignKey: 'menu_id' });
MenuDetail.belongsTo(Menu, { foreignKey: 'menu_id' });

// ✅ Order & PaymentTransaction
Order.hasOne(PaymentTransaction, { foreignKey: 'order_id', as: 'paymentTransaction' });
PaymentTransaction.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// SYNC
sequelize.sync({ force: false })
  .then(() => {
    console.log("✅ Relasi berhasil di-set dan tabel disinkronkan!");
  })
  .catch((error) => {
    console.error("❌ Error setting up associations:", error);
  });

// EXPORT semua model
module.exports = {
  User,
  Order,
  Menu,
  MenuDetail,
  OrderDetail,
  PaymentTransaction, // ✅ jangan lupa diekspor
};
