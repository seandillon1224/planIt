const express = require('express');
const eventController = require('../../controllers/eventController')

const router = new express.Router();

router.route("/")
  .get(eventController.findAll)
  .post(eventController.create);


module.exports = router;