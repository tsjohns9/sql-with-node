var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

// Makes the MySQL connection
connection.connect(function(err) {
  if (err) throw err;
  displayProducts();
});

// Starts the inquirer prompt, and displays all products
function displayProducts() {
  // This will contain all items in the db with their product_id, name, and price
  var resArray = [];

  // gets all products
  var query = "SELECT * FROM products;";

  // executes the above query
  connection.query(query, function(err, res) {
    if (err) throw err;

    // adds each item to resArray
    for (var i = 0; i < res.length; i++) {
      var tmp = "";
      tmp += `Item ID: ${res[i].item_id}, ${res[i].product_name}, Price: $${
        res[i].price
      }`;
      resArray.push(tmp);

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
      .then(function(res) {
        // prevents the user from entering a product Id that does not exist
        if (res.id <= resArray.length) {
          searchProduct(res);
        } else {
          console.log("Not a valid product ID");
        }
      });
  });
}

// Searches the db based on the product ID the user entered
function searchProduct(val) {
  var query =
    "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?;";

  // executes the above query. Second parameter replaces the '?' in the query.
  connection.query(query, { item_id: val.id }, function(err, res) {
    if (err) {
      return console.log(err);

      // checks if there is enough in stock
    } else if (val.quantity > res[0].stock_quantity) {
      return console.log("Not enough in stock!");
    }

    // allows the purchase to go through if there is enough in stock
    updateQuantity(val, res);
  });
}

// updates the new quantity and makes the purchase
function updateQuantity(requested, item) {
  // contains the new total after the customers purchase
  var newStock = item[0].stock_quantity - requested.quantity;

  // updates the db for the item the customer purchased, and sets the new total quantity for the item
  var query = "UPDATE products SET ? WHERE ?;";
  connection.query(
    query,
    [
      {
        stock_quantity: newStock
      },
      {
        item_id: requested.id
      }
    ],

    // displays the total cost of the purchase
    function(err, res) {
      console.log(`Your total cost is $${item[0].price * requested.quantity}`);
    }
  );
}
