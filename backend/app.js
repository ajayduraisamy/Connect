const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI: Use the same URL for both development and production
const mongoURI = process.env.DB_LOCAL_URL; // Use the same MongoDB URL

mongoose.connect(mongoURI)
  .then(() => {
    console.log(`Connected to MongoDB: ${mongoURI}`);
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

const volunteerRoutes = require('./routes/volunteers');
const projectRoutes = require('./routes/projects');

// Middleware to set BASE_URL based on protocol and host
app.use((req, res, next) => {
  req.baseUrl = `${req.protocol}://${req.get('host')}`; // Set the base URL for the request
  next();
});

// Use BASE_URL in your routes if needed, for example:
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/projects', projectRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't match one above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
