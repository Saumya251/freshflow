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
