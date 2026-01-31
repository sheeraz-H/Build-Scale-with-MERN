const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the router
app.use('/', authRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
