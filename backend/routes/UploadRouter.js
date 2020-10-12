const express = require('express');
const router = express.Router();
const parser = require('../services/CsvParser');

var isUploading = false;

router.post('/users/upload', (req, response) => {
  if (!req.files) {
    response.sendStatus(200);
    return;
  }

  if(isUploading) {
    response.sendStatus(500);
    return;
  }

  isUploading = true;
  parser.parseCsvFile(req.files.file, (error, res) => {
    isUploading = false;
    if (error) {
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });  
});

module.exports = router;
