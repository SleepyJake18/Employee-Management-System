SELECT * FROM department

SELECT title, salary, department_name
FROM roles
JOIN department
on roles.department_id = department.id

SELECT employee.id,
CONCAT (employee.first_name, ' ', employee.last_name) AS employee,
roles.title AS title,
roles.salary AS salary,
department.department_name AS department,
CONCAT (em.first_name, ' ', em.last_name) AS manager
FROM employee
INNER JOIN
roles
on department.id = roles.department_id
INNER JOIN
department
on department.id = roles.department_id
INNER JOIN
roles
on roles.id = employee.role_id
LEFT JOIN
employee em
on 
employee.manager_id = em.id;

SELECT 
employee.id,
employee.first_name,
employee.last_name,
roles.title,
roles.salary,
department.department_name,
CONCAT (em.first_name, ' ', em.last_name)
AS manager
from employee
INNER JOIN 
roles on roles.id = employee.role_id
INNER JOIN
department 
on
department.id = roles.department_id
LEFT JOIN employee em on employee.manager_id = em.id;

SELECT CONCAT (first_name, ' ', last_name) AS manager FROM employee
WHERE manager_id IS NULL;