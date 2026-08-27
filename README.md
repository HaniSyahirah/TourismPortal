# Explore Malaysia — ARC4213 Cloud Computing Lab Assessment

**Course:** ARC4213 – Cloud Computing  
**Assessment:** Lab Assessment — Cloud-Based Web Application Deployment  
**Industry:** Tourism (Malaysia)  
**Application Type:** Simple Responsive Tourism Web Application

---

## 1. Project Overview

**Explore Malaysia** is a responsive, cloud-deployable web application developed for the **ARC4213 Cloud Computing Lab Assessment**. It serves as an interactive tourism portal highlighting 10 iconic destinations across Peninsular and East Malaysia, integrating live meteorological forecasts from the public **Open-Meteo REST API**, providing a straightforward tour booking engine with instant reference confirmation, and presenting a curated directory of local tourism providers (Hotels, Restaurants, and Travel Agencies).

The architecture is deliberately clean, lightweight, and single-tier (React SPA with TypeScript & Tailwind CSS), designed for easy local execution from a downloaded ZIP and simple zero-cost deployment to free-tier cloud platforms such as Google Cloud Run, Vercel, or Netlify.

---

## 2. The 5 Core Assessment Features

| # | Feature | Description | Implementation Details |
|---|---|---|---|
| 1 | **Tourism Portfolio** (Home) | Engaging hero section with tagline, introduction to Malaysia, quick statistics, spotlight cards, and quick navigation buttons to all modules. | Responsive layout, dark/light theme toggle, direct tab routing. |
| 2 | **Destination Showcase** | Curated catalog of **10 Malaysian destinations** (Kuala Lumpur, Langkawi, Penang, Melaka, Sabah, Sarawak, Cameron Highlands, Genting Highlands, Perhentian Islands, Johor Bahru). | Real-time search by keyword, category filter pills (*Island, Heritage, Nature, City, Mountain*), and detailed modal with key highlights. |
| 3 | **Real-Time Weather App** | Destination-based weather forecast powered by the **Open-Meteo REST API**. | Live HTTP GET using precise GPS coordinates, displaying Temperature (°C), Weather Condition, Apparent Temp, Wind Speed, with user-friendly loading and error states. |
| 4 | **Simple Booking System** | Clean tour reservation form capturing Full Name, Destination, Travel Date, Number of People, and Package Tier (*Basic, Standard, Premium*). | Client-side validation (past date prevention, positive pax count, required fields), instant confirmation screen with a generated reference code (`EM-2026-XXXX`). |
| 5 | **Tourism Business Directory** | Directory of featured Malaysian businesses across 3 categories: **Hotels**, **Restaurants**, and **Travel Agencies**. | Category filtering, search functionality, contact phone, email, location, and official website links. |

---

## 3. Technology Stack

- **Frontend / Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS (Modern Malaysian emerald & teal palette, dark mode support)
- **Icons:** Lucide React
- **Weather API:** Open-Meteo Free Public REST API (No API keys or billing required)
- **Build Tool:** Vite (Ultra-fast build and bundling)
- **Deployment Targets:** Google Cloud Run, Vercel, Netlify, or standard static web hosts

---

## 4. How to Run the Application Locally

### Prerequisites
- **Node.js** (version 18.x or higher)
- **npm** (comes bundled with Node.js)

### Step-by-Step Instructions

1. **Extract the ZIP file** to your preferred folder:
   ```bash
   unzip explore-malaysia.zip
   cd explore-malaysia
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 5. How the Weather API Integration Works

The Weather App connects to the public **Open-Meteo API** (`https://api.open-meteo.com/v1/forecast`), which provides free global weather data without requiring API keys or authentication headers.

### Workflow:
1. When a user selects one of the 10 Malaysian destinations, the application retrieves its stored latitude and longitude (e.g., Kuala Lumpur: `lat: 3.1390`, `lng: 101.6869`).
2. A `fetch()` GET request is dispatched to:
   ```
   https://api.open-meteo.com/v1/forecast?latitude=3.1390&longitude=101.6869&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&timezone=Asia%2FKuala_Lumpur
   ```
3. The response payload provides:
   - `temperature_2m`: Current temperature in degrees Celsius
   - `apparent_temperature`: "Feels like" temperature
   - `wind_speed_10m`: Wind velocity in km/h
   - `weather_code`: WMO standard weather code mapped to clear human descriptions (e.g., *Clear Sky*, *Partly Cloudy*, *Tropical Rain Showers*).
4. If a network interruption occurs, the component gracefully catches the error and displays a clear retry prompt without breaking the page.

---

## 6. How to Build & Prepare for Cloud Deployment

