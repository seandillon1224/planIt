const express = require('express');
var multer = require("multer");
var upload = multer({storage: multer.memoryStorage({})});
const router = require("express").Router();
const fs = require('fs')

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});

//saving data
router.post("/saving/email", upload.array(), function(req, res, next) {

  // adding image to uploads folder
  if(req.body.img_file && req.body.file){
    var img_raw = req.body.img_file.split(";base64,").pop();
    var img_name = req.body.file;
    fs.writeFile(__dirname + "/uploads/" + img_name, img_raw, {encoding: "base64"}, function(err) {
      if (err) {
        return next(err);
      }
      console.log("Image Saved!");
      fs.readFile(__dirname + "/uploads/" + img_name, function(err, data) {

        if (err) {
          return next(err);
        }
      });
    });
  }
});

module.exports = router;