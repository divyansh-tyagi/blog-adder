const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();

connectDB();

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running' });
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