To generate the optimized static production build:

```bash
npm run build
```

This compiles all TypeScript and JSX into an optimized `/dist` folder containing `index.html`, minified JavaScript, and CSS.

---

## 7. Cloud Deployment Steps (Google Cloud Run / Free Hosting)

### Option A: Google Cloud Run (Containerized / Cloud Build)

1. **Authenticate and set Google Cloud project:**
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **Submit build to Google Container Registry / Artifact Registry:**
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/explore-malaysia:latest
   ```

3. **Deploy to Cloud Run (Managed, Serverless):**
   ```bash
   gcloud run deploy explore-malaysia \
     --image gcr.io/YOUR_PROJECT_ID/explore-malaysia:latest \
     --platform managed \
     --region asia-southeast1 \
     --allow-unauthenticated \
     --port 3000
   ```

4. Cloud Run will output a live HTTPS URL (e.g., `https://explore-malaysia-xxxxx.asia-southeast1.run.app`).

### Option B: Vercel / Netlify (Zero-Configuration Free Tier)

1. Run `npm run build`.
2. Connect your Git repository or drag-and-drop the `/dist` folder directly onto **Vercel** or **Netlify**.
3. Set build command to `npm run build` and publish directory to `dist`.

---

## 8. How to Demonstrate a Live Update (During Presentation)

To prove cloud-native deployment and rapid CI/CD during the lab assessment presentation:

1. **Edit a visible text element** in `src/components/HeroSection.tsx`, for example:
   - Change: `"Discover • Explore • Experience Malaysia"`
   - To: `"Discover More of Malaysia — ARC4213 Demo"`
2. **Rebuild the production package:**
   ```bash
   npm run build
   ```
3. **Redeploy the updated image or files to Cloud Run / Hosting:**
   ```bash
   gcloud run deploy explore-malaysia --image gcr.io/YOUR_PROJECT_ID/explore-malaysia:latest
   ```
4. **Refresh the public URL** in front of the lecturer to show the immediate zero-downtime update.

---

## 9. Project Directory Structure

```
explore-malaysia/
├── index.html                  # Main HTML entry point
├── package.json                # Project dependencies and build scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite bundler configuration
├── Dockerfile                  # Multi-stage container file (Nginx static serving)
├── .dockerignore               # Container build exclusions
├── metadata.json               # Application metadata
├── README.md                   # Assessment documentation and deployment guide
└── src/
    ├── main.tsx                # React DOM mounting entry point
    ├── App.tsx                 # Root component & module router
    ├── index.css               # Global CSS & Tailwind imports
    ├── types.ts                # TypeScript interfaces (Destinations, Bookings, Businesses)
    ├── data/
    │   ├── destinations.ts     # 10 curated Malaysian destinations with GPS coordinates
    │   └── businesses.ts       # 9 featured tourism providers (Hotels, Restaurants, Agencies)
    └── components/
        ├── Navbar.tsx          # Navigation bar with dark mode toggle & mobile drawer
        ├── HeroSection.tsx     # Feature 1: Tourism portfolio & hero section
        ├── DestinationPortfolio.tsx # Feature 2: Destination showcase with search & filters
        ├── WeatherApp.tsx      # Feature 3: Open-Meteo live weather radar
        ├── BookingSystem.tsx   # Feature 4: Simple tour booking form & confirmation
        ├── TourismBusinesses.tsx # Feature 5: Tourism business directory (3 categories)
        ├── BusinessFooter.tsx  # Application footer with course details
        └── BackToTop.tsx       # Smooth scroll-to-top utility button
```

---

## 10. Presentation Checklist (20–25 Minute Flow)

- [ ] **1. Introduction (2 mins):** Explain the ARC4213 assessment objectives and architecture.
- [ ] **2. Feature 1 - Tourism Portfolio (3 mins):** Tour the hero section, stats, and theme toggling.
- [ ] **3. Feature 2 - Destination Showcase (4 mins):** Demonstrate search, category filters, and modal details across the 10 destinations.
- [ ] **4. Feature 3 - Live Weather (4 mins):** Select various destinations and demonstrate real-time meteorological API responses from Open-Meteo.
- [ ] **5. Feature 4 - Booking System (4 mins):** Demonstrate form validation, error handling, date picker constraints, and reference generation (`EM-2026-XXXX`).
- [ ] **6. Feature 5 - Tourism Businesses (3 mins):** Filter across Hotels, Restaurants, and Travel Agencies with contact actions.
- [ ] **7. Cloud Architecture & Live Update Demo (5 mins):** Explain cloud hosting, Dockerfile/build process, and trigger a live code modification.
