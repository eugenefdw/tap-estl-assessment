const app = require('express')();
const Pool = require('pg').Pool;

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

pool.query('SHOW SERVER_ENCODING', function (error, response) {
  console.log(response);
  pool.end();
});

app.get('/', function (request, response) {
  response.send('test');
});

app.listen(2021, function() {
  console.log('Server started');
});
