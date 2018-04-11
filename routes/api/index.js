const router = require("express").Router();
const articleRoutes = require("./articles");
const nytRoutes = require("./nyt");
const authRoutes = require("./auth")

// NYT routes
router.use("/articles", articleRoutes);

router.use("/nyt", nytRoutes);

router.use("/auth", authRoutes);

module.exports = router;
