const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("customer", "admin"),
      allowNull: true,
      defaultValue: "customer",
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "public/fotoprofile/default.jpg", // ✅ Set default profile picture
    },
  },
  { tableName: "users",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at' }
);

module.exports = User;
