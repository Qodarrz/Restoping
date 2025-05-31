const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database"); // Import sequelize instance

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "canceled"),
      defaultValue: "pending",
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      onUpdate: Sequelize.NOW,
    },
  },
  {
    tableName: "orders",
    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at", // Disable default timestamps because you're manually managing them
  }
);

module.exports = Order;
