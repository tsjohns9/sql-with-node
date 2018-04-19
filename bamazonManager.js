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
    if (err) throw err;

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
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      table.push([res[i].ID, res[i].Name, "$" + res[i].Price, res[i].Quantity]);
    }
    console.log(table.toString());
  });
  connection.end();
}

function addInventory() {
  inquirer
    .prompt([
      {
        name: "id",
        message:
          "Enter the product ID of the item you would like to buy more of \n",
        type: "prompt"
      },
      {
        name: "quantity",
        message: "How many would you like to buy?",
        type: "prompt"
      }
    ])
    .then(function(ans) {
      getQuantity(ans.id, ans.quantity);
    });
}

function addNewProduct() {
  inquirer
    .prompt([
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
    ])
    .then(function(ans) {
      var query = "INSERT INTO products SET ?";
      connection.query(
        query,
        {
          product_name: ans.product,
          department_name: ans.department,
          price: ans.price,
          stock_quantity: ans.inventory
        },
        function(err, res) {
          if (err) throw err;
          viewProducts();
        }
      );
    });
}

// gets the current quantity of an item
function getQuantity(id, totalPurchased) {
  var query = "SELECT stock_quantity FROM products WHERE ?";
  connection.query(
    query,
    {
      item_id: id
    },
    function(err, res) {
      if (err) throw err;
      console.log(res);
      updateInventory(id, res[0].stock_quantity, totalPurchased);
    }
  );
}

// updates an item with its current quantity + the new total amount purchased
function updateInventory(id, currentQ, totalPurchased) {
  console.log(id, currentQ, totalPurchased);
  var newQ = Number(currentQ) + Number(totalPurchased);

  var query = "UPDATE products SET ? WHERE ?";
  connection.query(
    query,
    [
      {
        stock_quantity: newQ
      },
      {
        item_id: id
      }
    ],
    function(err, res) {
      if (err) throw err;
      viewProducts();
    }
  );
}
