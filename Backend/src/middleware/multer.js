const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image"); // 🔥 Simpan file ke folder public/image
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 🔥 Rename file biar unik
  },
});

// Filter tipe file (cuma boleh gambar)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Format file tidak valid!"), false);
  }
};

// Inisialisasi multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 🔥 Maksimal 2MB
});

module.exports = upload;
