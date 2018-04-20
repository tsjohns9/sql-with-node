var connection = require("../connection");
var inquirer = require("inquirer");
var Table = require("cli-table");
var mainPrompt = require("../../bamazonManager.js");

function returnPrompt() {
  inquirer
    .prompt([
      {
        name: "mainPrompt",
        type: "list",
        message: "Return to main menu?",
        choices: ["Yes", "No"]
      }
    ])
    .then(function(ans) {
      // resets table so that a new table is displayed for each search
      // table = new Table({ head: ["ID", "Name", "Price", "Quantity"] });
      if (ans.mainPrompt === "Yes") {
        mainPrompt();
      } else {
        connection.end();
        return console.log("Goodbye!");
      }
    });
}

module.exports = returnPrompt;
