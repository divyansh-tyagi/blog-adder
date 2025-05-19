# Blog Editor Application

A full-stack blog application with auto-save draft feature, built using React, Node.js, Express, and MongoDB.

## Features

- User authentication (register, login)
- Create, edit, save, and publish blogs
- Auto-save draft feature (after 5 seconds of inactivity)
- Visual notification when a blog is auto-saved
- View published blogs and drafts separately
- Tag blogs for better organization

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

## Setup and Running

You can run both the backend and frontend concurrently with:

1. Install all dependencies:
   ```
   npm run install-all
   ```

2. Start both services:
   ```
   npm start
   ```

Or you can run them separately:

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=8000
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React application:
   ```
   npm start
   ```

## API Endpoints

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login user
- **GET /api/auth/me** - Get current user (protected)
- **GET /api/blogs** - Get all blogs
- **GET /api/blogs/:id** - Get a blog by ID
- **POST /api/blogs/draft** - Create or update a draft (protected)
- **POST /api/blogs/publish** - Publish a blog (protected)
- **DELETE /api/blogs/:id** - Delete a blog (protected)

## Testing

We have created a comprehensive test plan that can be found in `TEST_PLAN.md`. To manually test the application:

1. Start the application: `npm start`
2. Register a new user account
3. Create and save a blog draft
4. Verify the auto-save functionality
5. Publish a blog
6. Test searching for blogs by title, content, or tags
7. Test editing and deleting blogs

For detailed documentation on using the application, refer to the `DOCUMENTATION.md` file.

## Troubleshooting

### Common Issues and Solutions

1. **Failed to load blog when editing**
   - Make sure you're logged in with the same account that created the blog
   - Check that the blog ID in the URL is valid
   - Verify your JWT token hasn't expired (try logging out and back in)
   - Clear browser cache and cookies

2. **Auto-save not working**
   - Check your network connection
   - Make sure you have made changes to the blog content
   - Verify browser console for any errors
   - Wait at least 5 seconds after making changes

3. **Authentication issues**
   - Try logging out and logging back in
   - Check if the JWT token is stored correctly in localStorage
   - Verify backend server is running correctly

4. **API Connection Errors**
   - Verify that both frontend and backend servers are running
   - Check that API URL is configured correctly in frontend `.env` file
   - Confirm MongoDB connection is working properly

For more assistance, check the console logs or refer to `DOCUMENTATION.md`.
# blog-adder
