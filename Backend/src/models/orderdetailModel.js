const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import sequelize instance
const Order = require('./orderModel'); // Import Order model
const MenuItem = require('./menuModel'); // Import MenuItem model

const OrderDetail = sequelize.define('OrderDetail', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        }
    },
    menu_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: MenuItem,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    tableName: 'order_details',
    timestamps: false
});

module.exports = OrderDetail;
