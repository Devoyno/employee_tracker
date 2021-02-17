const mysql = require("mysql");
const dotenv = require("dotenv");
const util = require("util");
dotenv.config();

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.PASS,
  database: "employee_tracker"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

connection.query = util.promisify(connection.query);

module.exports = connection;