const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const usersRoutes = require('./routes/users');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`server starting on port ${PORT}`);
});
