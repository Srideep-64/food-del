# Food Delivery App (MERN Stack)

A full-stack food ordering platform where users can browse a food menu, add items to cart, place orders, and pay online — plus an admin panel to manage food items and orders.

## Tech Stack

**Frontend (User)**
- React.js
- React Router
- Context API (cart & auth state)
- Axios
- CSS

**Admin Panel**
- React.js
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (authentication)
- Multer (image uploads)
- Stripe (payment gateway)
- Google Gemini API (AI-powered chatbot)

## Features

- User signup/login with JWT-based authentication
- Browse food items by category
- Add/remove items from cart
- Place orders and pay via Stripe
- Order status tracking
- Admin panel to add/remove food items
- Admin panel to view and update order status
- Image upload for food items
- AI-powered chatbot for mood/diet-based food recommendations (Gemini API)

## AI Recommendation Chatbot
Users can chat with an AI assistant describing their mood or dietary preference (e.g. "I'm feeling low and want something comforting"). The assistant reasons over the actual menu data using Google's Gemini API and recommends relevant items — grounded strictly in existing food items to prevent hallucinated suggestions — along with a short reason for each pick.

## Project Structure

```
food-del/
├── frontend/       # User-facing React app
├── admin/          # Admin panel React app
└── backend/        # Express + MongoDB API
```

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account 
- Stripe account for payment keys

### Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```
MONGO_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
GEMINI_API_KEY=
```
Run the server:
```bash
npm run server
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Admin Panel Setup
```bash
cd admin
npm install
npm run dev
```

## API Overview

| Route | Description |
|---|---|
| `/api/user` | User registration & login |
| `/api/food` | Add, list, remove food items |
| `/api/cart` | Add, remove, get cart items |
| `/api/order` | Place order, verify payment, list orders |
| `/api/chatbot` | AI-powered food recommendation based on mood/diet |

## License

This project is for educational/portfolio purposes.
