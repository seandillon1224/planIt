const express = require('express');
const eventController = require('../../controllers/eventController')

const router = new express.Router();

router.route("/")
  .get(eventController.findAll)
  .post(eventController.create);

  router
  .route("/:id")
  .get(eventController.findById)
  .delete(eventController.remove);


module.exports = router;