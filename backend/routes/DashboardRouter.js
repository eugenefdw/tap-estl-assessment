const express = require('express');
const router = express.Router();

router.get('/users', function (request, response) {
  const params = request.params;
  retrieveEmployeeData(function (error, users) {
    if (error) {
      response.sendStatus(500);
    } else {
      response.send(JSON.stringify(users));
    }
  });
});

module.exports = router;
