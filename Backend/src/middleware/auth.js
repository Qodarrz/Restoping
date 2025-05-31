const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak! Token tidak ditemukan" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token tidak valid" });
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Akses ditolak! Anda tidak memiliki izin" });
    }
    next();
  };
};

const authorizeSelf = (req, res, next) => {
  if (req.user.id !== parseInt(req.params.id)) {
    return res.status(403).json({ message: "Akses ditolak! Anda hanya bisa mengelola akun sendiri." });
  }
  next();
};

module.exports = { authenticateToken, authorizeRole, authorizeSelf };
