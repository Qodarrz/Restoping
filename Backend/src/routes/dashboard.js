const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

router.get(
  "/totals",
  authenticateToken,
  authorizeRole("admin"),
  dashboardController.getTotals
);

module.exports = router;
