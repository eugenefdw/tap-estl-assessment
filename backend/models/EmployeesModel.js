const Pool = require('pg').Pool;

const pool = new Pool();

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS employees(
    id int PRIMARY KEY,
    login varchar(32) UNIQUE,
    name varchar(64),
    salary money
  )
`;
const insertSingleEmployeeQuery = `
  INSERT INTO employees (id, login, name, salary)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
`;
const retrieveAllEmployeesQuery = `
  SELECT * FROM employees;
`;

exports.initializeTable = () => {
  pool.query(createTableQuery, function (error, response) {
  if (error) {
    console.error(error);
  } else {
    //console.log(response)
    console.log("Table initialized");
  }
})};

exports.insertSingleEmployee = (user, callback) => {
  pool.query(insertSingleEmployeeQuery,
    [user.id, user.login, user.name, user, salary],
    function (error, repsonse) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, repsonse.rows[0]);
      }
    });
}

exports.retrieveEmployeeData = (callback) => {
  pool.query(retrieveAllEmployeesQuery, function (error, response) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response.rows);
    }
  });
}
