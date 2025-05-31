const { User, Order, Menu } = require('../models');

const DashboardController = {
  async getTotals(req, res) {
    try {
      const totalUsers = await User.count();
      const totalOrders = await Order.count();
      const totalMenus = await Menu.count();

      res.status(200).json({
        totalUsers,
        totalOrders,
        totalMenus,
      });
    } catch (error) {
      console.error("Error getting totals:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = DashboardController;
