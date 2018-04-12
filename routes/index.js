const path = require("path");
const router = require("express").Router();
const nonAuthRoutes = require('./nonauth')

// API Routes
router.use('/nonauth', nonAuthRoutes)

// If no API routes are hit, send the React app
router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

module.exports = router;
