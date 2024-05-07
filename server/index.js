const express = require('express');
const mysql = require('mysql');

//Create an app
const app = express();
app.get('/', (req, res) => {
    res.send('Hello world\n');
});

//Listen port
const PORT = 8080;
app.listen(PORT);
console.log(`Running on port ${PORT}`);


const connection = mysql.createConnection({
	host: "werkzeugverwaltung_mysql",
	user: "root",
	password: "password",
	database: "werkzeugverwaltung"
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
  if (err) throw err;

  console.log("The solution is: ", rows[0].solution);
});

connection.end();