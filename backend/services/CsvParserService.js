const Papa = require('papaparse');

const EmployeesModel = require('../models/EmployeesModel');

exports.parseCsvFile = function (file, callback) {
  const config = {
    header: false,
    comments: "#",
    dynamicTyping: true,
    skipEmptyLines: true,
  }
  var results = Papa.parse(file.data.toString('utf-8'), config);
  handleData(results, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

function handleData(parseResults, callback) {
  var rowsProcessed = 0;
  parseResults.data.slice(1).forEach(row => {
    var error = handleRow(row);
    if (error) {
      callback(error, null);
    }
    rowsProcessed++;
  });
  EmployeesModel.insertMultipleEmployees(parseResults.data.slice(1), (error, res) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, res);
    }
  });
};

function handleRow(row) {
  if (row.length != 4) {
    return { error: "Not enough values" };
  }
  if (!Number.isFinite(row[3])) {
    return { error: "Salary is not a number" };
  }
  if (row[3] < 0) {
    return { error: "Salary cannot be negative" };
  }
}
