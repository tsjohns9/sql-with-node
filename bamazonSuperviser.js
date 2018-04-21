var connection = require("./js/connection");
var inquirer = require("inquirer");
var Table = require("cli-table");
var departmentSales = require("./js/superviser/departmentSales");

function supervisor() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department"]
      }
    ])
    .then(function(answer) {
      switch (answer.action) {
        case "View Product Sales by Department":
          departmentSales();
          break;

        case "Create New Department":
          // newDepartment();
          break;
      }
    });
}
