var connection = require("../connection");
var inquirer = require("inquirer");

function newDepartment() {
  inquirer
    .prompt([
      {
        name: "dep",
        type: "prompt",
        message: "What is the name of the new department? \n"
      }
    ])
    .then(function(answer) {
      checkDepartments(answer.dep);
    });
}

function checkDepartments(dep) {
  var query = "SELECT * FROM departments;";

  connection.query(query, function(err, res) {
    if (err) throw err;

    // returns the department name for each row in departments
    // checks if the new array includes the department name of the new product
    var included = res
      .map(index => {
        return index.department_name;
      })
      .includes(dep);

    // included returns true or false. if the department doesn't exist, then addDepartment creates a table for it.
    if (!included) {
      addDepartment(dep);
    } else {
      return console.log("Department already exists!");
    }
  });
}

function addDepartment(dep) {
  var query = "INSERT INTO departments SET ?";

  connection.query(
    query,
    {
      department_name: dep,
      over_head_costs: 200
    },
    function(err, res) {
      if (err) throw err;
      console.log(`${dep} has been added to the departments table.`);
    }
  );
  connection.end();
}

module.exports = newDepartment;
