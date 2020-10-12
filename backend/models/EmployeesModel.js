const Pool = require('pg').Pool;

const pool = new Pool();

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS employees(
    id varchar(16) PRIMARY KEY,
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
      console.log("Table initialized");
    }
  })
};

exports.insertMultipleEmployees = (users, callback) => {
  var insertionQuery = `
  BEGIN;
  `
  users.forEach(row => {
    insertionQuery += `
    INSERT INTO employees(id, login, name, salary)
    VALUES ('${row[0]}', '${row[1]}', '${row[2]}', ${row[3]})
    ON CONFLICT (id)
    DO
      UPDATE
      SET login = '${row[1]}', 
          name = '${row[2]}', 
          salary = ${row[3]};
    `
  });

  insertionQuery += `
  COMMIT;
  `
  pool.query(insertionQuery, function (error, response) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response.rows);
    }
  })
};

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

exports.retrieveEmployeeData = (params, callback) => {
  var selectionQuery = `
    SELECT * FROM employees
    WHERE salary >= ${params.minSalary}::float8::numeric::money
    AND   salary <= ${params.maxSalary}::float8::numeric::money
    ORDER BY ${params.column} ${params.ascending ? 'ASC' : 'DESC'}
    LIMIT ${params.limit}
    OFFSET ${params.offset};
  `;

  pool.query(selectionQuery, function (error, response) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response.rows);
    }
  });
}
