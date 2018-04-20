var Table = require("cli-table");

function addToTable(res) {
  var table = new Table({ head: ["ID", "Name", "Price", "Quantity"] });
  // loops through each index in res. res may only have 1 index depending on what search invokes it.
  for (var i = 0; i < res.length; i++) {
    table.push([res[i].ID, res[i].Name, "$" + res[i].Price, res[i].Quantity]);
  }

  // displays the table
  return console.log(table.toString());
}

module.exports = addToTable;
