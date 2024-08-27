# Orderly - E-Commerce Application with Express and TypeScript

## Overview

This project is an Express application developed with TypeScript, integrating MongoDB with Mongoose for data management. It includes endpoints for managing products and orders, with data validation handled by Zod. The application features CRUD operations for products and orders, as well as inventory management to ensure data integrity.

## Project Structure

- **`/api/products`**: Endpoints for managing products.
- **`/api/orders`**: Endpoints for managing orders.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a cloud instance)
- TypeScript

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ShafayetAhmad/Orderly_Backend.git
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```
    PORT=3000
    MONGODB_URI=
   ```

4. **Run the Application**

   ```bash
   npm run dev
   npm run build
   npm run start
   ```

   The application will start and be accessible at `http://localhost:3000`.

## API Endpoints

### Product Management

1. **Create a New Product**

   - **Endpoint:** `POST /api/products`
   - **Request Body:**

     ```json
     {
       "name": "iPhone 13",
       "description": "A sleek and powerful smartphone with cutting-edge features.",
       "price": 999,
       "category": "Electronics",
       "tags": ["smartphone", "Apple", "iOS"],
       "variants": [
         {
           "type": "Color",
           "value": "Midnight Blue"
         },
         {
           "type": "Storage Capacity",
           "value": "256GB"
         }
       ],
       "inventory": {
         "quantity": 50,
         "inStock": true
       }
     }
     ```

   - **Response:**

     ```json
     {
       "success": true,
       "message": "Product created successfully!",
       "data": { ... }
     }
     ```

2. **Retrieve a List of All Products**

   - **Endpoint:** `GET /api/products`
   - **Response:**

     ```json
     {
       "success": true,
       "message": "Products fetched successfully!",
       "data": [ ... ]
     }
     ```

3. **Retrieve a Specific Product by ID**

   - **Endpoint:** `GET /api/products/:productId`
   - **Response:**

     ```json
     {
       "success": true,
       "message": "Product fetched successfully!",
       "data": { ... }
     }
     ```

4. **Update Product Information**

   - **Endpoint:** `PUT /api/products/:productId`
   - **Request Body:**

     ```json
     {
       "name": "iPhone 13",
       "description": "A sleek and powerful smartphone with cutting-edge features.",
       "price": 999,
       "category": "Electronics",
       "tags": ["smartphone", "Apple", "iOS"],
       "variants": [
         {
           "type": "Color",
           "value": "Midnight Blue"
         },
         {
           "type": "Storage Capacity",
           "value": "256GB"
         }
       ],
       "inventory": {
         "quantity": 50,
         "inStock": true
       }
     }
     ```

   - **Response:**

     ```json
     {
       "success": true,
       "message": "Product updated successfully!",
       "data": { ... }
     }
     ```

5. **Delete a Product**

   - **Endpoint:** `DELETE /api/products/:productId`
   - **Response:**

     ```json
     {
       "success": true,
       "message": "Product deleted successfully!",
       "data": null
     }
     ```

6. **Search for Products**

   - **Endpoint:** `GET /api/products?searchTerm=iphone`
   - **Response:**

     ```json
     {
       "success": true,
       "message": "Products matching search term 'iphone' fetched successfully!",
       "data": [ ... ]
     }
     ```

### Order Management

1. **Create a New Order**

   - **Endpoint:** `POST /api/orders`
   - **Request Body:**

     ```json
     {
       "email": "level2@programming-hero.com",
       "productId": "5fd67e890b60c903cd8544a3",
       "price": 999,
       "quantity": 1
     }
     ```

   - **Response:**

     ```json
     {
       "success": true,
       "message": "Order created successfully!",
       "data": { ... }
     }
     ```

2. **Retrieve All Orders**

   - **Endpoint:** `GET /api/orders`
   - **Response:**

     ```json
     {
       "success": true,
       "message": "Orders fetched successfully!",
       "data": [ ... ]
     }
     ```

3. **Retrieve Orders by User Email**

   - **Endpoint:** `GET /api/orders?email=level2@programming-hero.com`
   - **Response:**

     ```json
     {
       "success": true,
       "message": "Orders fetched successfully for user email!",
       "data": [ ... ]
     }
     ```

## Validation

- **Zod**: Used for data validation to ensure that the data adheres to the specified structure.

## Error Handling

- **Insufficient Quantity Error**

  ```json
  {
    "success": false,
    "message": "Insufficient quantity available in inventory"
  }
  ```

- **Not Found Error**

  ```json
  {
    "success": false,
    "message": "Order not found"
  }
  ```

- **Not Found Route**

  ```json
  {
    "success": false,
    "message": "Route not found"
  }
  ```

## License

This project is licensed under the MIT License.
