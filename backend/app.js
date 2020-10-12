const app = require('express')();
app.use(require('express-fileupload')());
app.use(require('cors')());
app.use(require('body-parser').json());

app.use(require('./routes/DashboardRouter'));
app.use(require('./routes/UploadRouter'));

const model = require('./models/EmployeesModel');

model.initializeTable();

app.listen(2021, function () {
  console.log('Server started');
});
