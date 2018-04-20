// var connection = require("../connection");
// var inquirer = require("inquirer");
// var Table = require("cli-table");
// var viewProducts = require("./viewProducts");

// function mainPrompt() {
//   inquirer
//     .prompt([
//       {
//         name: "action",
//         type: "rawlist",
//         message: "What would you like to do?",
//         choices: [
//           "View Products for Sale",
//           "View Low Inventory",
//           "Add to Inventory",
//           "Add new Product"
//         ]
//       }
//     ])
//     .then(function(answer) {
//       switch (answer.action) {
//         case "View Products for Sale":
//           viewProducts();
//           break;

//         case "View Low Inventory":
//           // lowInventory();
//           break;

//         case "Add to Inventory":
//           // addInventory();
//           break;

//         case "Add new Product":
//           // addNewProduct();
//           break;
//       }
//     });
// }

// module.exports = mainPrompt;
