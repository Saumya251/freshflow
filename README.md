# FreshFlow 🌿

> A food traceability web app I built during my 9-week internship at TBI-GEU

## What is this?

FreshFlow is a web application that helps food processing businesses track their products from farm to shelf. I built this because most small food businesses still use paper records or Excel sheets to track their batches — which is slow, error-prone, and hard to share. FreshFlow replaces that with a simple digital dashboard where anyone in the business can log a product batch, check its current status, and get an AI-powered quality assessment in seconds.

## Live Links

- **App:** https://freshflow-hu4s.vercel.app
- **Backend API:** https://freshflow-api.onrender.com
- **GitHub:** https://github.com/Saumya251/freshflow

---

## Features

- Register and login with JWT authentication
- Add, view, edit and delete food product batches
- Dashboard showing live stats — how many products are Fresh, Processing, or Shipped
- AI quality analyzer — enter a product's details and Gemini AI gives you a freshness assessment, storage recommendations, and shelf life estimate
- Protected routes — guests are redirected to login automatically
- Responsive design that works on mobile and desktop
- Empty state components when no data exists
- React error boundary to handle unexpected crashes gracefully

---

## Tech Stack

I had not used most of these tools before this internship so there was a lot of learning along the way.

**Frontend**
- React 19 + Vite
- React Router v7
- Tailwind CSS
- Axios

**Backend**
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT + bcrypt
- Google Gemini API
- express-rate-limit
- express-validator

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas M0 free cluster

---

## How to Run Locally

You will need Node.js v18+ and a MongoDB Atlas account.

**1. Clone the repo**
```bash
git clone https://github.com/Saumya251/freshflow.git
```

**2. Backend setup**
```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=any_random_secret_string
GEMINI_API_KEY=your_gemini_api_key
```

```bash
npm run dev
```
Backend runs on http://localhost:5000

**3. Frontend setup**
```bash
cd freshflow
npm install
```

Create a `.env` file inside the freshflow folder:
```
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```
Frontend runs on http://localhost:5173

---

## API Endpoints

| Method | Route | Description | Auth |
|---|---|---|---|
| GET | /api/products | Get all products | No |
| GET | /api/products/:id | Get single product | No |
| GET | /api/products/search | Search by name | No |
| POST | /api/products | Add new product | Yes |
| PUT | /api/products/:id | Update product | Yes |
| DELETE | /api/products/:id | Delete product | Yes |
| POST | /api/auth/register | Create account | No |
| POST | /api/auth/login | Login | No |
| POST | /api/ai/analyze | AI quality analysis | Yes |

---

## Database Schema

**Product**
