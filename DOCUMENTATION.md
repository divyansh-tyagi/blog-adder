# Blog Application User Guide

## Overview
This application allows users to create, edit, save, and publish blog posts. It features auto-saving drafts, tag management, and a user-friendly interface.

## Features

### User Authentication
- **Register**: Create a new account with username, email, and password
- **Login**: Access your account with email and password
- **Logout**: End your session securely

### Blog Management
- **Create New Blog**: Start writing a new blog post
- **Auto-Save**: Changes are automatically saved after 5 seconds of inactivity
- **Manual Save**: Save your progress at any time
- **Publish**: Make your blog visible to all users
- **Edit**: Update your existing blogs
- **Delete**: Remove blogs you no longer want
- **Tags**: Categorize blogs with comma-separated tags

### Search
- Find blogs by title, content, or tags

## Getting Started

### Creating a Blog
1. Login to your account
2. Click "Create New Blog" on the home page
3. Enter a title in the title field
4. Write your content in the main text area
5. Add tags separated by commas (optional)
6. Click "Save as Draft" to save without publishing
7. Click "Publish" when your blog is ready to be seen by others

### Editing a Blog
1. Click on any blog title to open it
2. Make changes to the title, content, or tags
3. Changes will auto-save after 5 seconds
4. You can manually save by clicking "Save as Draft"
5. To publish a draft, click "Publish"

### Using Tags
Tags help categorize your blogs and make them easier to find:
1. Enter tags in the tags field separated by commas
2. Example: "technology, programming, javascript"
3. Tags will appear on your published blog

### Searching for Blogs
1. Enter keywords in the search bar
2. Click "Search" or press Enter
3. Results will show blogs that match your search term in title, content, or tags

## Tips for Blog Writers
- Use clear, descriptive titles
- Break content into small paragraphs for readability
- Use relevant tags to help others discover your content
- Save your work frequently, even though auto-save is enabled
- Preview your content before publishing

---

# Developer Documentation

## Project Structure
The application follows a full-stack architecture with separate frontend and backend components:

### Backend (Node.js/Express/MongoDB)
- **server.js**: Entry point for the backend
- **config/**: Database configuration
- **controllers/**: Business logic for routes
- **middleware/**: Authentication middleware
- **models/**: Mongoose schema models
- **routes/**: API route definitions

### Frontend (React)
- **components/**: Reusable UI components
- **context/**: React context for state management
- **pages/**: Page components
- **utils/**: Helper functions and services
- **styles/**: CSS stylesheets

## Backend API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `GET /api/auth/me`: Get current user (protected)

### Blogs
- `GET /api/blogs`: Get all blogs
- `GET /api/blogs/:id`: Get a blog by ID
- `POST /api/blogs/draft`: Create or update a draft (protected)
- `POST /api/blogs/publish`: Publish a blog (protected)
- `DELETE /api/blogs/:id`: Delete a blog (protected)

## Frontend Components

### Core Components
- **App**: Main component with routing
- **Navbar**: Navigation component
- **BlogCard**: Card display for blog preview
- **BlogEditor**: Component for creating/editing blogs
- **SearchBar**: Component for searching blogs
- **Spinner**: Loading indicator

### Context
- **AuthContext**: Manages authentication state across the application

## Deployment

### Environment Variables
- **Backend**: Set in .env file
  - `MONGODB_URI`: MongoDB connection string
  - `PORT`: Server port (default: 8000)
  - `JWT_SECRET`: Secret for JWT token generation

- **Frontend**: Set in .env file
  - `REACT_APP_API_URL`: Backend API URL

### Production Deployment Steps
1. Set up environment variables
2. Build the frontend: `cd frontend && npm run build`
3. Serve the static files from the build directory
4. Start the backend server: `cd backend && npm start`

## Security Considerations
- JWT tokens expire after a set time
- Passwords are hashed using bcrypt
- Input validation is performed on all API endpoints
- MongoDB connection includes retry logic and error handling
