# Blog Editor Application

A professional full-stack blog application with auto-save draft functionality, built using React, Node.js, Express, and MongoDB.

## Features

- User authentication (register, login)
- Create, edit, save, and publish blogs
- Auto-save draft feature (after 5 seconds of inactivity)
- Visual notification when a blog is auto-saved
- View published blogs and drafts separately
- Tag blogs for better organization

## Tech Stack

- **Frontend**: React.js, Context API, CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Google Fonts, Responsive Design

## Project Structure

```
blog-adder/
├── backend/             # Node.js + Express.js server
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── .env             # Environment variables
│   ├── package.json     # Backend dependencies
│   └── server.js        # Entry point
│
└── frontend/            # React.js client
    ├── public/          # Static files
    ├── src/             # Source files
    │   ├── components/  # React components
    │   ├── context/     # Context API
    │   ├── pages/       # Page components
    │   ├── styles/      # CSS styles
    │   ├── utils/       # Utility functions
    │   ├── App.js       # Main App component
    │   └── index.js     # Entry point
    └── package.json     # Frontend dependencies
```

## Setup Guide

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/blog-adder.git
   cd blog-adder
   ```

2. Install all dependencies:
   ```bash
   npm run install-all
   ```

3. Create a `.env` file in the `backend/` directory with the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=8000
   JWT_SECRET=your_jwt_secret
   ```

4. Start the application:
   ```bash
   npm start
   ```

### Running Services Separately

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React application:
   ```bash
   npm start
   ```

## API Documentation

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login user
- **GET /api/auth/me** - Get current user (protected)
- **GET /api/blogs** - Get all blogs
- **GET /api/blogs/:id** - Get a blog by ID
- **POST /api/blogs/draft** - Create or update a draft (protected)
- **POST /api/blogs/publish** - Publish a blog (protected)
- **DELETE /api/blogs/:id** - Delete a blog (protected)

## Testing

1. Start the application: `npm start`
2. Register a new user account
3. Create and save a blog draft
4. Verify the auto-save functionality
5. Publish a blog
6. Test searching for blogs by title, content, or tags
7. Test editing and deleting blogs

