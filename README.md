# Menu Management API

A robust Node.js and Express-based backend service for comprehensive menu management, enabling seamless handling of categories, subcategories, and items with integrated tax calculation and search capabilities.

## 🚀 Key Features

### Core Functionality

- **Dynamic Menu Structure**: Create and manage a hierarchical menu system with categories, subcategories, and items
- **Smart Search**: Real-time item search with debounce effect for optimal performance
- **Tax Management**: Built-in tax calculation and configuration at multiple levels
- **Flexible CRUD Operations**: Complete Create, Read, Update, and Delete operations for all menu components

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

1. Clone the repository

```bash
git clone https://github.com/vedansh2001/Guestara.git
```

2. Install Dependencies

```bash
# Install backend dependencies
cd Guestara/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure Environment

- Rename `.example.env` to `.env`
- Update the following configurations:
  - Database credentials
  - Port settings
  - Other environment-specific variables

4. Launch the Application

```bash
# Start backend development server
cd ../backend
npm run dev

# Start frontend development server
cd ../frontend
npm run dev
```

The API will be available at `http://localhost:8000` (or your configured port)

## 📚 API Documentation

### Category Management

- Create categories with:
  - Custom names
  - Optional images
  - Detailed descriptions
  - Tax configurations
- Retrieve categories by ID or name
- Update category attributes
- List all categories

### Subcategory Operations

- Create subcategories within parent categories
- Configure subcategory-specific:
  - Images
  - Descriptions
  - Tax settings
- List subcategories by:
  - Parent category
  - Individual ID
  - Name

### Item Management

- Create items with:
  - Base pricing
  - Optional discounts
  - Tax settings
- Organize items under categories or subcategories
- Automatic total amount calculation
- Bulk item operations

### Search Functionality

- Real-time item search
- Case-insensitive matching
- Partial name matching support
- Debounced search implementation for performance

## 🔍 Testing & Demo

### API Testing

- Use the deployed Vercel backend: [Backend URL]
- Test via Postman or similar API tools

### Frontend Demo

- Access the basic frontend interface: [Frontend URL]
- Visualize database operations
- Test CRUD functionalities
- Monitor real-time updates

## 💡 Additional Information

The frontend provides a visual interface for testing and demonstrating the API capabilities. While primarily designed for testing, it offers a practical way to visualize the database operations and verify functionality.
