var mysql = require("mysql");
// establishes the mysql connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "343$&bxxYM^9m",
  database: "bamazon_db"
});

module.exports = connection;
