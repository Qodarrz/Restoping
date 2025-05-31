require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/database");

const userRoutes = require("./routes/users");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/order");
const dashboardRoutes = require("./routes/dashboard");
const app = express();

app.use(cors({
  origin: true, // izinkan semua origin

  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // If using cookies/tokens
}));

app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/image", express.static(path.join(__dirname, "public/image")));
app.use("/image", express.static(path.join(__dirname, "public/fotoprofile")));

app.use("/api", menuRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);
console.log("🚧 Registering dashboard routes...");
app.use("/api/dashboard", dashboardRoutes);
console.log("✅ Dashboard routes registered.");

app.get("/", (req, res) => {
  res.status(200).json({ server: "on", message: "server is online." });
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
