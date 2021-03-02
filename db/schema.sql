DROP database if exists employee_tracker;
CREATE database employee_tracker;

USE employee_tracker;

CREATE table department (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
dep_name VARCHAR(30) NOT NULL UNIQUE
);

CREATE table role (
id INT auto_increment NOT NULL,
title VARCHAR(30) NOT NULL UNIQUE,
salary DECIMAL NOT NULL,
dep_id INT NOT NULL,
CONSTRAINT fk_department FOREIGN KEY (dep_id) REFERENCES department (id) ON DELETE CASCADE,
PRIMARY KEY (id)
);

CREATE table employee (
id INT auto_increment NOT NULL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
FOREIGN KEY (role_id) REFERENCES role (id) on DELETE CASCADE,
manager_id INT,
FOREIGN KEY (manager_id) REFERENCES role (id)
);

INSERT INTO department (dep_name) VALUES ("accounting"), ("sales"), ("technology");

INSERT INTO role (title, salary, dep_id) VALUES ("accountant", 50000, 1), ("salesperson", 60000, 2), ("web developer", 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Voynovich", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Corey", "Yates", 2, null), ("Tom", "Smith", 1, null);
