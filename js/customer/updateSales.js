var connection = require("../connection");

// updates the total sales with the most recent sale
var updateSales = function(id, sale) {
  var query = "UPDATE products SET ? WHERE ?;";

  connection.query(query, [
    {
      product_sales: sale
    },
    {
      item_id: id
    },
    function(err, res) {
      if (err) throw err;
    }
  ]);
  connection.end();
};

module.exports = updateSales;
