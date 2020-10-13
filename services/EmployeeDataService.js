const EmployeesModel = require('../models/EmployeesModel');

exports.getDataAt = function (params, callback) {
  if (+params.minSalary > +params.maxSalary) {
    callback("Minimum salary more than maximum salary", null);
    return;
  }

  if (+params.limit > 30) {
    callback("Maximum query size is 30", null);
    return;
  }

  //get asc/desc from first char of sort string
  if (params.sort.charAt(0) === '+') {
    params.ascending = true;
  } else if (params.sort.charAt(0) === '-') {
    params.ascending = false;
  } else {
    callback("Invalid sort type", null);
    return;
  }

  //get remaining column type from sort string
  params.column = params.sort.substring(1);

  EmployeesModel.retrieveEmployeeData(params, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
}

exports.getCount = (params, callback) => {
  EmployeesModel.retrieveEmployeeCount(params, callback);
}
