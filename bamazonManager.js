var connection = require("./js/connection");
var inquirer = require("inquirer");

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
    console.log(answer);
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

function viewProducts() {}

function lowInventory() {}

function addInventory() {}

function addNewProduct() {}
