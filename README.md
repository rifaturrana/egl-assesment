# User Management API - Next.js

This project provides a user management API built with Next.js (App Router), JavaScript, MongoDB (Mongoose), and JWT authentication.

## Features
- User signup and authentication
- Secure API routes using JWT middleware
- MongoDB database integration using Mongoose

---

## Installation & Setup

### Prerequisites
- Node.js (>= 16)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/rifaturrana/egl-assesment.git
   cd egl-assesment
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:** Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```
4. **Run the development server:**
   ```sh
   npm run dev
   ```
   The API will be available at `http://localhost:3000`.

---

## API Endpoints

### 1. Fetch All Users
- **Endpoint:** `GET /api/users`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "users": [
      { "_id": "1", "name": "John Doe", "email": "john@example.com" }
    ]
  }
  ```

### 2. Fetch a User by ID
- **Endpoint:** `GET /api/users/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "user": { "_id": "1", "name": "John Doe", "email": "john@example.com" }
  }
  ```

### 3. Create a New User (Signup)
- **Endpoint:** `POST /api/users`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User created"
  }
  ```

### 4. User Login
- **Endpoint:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "your-jwt-token"
  }
  ```

---

## Testing the API with Postman

1. **Start the server** (`npm run dev`).
2. **Create a new user** (`POST /api/users`).
3. **Login** (`POST /api/auth/login`) and copy the token.
4. **Use the token** in the `Authorization` header for other endpoints.

---

##  Webhook Integration (In Progress)
I am currently exploring how webhooks function and how they can be integrated into this project. While I have not yet used webhooks, I have researched their purpose and implementation methods. With the help of AI, I have started writing code to integrate webhooks into the user management system, but I am still working on fully understanding how the API works and how to utilize webhooks effectively within this context.

## Technologies Used
- **Next.js (App Router)** – API routes with `server.js`.
- **MongoDB & Mongoose** – Database management.
- **JWT Authentication** – Secure API access.
- **Bcrypt.js** – Password hashing.
- **Postman** – API testing.

---

## License
This project is open-source and available under the [MIT License](LICENSE).

