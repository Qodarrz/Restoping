// models/Menu.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Menu = sequelize.define(
  "Menu",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      unsigned: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("food", "drink"),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "/public/image/default.jpg",
    },
  },
  {
    tableName: "menus",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Menu;
