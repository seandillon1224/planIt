const express = require('express');
const eventController = require('../../controllers/eventController')

const router = new express.Router();


router.route("/:id")
.get(eventController.findByGuestId)
.delete(eventController.removeGuest);

module.exports = router;