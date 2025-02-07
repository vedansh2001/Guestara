# GuestAra - Menu Management API 🍽️

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Node.js](https://img.shields.io/badge/Node.js-Latest_LTS-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green.svg)

A robust Node.js and Express-based backend service for comprehensive menu management, enabling seamless handling of categories, subcategories, and items with integrated tax calculation and search capabilities.

## 📑 Table of Contents

- [Key Features](#-key-features)
- [Installation Guide](#️-installation-guide)
- [API Documentation](#-api-documentation)
- [Data Models](#-data-models)
- [Testing & Demo](#-testing--demo)
- [Additional Information](#-additional-information)

## 🚀 Key Features

### Core Functionality

- **Dynamic Menu Structure**: Hierarchical menu system with categories, subcategories, and items
- **Smart Search**: Real-time item search with debounce effect
- **Tax Management**: Built-in tax calculation at multiple levels
- **Flexible CRUD Operations**: Complete management of all menu components

### Technical Highlights

- Built with Node.js and Express
- MongoDB database integration
- RESTful API architecture
- Vercel deployment ready

## 🛠️ Installation Guide

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- MongoDB database access

### Setup Steps

1. **Clone the repository**

```bash
git clone https://github.com/vedansh2001/Guestara.git
```

2. **Install Dependencies**

```bash
# Install backend dependencies
cd Guestara/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Configure Environment**

Backend Setup:

- Rename `example.env` to `.env` in backend/src
- Update environment variables:

```bash
# Server Configuration
PORT=8000

# Database Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/database
```

Frontend Setup:

- Rename `example.env` to `.env`
- Update environment variables:

```bash
VITE_BASE_URL=http://localhost:8000/api
```

4. **Launch the Application**

```bash
# Start backend development server
cd ../backend
npm run dev

# Start frontend development server
cd ../frontend
npm run dev
```

## 📦 API Documentation

### Base URL

```
https://guestara-back-end.vercel.app/api
```

### Categories Endpoints

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| POST   | `/categories`     | Create a new category   |
| GET    | `/categories`     | Retrieve all categories |
| GET    | `/categories/:id` | Get a specific category |
| PUT    | `/categories/:id` | Update a category       |
| DELETE | `/categories/:id` | Delete a category       |

#### Category Request Body

```json
{
  "name": "Category Name",
  "image": "image_url",
  "description": "Some description",
  "taxApplicability": true,
  "tax": 5,
  "taxType": "percentage"
}
```

### Subcategories Endpoints

| Method | Endpoint                              | Description                   |
| ------ | ------------------------------------- | ----------------------------- |
| POST   | `/subcategories/:categoryId`          | Create a new subcategory      |
| GET    | `/subcategories`                      | Retrieve all subcategories    |
| GET    | `/subcategories/category/:categoryId` | Get subcategories by category |
| GET    | `/subcategories/:id`                  | Get a specific subcategory    |
| PUT    | `/subcategories/:id`                  | Update a subcategory          |
| DELETE | `/subcategories/:id`                  | Delete a subcategory          |

#### Subcategory Request Body

```json
{
  "name": "Subcategory Name",
  "image": "image_url",
  "description": "Some description",
  "taxApplicability": true,
  "tax": 5
}
```

### Items Endpoints

| Method | Endpoint                            | Description              |
| ------ | ----------------------------------- | ------------------------ |
| POST   | `/items`                            | Create a new item        |
| GET    | `/items/category/:categoryId`       | Get items by category    |
| GET    | `/items/subcategory/:subCategoryId` | Get items by subcategory |
| GET    | `/items/search?name=ItemName`       | Search items by name     |
| GET    | `/items/:id`                        | Get a specific item      |
| PUT    | `/items/:id`                        | Update an item           |
| DELETE | `/items/:id`                        | Delete an item           |

#### Item Request Body

```json
{
  "name": "Item Name",
  "image": "image_url",
  "description": "Some description",
  "taxApplicability": true,
  "tax": 5,
  "baseAmount": 100,
  "discount": 10,
  "totalAmount": 90,
  "subCategory": "subCategoryId",
  "category": "categoryId"
}
```

## 📊 Data Models

### Category Schema

```javascript
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    taxApplicability: { type: Boolean, required: true },
    tax: { type: Number, default: 0 },
    taxType: { type: String, required: true },
  },
  { timestamps: true }
);
```

### Subcategory Schema

```javascript
const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    taxApplicability: { type: Boolean, default: true },
    tax: { type: Number, default: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);
```

### Item Schema

```javascript
const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    taxApplicability: { type: Boolean, required: true },
    tax: { type: Number, default: 0 },
    baseAmount: { type: Number, required: true },
    discount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);
```

## 🔍 Testing & Demo

### API Testing

- Deployed Backend URL: https://guestara-back-end.vercel.app/api
- I tested all the CRUD operations using **Postman**.
- You can import the Postman collection using the provided file in the repository.

### How to Use the Postman Collection

1. Open Postman.
2. Click on **Import**.
3. Select the `guestara_postman_collection.json` file from this repository (backend/src).
4. Run the saved API requests.

### Frontend Demo

- Access the frontend for visual testing: https://guestara-crud.vercel.app/
- Test CRUD functionalities in real-time
- Monitor database operations visually

## ⚠️ Important Notes

1. All `:id` parameters must be valid MongoDB ObjectIDs
2. Data type validation:
   - Ensure proper data types (`Boolean`, `Number`, `String`)
   - All required fields must be included
3. The API follows RESTful conventions
4. All responses include HTTP status codes
5. Timestamps are automatically managed

## 🔐 Error Handling

Standard HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Server Error

## 🔄 Response Format

```json
{
  "success": true,
  "data": {
    // Retrieved/created/updated data
  },
  "message": "Operation successful"
}
```

## 💡 Additional Information

The frontend provides a visual interface for testing and demonstrating the API capabilities. While primarily designed for testing, it offers a practical way to visualize the database operations and verify functionality.

## Reflection

### 1. Which database have you chosen and why?

I chose **MongoDB** because it is a flexible NoSQL database that allows easy storage of hierarchical data structures like categories, subcategories, and items. It also integrates well with Node.js using Mongoose, making data handling more efficient.

### 2. Three things I learned from this assignment:

- How to structure a RESTful API for a hierarchical data model.
- Implementing efficient **search functionality** in a backend system.
- Managing relationships between models using **MongoDB and Mongoose**.

### 3. What was the most difficult part of the assignment?

The most challenging part was handling **nested relationships** between categories, subcategories, and items while ensuring proper validation and efficient queries.

### 4. What would I have done differently given more time?

If given more time, I would have:

- Implemented authentication & authorization for better security.
- Added pagination for better API performance.
- Written unit tests to ensure API reliability.
