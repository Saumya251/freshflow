## Database
**Choice:** MongoDB Atlas (NoSQL)
**Why:** FreshFlow stores food product data with flexible fields, 
making document-based storage ideal over rigid SQL tables.
**ODM:** Mongoose

## Schema
Product model fields:
- name (String, required)
- origin (String, required)
- status (String: Fresh/Processing/Shipped)
- date (String, required)

## Set up the database
1. Create a free MongoDB Atlas account at mongodb.com/cloud/atlas
2. Create a free M0 cluster
3. Get your connection string from Connect → Drivers
4. Add MONGO_URI to your .env file
5. Run npm run dev — Mongoose connects automatically

6. ## 🚀 Deployment

### Live URLs
- **Frontend:** https://freshflow-hu4s.vercel.app
- **Backend:** https://freshflow-api.onrender.com
- **GitHub:** https://github.com/Saumya251/freshflow

### Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** JWT + bcrypt
- **AI Feature:** Google Gemini API
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render

### Known Limitations (Free Tier)
- Render free tier spins down after 15 minutes of inactivity
- First request after idle period takes 30-60 seconds to wake up
- Gemini API has daily request limits on free tier
- MongoDB Atlas M0 free cluster has 512MB storage limit
