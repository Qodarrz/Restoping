const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Inisialisasi Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  dialectModule: require('mysql2'),
  pool: {
    max: 2,
    min: 0,
    idle: 0,
    evict: 0,
  }
});

// Health check berkala
setInterval(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected at:', new Date());
  } catch (err) {
    console.error('❌ Database health check failed:', err);
  }
}, 10000); // Setiap 10 detik

module.exports = sequelize;
