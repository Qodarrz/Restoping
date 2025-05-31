const { DataTypes } = require("sequelize");
const db = require("../config/database"); // adjust path sesuai struktur lo

const MenuDetail = db.define(
  "menu_details",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    menu_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    serving_size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = MenuDetail;
