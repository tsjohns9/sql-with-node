var connection = require("../connection");
var inquirer = require("inquirer");
var Table = require("cli-table");
var addToTable = require("./addToTable");
var returnPrompt = require("./returnPrompt");

// displays all products, prices, and stock quantity
function viewProducts() {
  // gets the specified columns, and displays the data with a unique name
  var query =
    "SELECT item_id AS 'ID', product_name AS 'Name', price AS 'Price', stock_quantity AS 'Quantity' FROM products;";
  connection.query(query, function(err, res) {
    if (err) throw err;

    // adds each item to the table
    addToTable(res);

    // info about result
    console.log("Here are all the products");

    // brings user to main prompt
    returnPrompt();
  });
}

module.exports = viewProducts;
