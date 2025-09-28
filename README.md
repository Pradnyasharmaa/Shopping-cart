🛒 Simple Shopping Cart – ASE Challenge

A minimal full-stack e-commerce app built for the Associate Software Engineer (ASE) Challenge.
This project demonstrates a clean, functional shopping cart system using React + TypeScript (frontend) and Node.js + Express (backend).

🎯 Project Goal

Build a small e-commerce site where users can:

View a list of products

Add/remove items in a shopping cart

See quantities and total price

Checkout (send cart data to backend)

🚀 Features
✅ Core Features

Backend (Express.js)

GET /api/products → returns hardcoded JSON of products

POST /api/checkout → accepts cart items, logs order in console, returns success response

Frontend (React + TypeScript + Vite)

Product grid with images, names, prices

“Add to Cart” button on each product

Cart sidebar (offcanvas) with item details, quantities, and total

“Checkout” button → sends cart to backend

✨ Bonus Features Implemented

Quantity updates inside the cart

Cart persisted with localStorage

Checkout success/error alerts with backend integration

🛠️ Tech Stack

Frontend:

React 18 + TypeScript

Vite

React Router

React Bootstrap

Context API + custom useLocalStorage hook

Backend:

Node.js + Express.js

CORS middleware

JSON-based product data (items.json)

Testing:

Optional: Jest + Supertest (for backend API testing)

📂 Project Structure
shopping-cart/
├── backend/
│   ├── data/items.json       # Hardcoded products
│   ├── server.js             # Express backend
│   ├── package.json
│   └── package-lock.json
│
├── public/
│   └── imgs/                 # Product images
│
├── src/
│   ├── components/           # UI components (CartItem, ShoppingCart, StoreItem, Navbar)
│   ├── context/              # Shopping cart context
│   ├── hooks/                # useLocalStorage
│   ├── pages/                # Store, ProductDetails
│   ├── utilities/            # formatCurrency
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md

⚡ Quick Start
1️⃣ Backend Setup
cd backend
npm install
node server.js


Backend runs at: http://localhost:5000

Endpoints:

GET /api/products

POST /api/checkout

2️⃣ Frontend Setup
cd ..
npm install
npm run dev


Frontend runs at: http://localhost:5173 (Vite default)

Make sure frontend fetch calls point to your backend URL (http://localhost:5000/api/checkout).

🧪 Running Tests (Optional)

If you add backend tests with Jest + Supertest:

cd backend
npm test

📦 Sample API

GET /api/products

{
  "success": true,
  "data": [
    { "id": 1, "name": "iPhone 15 Pro", "price": 119900, "imgUrl": "/imgs/iphone15.png" }
  ],
  "count": 10
}


POST /api/checkout

Request Body

{
  "cartItems": [
    { "id": 1, "quantity": 2 },
    { "id": 3, "quantity": 1 }
  ]
}


Response

{
  "success": true,
  "message": "Order placed successfully!",
  "orderId": "ORDER-1695804234235",
  "totalAmount": 229800,
  "itemCount": 2
}

📖 Assumptions & Design Choices

Products stored in JSON file (items.json) instead of a database (per challenge requirements)

Cart fully client-side with persistence via localStorage

Checkout is simulated → logs orders on backend

Responsive UI built using React-Bootstrap

📹 Demo


✅ Completion Checklist

 Backend API returning hardcoded products

 Checkout endpoint logging orders

 Frontend product grid + cart state management

 Cart sidebar with quantities + total

 Checkout integration with backend

 Cart persistence using localStorage
