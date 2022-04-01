USE employee_db;

INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Hardware Development");
INSERT INTO department (name) VALUES ("Software Development");
INSERT INTO department (name) VALUES ("Recruiting");

INSERT INTO roles (title, salary, department_id) VALUES ("Senior Sotware Developer", 70, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Junior Software Developer", 50, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Engineer", 50, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Director", 100, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Talent Acquisition Specialist", 100, 4);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Nate", "Russel", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Jack", "Parker", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Ben", "Ben", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Rachel", "Thiim", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Israel", "Molestina", 5);