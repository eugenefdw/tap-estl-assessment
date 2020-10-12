const Papa = require('papaparse');

const EmployeesModel = require('../models/EmployeesModel');

exports.parseCsvFile = function (file, callback) {
  var results = Papa.parse(file.data.toString('utf-8'));
  console.log(results);
};
