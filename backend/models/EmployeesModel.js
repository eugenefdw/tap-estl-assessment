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

exports.initializeTable = () => {
  pool.query(createTableQuery, function (err, res) {
    if (err) {
      console.error(err);
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
  pool.query(insertionQuery, function (err, res) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res.rows);
    }
  })
};

exports.retrieveEmployeeData = (params, callback) => {
  var selectionQuery = `
    SELECT id, login, name, salary::money::numeric::float8 FROM employees
    WHERE salary >= ${params.minSalary}::float8::numeric::money
    AND   salary <= ${params.maxSalary}::float8::numeric::money
    ORDER BY ${params.column} ${params.ascending ? 'ASC' : 'DESC'}
    LIMIT ${params.limit}
    OFFSET ${params.offset};
  `;

  pool.query(selectionQuery, function (err, res) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res.rows);
    }
  });
}

exports.retrieveEmployeeCount = (params, callback) => {
  var countQuery = `
    SELECT count(*) FROM employees
    WHERE salary >= ${params.minSalary}::float8::numeric::money
    AND   salary <= ${params.maxSalary}::float8::numeric::money;
  `;

  pool.query(countQuery, function (err, res) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res.rows);
    }
  });
}
