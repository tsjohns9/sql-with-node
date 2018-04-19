var inquirer = require("inquirer");
var searchProduct = require("./searchProduct");
var connection = require("../connection");

// Starts the inquirer prompt, and displays all products
function displayProducts() {
  // gets all products
  var query = "SELECT * FROM products;";

  // executes the above query
  connection.query(query, function(err, res) {
    if (err) {
      console.log(err);
      return connection.end();
    }
    console.log(res.length);
    // adds each item to resArray
    for (var i = 0; i < res.length; i++) {
      var tmp = "";
      tmp += `Item ID: ${res[i].item_id}, ${res[i].product_name}, Price: $${
        res[i].price
      }`;

      // prints each item to the screen
      console.log(tmp);
    }

    // The user will see each product from the above console.log, and then they are prompted to enter a product ID to make a purchase
    inquirer
      .prompt([
        {
          name: "id",
          type: "prompt",
          message: "Enter the ID of the product you would like to buy"
        },
        {
          name: "quantity",
          type: "prompt",
          message: "How many would you like?"
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
