const router = require("express").Router();
const eventRoutes = require("./events");



router.use("/events", eventRoutes);


module.exports = router;