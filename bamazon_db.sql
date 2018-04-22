DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) DEFAULT NULL,
  department_name VARCHAR(100) DEFAULT NULL,
  price DECIMAL(10,2) DEFAULT NULL,
  stock_quantity INT DEFAULT NULL,
  product_sales DECIMAL(10,2) DEFAULT 0,
  PRIMARY KEY(item_id)
);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) DEFAULT NULL,
  over_head_costs DECIMAL(10,2) DEFAULT NULL,
  PRIMARY KEY(department_id)
);

INSERT INTO departments (department_name, over_head_costs) VALUES
('electronics', 2500),
('books', 199),
('groceries', 320),
('clothing', 300),
('animals', 5.01),
('music', 1200),
('gaming', 1000);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES 
('Laptop', 'electronics', 800.00, 5),
('Keyboard', 'electronics', 100.00, 8),
('A book', 'books', 12.00, 462),
('Some food', 'groceries', 26.32, 1547),
('Socks', 'clothing', 14.00, 91),
('Shirts', 'clothing', 22.50, 231),
('A lizard', 'animals', 6.02, 1),
('A cat', 'animals', 1.00, 2),
('Guitar', 'music', 300.00, 46),
('Cool video game', 'gaming', 59.990, 753);

SELECT * FROM departments;

SELECT departments.department_id,
departments.department_name,
departments.over_head_costs,
products.product_sales,
products.product_sales - departments.over_head_costs AS product_profit
FROM departments left JOIN products
ON (departments.department_name = products.department_name)
GROUP BY department_name ORDER BY 5 desc;