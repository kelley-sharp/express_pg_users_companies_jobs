const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const usersRoutes = require('./routes/users');
const companiesRoutes = require('./routes/companies');
// const jobsRoutes = require('./routes/jobs');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/users', usersRoutes);
app.use('/companies', companiesRoutes);
// app.use('/jobs', jobsRoutes);

app.listen(PORT, () => {
  console.log(`server starting on port ${PORT}`);
});
