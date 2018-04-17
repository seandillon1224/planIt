const router = require("express").Router();
const userController = require('../../controllers/userController')


router.route("/")
  .get(userController.findAll)


router.route("/:name")
  .get(userController.findByName)


module.exports = router;