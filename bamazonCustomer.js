var displayProducts = require("./js/displayProduct");
var connection = require("./js/connection");

// Makes the MySQL connection
connection.connect(function(err) {
  if (err) {
    return connection.end();
  }
  // shows all products on a successful connection
  displayProducts();
});
