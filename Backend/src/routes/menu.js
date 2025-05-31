const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const { uploadFile } = require("../middleware/blob");
const { authenticateToken, authorizeRole } = require("../middleware/auth");
const multer = require("multer"); 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ✅ GET semua menu (public)
router.get("/menus", menuController.getMenus);

// ✅ GET menu by ID (public)
router.get("/menus/:id", menuController.getMenu);

router.post(
  "/menus",
  authenticateToken,
  upload.single("media"), // <- handle file dari frontend (field name: media)
  async (req, res) => {
    try {
      // Upload dulu ke Vercel Blob kalau ada file
      if (req.file) {
        const mediaUrl = await uploadFile(req.file);
        req.body.image = mediaUrl;
      }

      // Teruskan ke controller createPost
      await menuController.createMenu(req, res);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.put(
  "/menus/:id",
  authenticateToken,
  authorizeRole("admin"),
  upload.single("image"),
  menuController.updateMenu
);

// ✅ DELETE menu (admin only)
router.delete(
  "/menus/:id",
  authenticateToken,
  authorizeRole("admin"),
  menuController.deleteMenu
);

module.exports = router;
