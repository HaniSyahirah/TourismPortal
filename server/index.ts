import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';

// Resolve directory paths for ES Modules / tsx
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from Vite build output directory (dist)
app.use(express.static(path.join(__dirname, '../dist')));

// 1. Health Check & Test Routes
app.get('/api/health', (req, res) => {
  res.send('API Server is running!');
});

// 2. Route Ujian Database
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ status: 'SUCCESS', message: 'Database Connected!', data: rows });
  } catch (error: any) {
    res.status(500).json({ status: 'ERROR', message: error.message });
  }
});

// 3. Route Destinations (Ambil semua destinasi)
app.get('/api/destinations', async (req, res) => {
  try {
    const [rows]: any = await db.query('SELECT * FROM destinations');
    
    // Format semula data supaya sepadan dengan interface TypeScript
    const formattedData = rows.map((item: any) => {
      let parsedHighlights = [];
      
      // Safe JSON parse supaya server tidak crash jika format JSON rosak
      if (typeof item.highlights === 'string') {
        try {
          parsedHighlights = JSON.parse(item.highlights);
        } catch {
          parsedHighlights = [];
        }
      } else if (Array.isArray(item.highlights)) {
        parsedHighlights = item.highlights;
      }

      return {
        id: item.id,
        name: item.name,
        state: item.state,
        tagline: item.tagline,
        description: item.description,
        imageUrl: item.imageUrl,
        highlights: parsedHighlights,
        category: item.category,
        coordinates: {
          lat: parseFloat(item.lat) || 0,
          lng: parseFloat(item.lng) || 0
        }
      };
    });

    res.json(formattedData);
  } catch (error: any) {
    res.status(500).json({ status: 'ERROR', message: error.message });
  }
});

// 4. Route Tourism Businesses (Ambil semua perniagaan)
app.get('/api/businesses', async (req, res) => {
  try {
    const [rows]: any = await db.query('SELECT * FROM tourism_businesses');
    
    // Convert nilai rating kepada number (float)
    const formattedData = rows.map((item: any) => ({
      ...item,
      rating: parseFloat(item.rating) || 0
    }));

    res.json(formattedData);
  } catch (error: any) {
    res.status(500).json({ status: 'ERROR', message: error.message });
  }
});

// 5. Route Bookings (Simpan Tempahan Baru)
app.post('/api/bookings', async (req, res) => {
  try {
    const { fullName, destination, travelDate, paxCount, packageType, email, phone, specialRequests } = req.body;

    // Cipta Kod Rujukan Unik
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `EM-2026-${randomCode}`;

    // Pastikan tarikh diformat ke YYYY-MM-DD untuk MySQL DATE field
    const formattedTravelDate = travelDate ? new Date(travelDate).toISOString().split('T')[0] : null;

    // Simpan ke MySQL database
    const query = `
      INSERT INTO bookings (booking_ref, full_name, destination, travel_date, pax_count, package_type, email, phone, special_requests)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(query, [
      bookingRef,
      fullName,
      destination,
      formattedTravelDate,
      paxCount,
      packageType,
      email || null,
      phone || null,
      specialRequests || null
    ]);

    const submittedAt = new Date().toLocaleString('en-MY', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    res.status(201).json({
      status: 'SUCCESS',
      message: 'Booking created successfully!',
      data: {
        ...req.body,
        bookingRef,
        submittedAt
      }
    });
  } catch (error: any) {
    res.status(500).json({ status: 'ERROR', message: error.message });
  }
});

// 6. Wildcard route to serve React/Vite index.html for page reloads
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
