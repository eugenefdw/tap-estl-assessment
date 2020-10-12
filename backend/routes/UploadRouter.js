const express = require('express');
const router = express.Router();
const parser = require('../services/CsvParser');

router.post('/users/upload', (req, response) => {
  if (!req.files) {
    response.send({
      status: false,
      message: 'No file uploaded'
    });
    return;
  }

  parser.parseCsvFile(req.files.file, (error, res) => {
    if (error) {
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });  
});

module.exports = router;
