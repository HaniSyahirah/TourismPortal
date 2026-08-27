import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tourism_db',
  waitForConnections: true,
  connectionLimit: 10,
});

// Test sambungan secara automatik
db.getConnection()
  .then((connection) => {
    console.log(' DATABASE CONNECTED SUCCESSFULLY!');
    connection.release();
  })
  .catch((err) => {
    console.error(' DATABASE CONNECTION FAILED:', err.message);
  });