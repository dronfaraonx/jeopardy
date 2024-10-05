// const app = require("./app")
const express = require('express');
require('dotenv').config()

const indexRouter = require('./src/routes/index.routes')

const app = express();

const PORT = process.env.PORT || 8000;

const serverConfig = require('./src/middleware/serverConfig')
const sessionConfig = require('./src/middleware/sessionConfig')


serverConfig(app);
sessionConfig(app)

app.use('/', indexRouter);



app.listen(PORT, () => {
  console.log('SERVER STARTED ON PORT', PORT);
});