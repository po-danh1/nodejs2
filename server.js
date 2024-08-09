const express = require('express');
const path = require('path');
require('dotenv').config();
const webrouter = require('./route/web');
const sql = require('mssql');
const connection =require('./config/database');

const port = process.env.PORT || 8888;
const hostname =process.env.HOSTNAME

const app = express();
const viewconfig = require('./config/view');
viewconfig(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use('/', webrouter);
app.use(express.static(path.join(__dirname, 'public')));



// Test database connection
async function testDbConnection() {
  try {
    await sql.connect(connection);
    const result = await sql.query`SELECT * FROM Users`;
    console.dir(result);
  } catch (err) {
    console.error('SQL error', err);
  } 
}

// Call the function to test the connection
testDbConnection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

