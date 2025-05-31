const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

router.post(
  "/orders",
  authenticateToken,
  authorizeRole("customer"),
  orderController.createOrder
);

router.get(
  "/orders",
  authenticateToken,
  authorizeRole("admin"),
  orderController.getOrders
);

router.get(
  "/orders/:id",
  authenticateToken,
  authorizeRole(["admin", "customer"]),
  orderController.getOrderById
);

router.put(
  "/orders/:id/status",
  authenticateToken,
  authorizeRole("admin"),
  orderController.updateOrderStatus
);

router.delete(
  "/orders/:id",
  authenticateToken,
  authorizeRole("admin"),
  orderController.deleteOrder
);

module.exports = router;
