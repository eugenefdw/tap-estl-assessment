const express = require('express');
const router = express.Router();
const dataService = require('../services/EmployeeDataService');

router.get('/users', function (request, response) {
  dataService.getDataAt(request.query, (err, res) => {
    if (err) {
      response.sendStatus(500);
    } else {
      response.status(200).send({ results: res });
    }
  });
});

router.get('/users/count', function (request, response) {
  dataService.getCount(request.query, (err, res) => {
    if (err) {
      response.sendStatus(500);
    } else {
      response.status(200).send(res);
    }
  })
})

module.exports = router;
