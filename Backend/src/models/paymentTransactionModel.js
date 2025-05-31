// models/paymentTransactionModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import instance Sequelize

const PaymentTransaction = sequelize.define(
  "PaymentTransaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pg_transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qr_code_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "settlement",
        "cancel",
        "expire",
        "failure"
      ),
      allowNull: false,
      defaultValue: "pending",
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "payment_transactions",
    timestamps: true,
    underscored: true,
  }
);

module.exports = PaymentTransaction;
