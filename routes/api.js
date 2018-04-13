const express = require('express');
const eventController = require('../controllers/eventController')

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});
router
  .route("/")
  .get(eventController.findAll)
  .post(eventController.create);

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(eventController.findById)
  .delete(eventController.remove);



module.exports = router;