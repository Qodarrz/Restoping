const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/userController"); // ✅ HARUSNYA INI
const { authenticateToken, authorizeRole } = require("../middleware/auth");
const upload = require("../middleware/multer"); // ✅ Import multer

// ✅ Register User
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Nama harus diisi"),
    body("email").isEmail().withMessage("Email tidak valid"),
    body("password").isLength({ min: 6 }).withMessage("Password minimal 6 karakter"),
  ],
  userController.registerUser // ✅ BENAR, ini ambil fungsi dari controller
);

// ✅ Login User
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email tidak valid"),
    body("password").notEmpty().withMessage("Password harus diisi"),
  ],
  userController.loginUser // ✅ BENAR
);

// ✅ Get User Profile
router.get("/profile", authenticateToken, userController.getUserProfile);

// ✅ Get All Users (Admin Only)
router.get("/users", authenticateToken, authorizeRole("admin"), userController.getAllUsers);

router.put(
  "/profile",
  authenticateToken,
  upload.single("profile_picture"), // 🔴 Fix middleware multer
  userController.updateUser
);

// ✅ Delete User
router.delete("/profile", authenticateToken, userController.deleteUser);

module.exports = router;
