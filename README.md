# Blog Adder App

## Overview
The Blog Adder App is a full-stack blogging platform that allows users to create, edit, and manage blogs. It includes features such as user authentication, blog editing, auto-saving drafts, and search functionality. The application is built using modern web technologies and follows a modular structure for scalability and maintainability.

---

## Project Structure

```
blog-adder/
├── backend/                # Backend codebase
│   ├── config/            # Database configuration
│   │   └── db.js
│   ├── controllers/       # API controllers
│   │   ├── authController.js
│   │   └── blogController.js
│   ├── middleware/        # Middleware for authentication
│   │   └── auth.js
│   ├── models/            # Mongoose models
│   │   ├── Blog.js
│   │   └── User.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   └── blogs.js
│   └── server.js          # Entry point for the backend server
├── frontend/               # Frontend codebase
│   ├── public/            # Static files
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/               # React application source code
│   │   ├── components/   # Reusable UI components
│   │   │   ├── BlogCard.js
│   │   │   ├── Navbar.js
│   │   │   ├── SearchBar.js
│   │   │   ├── Spinner.js
│   │   │   └── Toast.js
│   │   ├── context/       # React Context for state management
│   │   │   └── AuthContext.js
│   │   ├── pages/         # Application pages
│   │   │   ├── BlogEditor.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── NotFound.js
│   │   │   └── Register.js
│   │   ├── styles/        # CSS stylesheets
│   │   │   ├── App.css
│   │   │   └── enhanced.css
│   │   ├── utils/         # Utility functions and services
│   │   │   ├── axiosConfig.js
│   │   │   ├── blogService.js
│   │   │   └── helpers.js
│   │   ├── App.js         # Main React component
│   │   └── index.js       # Entry point for the React app
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

---

## Tech Stack

### Frontend
- **React**: For building the user interface
- **React Router**: For client-side routing
- **Axios**: For making HTTP requests
- **React Toastify**: For notifications

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for building APIs
- **MongoDB**: NoSQL database for storing data
- **Mongoose**: ODM for MongoDB

---

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd blog-adder
   ```

2. **Install dependencies**:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set up environment variables**:
   - Create a `.env` file in the `backend` directory with the following:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     ```

4. **Run the application**:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd ../frontend
     npm start
     ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

---

## Features
- User authentication (login/register)
- Create, edit, and delete blogs
- Auto-save drafts
- Search functionality
- Responsive design

