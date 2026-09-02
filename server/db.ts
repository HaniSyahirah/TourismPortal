import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'mysql-16ae5f6b-norhanisya123.g.aivencloud.com',
  port: Number(process.env.DB_PORT) || 26264,
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD || 'AVNS_HBlXAhKZNCR9YT6Uw1p',
  database: process.env.DB_NAME || 'defaultdb',
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    rejectUnauthorized: false
  }
});

// Auto-create table when server starts
async function initDatabase() {
  try {
    const connection = await db.getConnection();
    console.log(' DATABASE CONNECTED SUCCESSFULLY TO CLOUD!');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        booking_ref VARCHAR(30) NOT NULL UNIQUE,
        full_name VARCHAR(255) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        travel_date DATE NOT NULL,
        pax_count INT NOT NULL,
        package_type VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        special_requests TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await connection.query(createTableQuery);
    console.log(' BOOKINGS TABLE IS READY!');
    connection.release();
  } catch (err: any) {
    console.error(' DATABASE CONNECTION FAILED:', err.message);
  }
}

initDatabase();
