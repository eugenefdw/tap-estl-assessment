const express = require('express');
const router = express.Router();
const parser = require('../services/CsvParser');

router.post('/users/upload', (request, response) => {
  if (!request.files) {
    response.send({
      status: false,
      message: 'No file uploaded'
    });
    return;
  }

  parser.parseCsvFile(request.files.file, (error, data) => {
    if(error) {
      response.sendStatus(500).send(error);
    } else {
      response.send({
        status: true,
        message: 'File is uploaded',
        rows: data
      });
    }
  });
});

module.exports = router;
