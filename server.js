const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const port = process.env.PORT || 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json());


// Import the router file
const personRouter = require('./routes/personRoutes');
const menuRouter = require('./routes/menuRoutes');

//Using the Routes
app.use('/person', personRouter);
app.use('/menuitem', menuRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
