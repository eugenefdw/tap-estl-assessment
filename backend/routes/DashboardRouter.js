const express = require('express');
const router = express.Router();
const dataService = require('../services/EmployeeDataService');

router.get('/users', function (request, response) {
  const params = request.query;
  dataService.getDataAt(
    params.minSalary,
    params.maxSalary,
    params.offset,
    params.limit,
    params.sort,
    (err, res) => {
      if (err) {
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
    });
});

module.exports = router;
