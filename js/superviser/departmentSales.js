var connection = require("../connection");
var inquirer = require("inquirer");
var Table = require("cli-table");

// Will be used to display mysql data as a table
// sets the title of each column
var table = new Table({
  head: [
    "Department ID",
    "Department",
    "Over Head Costs",
    "Product Sales",
    "Total Profit"
  ]
});

function departmentSales() {
  var query = `SELECT departments.department_id,
    products.department_name,
    departments.over_head_costs,
    products.product_sales,
    products.product_sales - departments.over_head_costs AS product_profit
    FROM products INNER JOIN departments
    ON (departments.department_name = products.department_name)
    GROUP BY department_name ORDER BY 5 desc;`;

  connection.query(query, function(err, res) {
    if (err) throw err;
    addToTable(res);
    console.log("Here are the sales by department");
    connection.end();
  });
}

// takes in the result from a db query, and formats it so it displays as a table
function addToTable(res) {
  // loops through each index in res. res may only have 1 index depending on what search invokes it.
  for (var i = 0; i < res.length; i++) {
    table.push([
      res[i].department_id,
      res[i].department_name,
      "$" + res[i].over_head_costs,
      "$" + res[i].product_sales,
      "$" + res[i].product_profit
    ]);
  }

  // displays the table
  return console.log(table.toString());
}

module.exports = departmentSales;
