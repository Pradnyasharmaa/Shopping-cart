# 🛒 Simple Shopping Cart – ASE Challenge

A **minimal full-stack e-commerce application** built for the **Associate Software Engineer (ASE) Challenge**, demonstrating a clean, functional shopping cart system using **React + TypeScript** (frontend) and **Node.js + Express** (backend).

## 🎯 Project Goal

Build a small e-commerce site where users can:

- View a list of products
- Add/remove items in a shopping cart
- See quantities and total price
- Checkout (send cart data to backend)

## 🚀 Features

### ✅ Core Features

#### Backend (Express.js)
- `GET /api/products` → Returns hardcoded JSON of products
- `POST /api/checkout` → Accepts cart items, logs order in console, returns success response

#### Frontend (React + TypeScript + Vite)
- Product grid with images, names, and prices
- "Add to Cart" button on each product
- Cart sidebar (offcanvas) showing item details, quantities, and total
- "Checkout" button → Sends cart to backend

### ✨ Bonus Features Implemented

- Quantity updates inside the cart
- Cart persisted with **localStorage**
- Checkout success/error alerts with backend integration

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- React Router
- React Bootstrap
- Context API + custom `useLocalStorage` hook

### Backend
- Node.js + Express.js
- CORS middleware
- JSON-based product data (`items.json`)

### Testing (Optional)
- Jest + Supertest (for backend API testing)

## 📂 Project Structure

```
shopping-cart/
├── backend/
│   ├── data/
│   │   └── items.json         # Hardcoded products
│   ├── server.js              # Express backend
│   ├── package.json
│   └── package-lock.json
│
├── public/
│   └── imgs/                  # Product images
│
├── src/
│   ├── components/            # UI components
│   │   ├── CartItem.tsx
│   │   ├── ShoppingCart.tsx
│   │   ├── StoreItem.tsx
│   │   └── Navbar.tsx
│   ├── context/               # Shopping cart context
│   ├── hooks/                 # useLocalStorage
│   ├── pages/                 # Store, ProductDetails
│   ├── utilities/             # formatCurrency
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## ⚡ Quick Start

### 1️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

**Backend runs at:** `http://localhost:5000`

**Available Endpoints:**
- `GET /api/products`
- `POST /api/checkout`

### 2️⃣ Frontend Setup

```bash
cd ..
npm install
npm run dev
```

**Frontend runs at:** `http://localhost:5173` (Vite default)

> **Note:** Make sure frontend fetch calls point to your backend URL (`http://localhost:5000/api/checkout`)

## 🧪 Running Tests (Optional)

If you add backend tests with **Jest + Supertest**:

```bash
cd backend
npm test
```

**Expected Test Results:**
- ✅ `/api/products` returns JSON with products
- ✅ Response has correct structure (`id`, `name`, `price`, `imgUrl`)

## 📦 API Documentation

### GET /api/products

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "price": 119900,
      "imgUrl": "/imgs/iphone15.png"
    }
  ],
  "count": 10
}
```

### POST /api/checkout

**Request Body:**
```json
{
  "cartItems": [
    { "id": 1, "quantity": 2 },
    { "id": 3, "quantity": 1 }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order placed successfully!",
  "orderId": "ORDER-1695804234235",
  "totalAmount": 229800,
  "itemCount": 2
}
```

## 📖 Assumptions & Design Choices

- **Products Storage:** Products are stored in a **JSON file** (`items.json`) instead of a database (per challenge requirements)
- **Cart Management:** Cart is fully client-side with persistence via **localStorage**
- **Checkout Process:** Checkout is simulated → logs orders on backend console
- **UI Framework:** Responsive UI built using **React-Bootstrap**
- **State Management:** Uses React Context API for cart state management

## 🎬 Demo
https://drive.google.com/file/d/1tohjjMrudnhM4-9w6WmmWhXVWBkFVmMY/view?usp=sharing

## ✅ Completion Checklist

- [x] Backend API returning hardcoded products
- [x] Checkout endpoint logging orders
- [x] Frontend product grid + cart state management
- [x] Cart sidebar with quantities + total
- [x] Checkout integration with backend
- [x] Cart persistence using **localStorage**

## 🚀 Future Enhancements

- [ ] User authentication
- [ ] Product search and filtering
- [ ] Order history
- [ ] Payment integration
- [ ] Database integration
- [ ] Unit and integration tests

