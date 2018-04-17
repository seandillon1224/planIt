const router = require("express").Router();
const eventRoutes = require("./events");
const userRoutes = require("./users");




router.use("/events", eventRoutes);
router.use("/users", userRoutes);

module.exports = router;