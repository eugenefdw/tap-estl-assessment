const EmployeesModel = require('../models/EmployeesModel');

exports.getDataAt = function (params, callback) {
  if(params.minSalary < params.maxSalary) {
    callback("Minimum salary less than maximum salary", null);
  }

  
}
