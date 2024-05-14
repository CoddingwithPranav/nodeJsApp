const express = require('express')
const app = express()
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = 3000

// Import the router file
const personRouter = require('./routes/personRoutes');
const menuRouter = require('./routes/menuRoutes');

//Using the Routes
app.use('/person', personRouter);
app.use('/menuitem', menuRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
