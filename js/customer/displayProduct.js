var inquirer = require("inquirer");
var searchProduct = require("./searchProduct");
var connection = require("../connection");

var Table = require("cli-table");

// Will be used to display mysql data as a table
var table = new Table({ head: ["ID", "Name", "Price"] });

// Starts the inquirer prompt, and displays all products
function displayProducts() {
  // gets all products
  var query =
    "SELECT item_id AS 'ID', product_name AS 'Name', price AS 'Price' FROM products;";
  // executes the above query
  connection.query(query, function(err, res) {
    if (err) {
      console.log(err);
      return connection.end();
    }

    // loops through each index in res. res may only have 1 index depending on what search invokes it.
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].ID, res[i].Name, "$" + res[i].Price]);
    }
    console.log(table.toString());

    // The user will see each product from the above console.log, and then they are prompted to enter a product ID to make a purchase
    inquirer
      .prompt([
        {
          name: "id",
          type: "prompt",
          message: "Enter the ID of the product you would like to buy \n"
        },
        {
          name: "quantity",
          type: "prompt",
          message: "How many would you like? \n"
        }
      ])
      .then(function(answer) {
        // prevents the user from entering a product Id that does not exist by checking how many items are in the db. res is the SELECT * query to the products table.
        if (answer.id <= res.length) {
          searchProduct(answer);
        } else {
          console.log("Not a valid product ID");
          connection.end();
        }
      });
  });
}

module.exports = displayProducts;
