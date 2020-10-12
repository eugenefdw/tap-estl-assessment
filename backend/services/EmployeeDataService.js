const EmployeesModel = require('../models/EmployeesModel');

exports.getDataAt = function (params, callback) {
  if(params.minSalary > params.maxSalary) {
    callback("Minimum salary more than maximum salary", null);
    return;
  }

  
}
