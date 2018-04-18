const router = require("express").Router();
const eventRoutes = require("./events");
const userRoutes = require("./users");
const guestRoutes = require('./guests')



router.use("/guests", guestRoutes);
router.use("/events", eventRoutes);
router.use("/users", userRoutes);

module.exports = router;