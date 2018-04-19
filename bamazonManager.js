var connection = require("./js/connection");
var inquirer = require("inquirer");
var Table = require("cli-table");

// allows mysql data to be displayed as a table
var table = new Table({ head: ["ID", "Name", "Price", "Quantity"] });

// initial prompt
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

// displays all products, prices, and stock quantity
function viewProducts() {
  // gets the specified columns, and displays the data with a unique name
  var query =
    "SELECT item_id AS 'ID', product_name AS 'Name', price AS 'Price', stock_quantity AS 'Quantity' FROM products;";
  connection.query(query, function(err, res) {
    if (err) throw err;

    // adds each item to the table
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].ID, res[i].Name, "$" + res[i].Price, res[i].Quantity]);
    }

    // displays the table
    console.log(table.toString());
  });
  connection.end();
}

// displays items with a low inventory of less than 5
function lowInventory() {
  // grabs the specified columns of items with less than 5. Orders from lowest to highest quantity
  var query =
    "SELECT item_id AS 'ID', product_name AS 'Name', price AS 'Price', stock_quantity AS 'Quantity' FROM products WHERE stock_quantity < 5 ORDER BY stock_quantity ASC;";

  connection.query(query, function(err, res) {
    if (err) throw err;

    // adds each item to the table
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].ID, res[i].Name, "$" + res[i].Price, res[i].Quantity]);
    }
    console.log(table.toString());
  });
  connection.end();
}

// prompts the user to get info about what to add to the db, and how many of the product
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
      // prevents the user from subtracting items from the inventory
      if (ans.quantity.includes("-")) {
        return console.log("You may only add to the the inventory");
      }
      getQuantity(ans.id, ans.quantity);
    });
}

// allows the user to create a new row for a product
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
      // query to add a new row based on user input
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
          // displays the updated db
          viewProducts();
        }
      );
    });
}

// gets the current quantity of an item. Called in addInventory so that we can get the current inventory, and the total of the item purchased from addInventory
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

// updates an item with its current quantity + the new total amount purchased. Called in getQuantity
function updateInventory(id, currentQ, totalPurchased) {
  // adds the current inventory to the new total purchased. Number() converts the numbers from a string to a number.
  var newQ = Number(currentQ) + Number(totalPurchased);

  // sets the new quantity of the item
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
      getItem(id, totalPurchased);
    }
  );
}

// gets one item from the db. the item id is passed in, and totalPurchased. gets called in updateInventory to display the updated item.
function getItem(id, totalPurchased) {
  var query =
    "SELECT item_id AS 'ID', product_name AS 'Name', price AS 'Price', stock_quantity AS 'Quantity' FROM products WHERE ?;";

  connection.query(
    query,
    {
      item_id: id
    },
    function(err, res) {
      if (err) throw err;

      // adds each item to the table
      table.push([res[0].ID, res[0].Name, "$" + res[0].Price, res[0].Quantity]);
      console.log(table.toString());
      console.log(`You added ${totalPurchased} of ${res[0].Name}`);
    }
  );
  connection.end();
}
