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
    departments.department_name,
    departments.over_head_costs,
    products.product_sales,
    products.product_sales - departments.over_head_costs AS product_profit
    FROM departments left JOIN products
    ON (departments.department_name = products.department_name)
    GROUP BY department_name ORDER BY 5 desc;`;

  connection.query(query, function(err, res) {
    if (err) throw err;

    // adds each row to the table
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
    console.log(table.toString());
    console.log("Here are the sales by department");
  });
  connection.end();
}

module.exports = departmentSales;
