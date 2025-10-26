# Product Review API

A Node.js API for managing product reviews and ratings.

## Features

*   Create, read, update, and delete product reviews.
*   Authentication and authorization using JWT.
*   Rate limiting to prevent abuse.
*   Input validation to ensure data integrity.
*   MongoDB integration for persistent storage.

## Folder Structure


├── server.js          # Main entry point
├── routes             # Defines API routes
│   └── reviews.js     # Review routes
│   └── auth.js       # Authentication routes
├── controllers        # Handles request logic
│   └── reviews.js     # Review controllers
│   └── auth.js       # Authentication controllers
├── models             # Defines data models
│   └── Review.js      # Review model
│   └── User.js        # User model
├── middlewares        # Middleware functions
│   └── auth.js       # Authentication middleware
│   └── error.js      # Error handling middleware
│   └── rateLimit.js  # Rate limiting middleware
├── utils              # Utility functions
│   └── jwt.js         # JWT helper functions
│   └── validator.js # Data validation functions
├── .env               # Environment variables
└── package.json       # Project dependencies


## Installation

1.  Clone the repository:
    
    git clone <repository_url>
    cd product-review-api
    

2.  Install dependencies:
    
    npm install
    

3.  Configure environment variables:
    *   Create a `.env` file in the root directory.
    *   Set the following environment variables:
        *   `MONGODB_URI`: MongoDB connection string.
        *   `JWT_SECRET`: Secret key for JWT signing.
        *   `PORT`: Port for the server to listen on (default: 3000).

## Usage

1.  Start the server:
    
    npm start
    

2.  Access the API endpoints:
    *   Reviews: `/api/reviews`
    *   Authentication: `/api/auth`

## API Endpoints

### Reviews

*   `GET /api/reviews`: Get all reviews.
*   `GET /api/reviews/:id`: Get a specific review by ID.
*   `POST /api/reviews`: Create a new review (requires authentication).
*   `PUT /api/reviews/:id`: Update an existing review (requires authentication).
*   `DELETE /api/reviews/:id`: Delete a review (requires authentication).

### Authentication

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Login and get a JWT.

## Authentication

All protected routes require a valid JWT in the `Authorization` header.

## Error Handling

The API returns JSON error responses with appropriate status codes.
