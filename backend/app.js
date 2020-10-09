const Pool = require('pg').Pool;

const app = require('express')();
app.use(require('cors')());
app.use(require('body-parser').json());

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

pool.query(createTableQuery, function (error, response) {
  if (error) {
    console.error(error);
  } else {
    console.log(response)
  }
});

function insertSingleEmployee(user, callback) {
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

function retrieveEmployeeData(callback) {
  pool.query(retrieveAllEmployeesQuery, function (error, response) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response.rows);
    }
  });
}

app.get('/', function (request, response) {
  response.send('test');
});

app.get('/users', function (request, response) {
  const params = request.params;
  retrieveEmployeeData(function (error, users) {
    if (error) {
      response.sendStatus(500);
    } else {
      response.send(JSON.stringify(users));
    }
  });
});

app.post('/users/upload', function (request, response) {
  const inputRows = request.body.file;
  inputRows.forEach(user => {
    insertSingleEmployee(user, function (error, addedUser) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(JSON.stringify(addedUser));
      }
    });
  });
});

app.listen(3000, function () {
  console.log('Server started');
});
