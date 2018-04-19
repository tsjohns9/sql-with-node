var connection = require("./js/connection");
var inquirer = require("inquirer");
var Table = require("cli-table");

var table = new Table({ head: ["ID", "Name", "Price", "Quantity"] });

inquirer
  .prompt([
    {
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add new Product"
      ]
    }
  ])
  .then(function(answer) {
    switch (answer.action) {
      case "View Products for Sale":
        viewProducts();
        break;

      case "View Low Inventory":
        lowInventory();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add new Product":
        addNewProduct();
        break;
    }
  });

function viewProducts() {
  var query =
    "SELECT item_id AS 'ID', product_name AS 'Name', price AS 'Price', stock_quantity AS 'Quantity' FROM products;";
  connection.query(query, function(err, res) {
    if (err) {
      console.log(err);
      return connection.end();
    }

    // adds each item to resArray
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].ID, res[i].Name, "$" + res[i].Price, res[i].Quantity]);
    }
    console.log(table.toString());
  });
  connection.end();
}

function lowInventory() {
  var query =
    "SELECT item_id AS 'ID', product_name AS 'Name', price AS 'Price', stock_quantity AS 'Quantity' FROM products WHERE stock_quantity < 5 ORDER BY stock_quantity ASC;";

  connection.query(query, function(err, res) {
    if (err) {
      console.log(err);
      return connection.end();
    }

    for (var i = 0; i < res.length; i++) {
      table.push([res[i].ID, res[i].Name, "$" + res[i].Price, res[i].Quantity]);
    }
    console.log(table.toString());
  });
  connection.end();
}

function addInventory() {}

function addNewProduct() {
  inquirer.prompt([
    {
      name: "product",
      message: "Enter the new product name \n",
      type: "prompt"
    },
    {
      name: "price",
      message: "Enter the price of the new product \n",
      type: "prompt"
    },
    {
      name: "department",
      message: "What department will this be in? \n",
      type: "prompt"
    },
    {
      name: "inventory",
      message: "How many would you like to add? \n",
      type: "prompt"
    }
  ]);
  // var query = 'INSERT INTO products SET ?';

  // connection.query(query, {

  // })
}
