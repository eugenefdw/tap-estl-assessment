const app = require('express')();
app.use(require('cors')());
app.use(require('body-parser').json());
import { Pool } from 'pg';

const pool = new Pool({
  database: 'postgres',
  user: 'postgres',
  password: 'tapestl',
  host: 'localhost',
  port: 5432
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS employees(
    id int PRIMARY KEY,
    login varchar(32) UNIQUE,
    name varchar(64),
    salary money
  )
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

function getEmployeeData(callback) {
  pool.query(retrieveAllEmployeesQuery, function (error, response) {
      if(error) {
        callback(error, null);
      } else {
        callback(null, response.rows);
      }
    });
}

app.get('/', function (request, response) {
  response.send('test');
});

app.get('/users', function(request, response) {
  const params = request.params;
  getEmployeeData(function (error, users) {
    if(error) {
      response.sendStatus(500);
    } else {
      response.send(JSON.stringify(users));
    }
  });
});

app.listen(2021, function () {
  console.log('Server started');
});
