const express = require('express');
const eventController = require('../../controllers/eventController')

const router = new express.Router();

router.get('/events/dashboard', (req, res) => {
  res.status(200).json({
    message: "Welcome to PlanIt"
  });
});

router.route("/")
  .get(eventController.findAll)
  .post(eventController.create);

  router
  .route("/:id")
  .get(eventController.findById)
  .delete(eventController.remove);

  router.route("/guest/:id")
  .get(eventController.findByGuestId)
  
module.exports = router;