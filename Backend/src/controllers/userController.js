const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { User, Order } = require("../models");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role && role === "admin" ? "admin" : "customer",
      profile_picture:
        "https://os6aol2whdruaa6v.public.blob.vercel-storage.com/default-DEcJt7M8qc7yqwrGd6uXuy45FxpZQV.jpg",
    });

    res.status(201).json({ message: "Registrasi berhasil", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Email atau password salah" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profile_picture: user.profile_picture,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role", "profile_picture"],
      include: [
        {
          model: Order,
          attributes: [
            "id",
            "status",
            "total_amount",
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Users (Admin Only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role", "profile_picture"],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "password", "profile_picture"], // ✅ Pastikan `profile_picture` diambil
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // 🔥 Debugging: Cek apakah req.file ada
    console.log("🔥 File dari multer:", req.file);

    // 🔥 Debugging: Cek apakah req.body ada
    console.log("🔥 Data dari body:", req.body);

    // Update data dari req.body
    user.set({
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      profile_picture: req.file
        ? `/image/${req.file.filename}`
        : user.profile_picture,
    });

    await user.save({ fields: ["name", "email", "profile_picture"] }); // ✅ Paksa update hanya field tertentu

    res.json({ message: "Profil berhasil diperbarui", user });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    await user.destroy();

    res.json({ message: "Akun berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
