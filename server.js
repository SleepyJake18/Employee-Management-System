const inquirer = require('inquirer');
const express = require('express');
const consoleTable = require('console.table');
const mysql = require('mysql2');
const res = require('express/lib/response');

const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'HoneyBonBon6969!',
database: 'employees_db'
},
console.log('Connection Successful')
);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const init = () => {
    console.log('Welcome to your employee management system');
    inquirer.prompt ([
        {
            type: 'list',
            message: 'What would you like to manage?',
            choices: [
                'View departments',
                'View roles',
                'View employees',
                'Add department',
                'Add role',
                'Add employee',
                'Update role',
                'Exit'
            ],
            name: 'initial'
        }
    ])
    .then((input) => {
        switch(input.initial) {
            case 'View departments':
                displayDepartments();
                break;
            case 'View roles':
                displayRoles();
                break;
            case 'View employees':
                displayEmployees();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Update role':
                updateRole();
                break;
        };
    });
};

const displayDepartments = () => {
    db.query('SELECT id, department_name AS Department FROM department', (err, table) => {console.log(table)});
    init();
};

const displayRoles = () => {
    db.query('SELECT title as Title, salary AS Salary, department_name AS Department FROM roles JOIN department on roles.department_id = department.id', (err, table) => {console.log(table)});
    init();
};

const displayEmployees = () => {
    db.query('SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS Employee, roles.title AS Title, roles.salary AS Salary, CONCAT(em.first_name, " ", em.last_name) AS Manager FROM employee INNER JOIN roles on roles.id = employee.role_id INNER JOIN department on department.id = roles.department_id LEFT JOIN employee em on employee.manager_id = em.id;', (err, table) => {console.log(table)});
    init();
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            enter: 'Enter new department name',
            name: 'departmentName'
        }
    ])
    .then((input) => {
        db.query('INSERT into department SET ?',
        {
            department_name: input.departmentName
        });
        console.log('Department added successfully');
        init();
    });
};

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your employees first name?',
            name: 'emFirst'
        },
        {
            type:'input',
            message: 'What is your employees last name?',
            name: 'emLast'
        },
        {
            type: 'list',
            message: 'What is your employees role?',
            choices: roles(),
            name: 'emRole'
        },
        {
            type: 'list',
            message: 'Who is your employees manager?',
            choices: managers(),
            name: 'emManager'
        }
    ])
    .then((input) => {
        db.query('INSERT INTO employee SET ?', {
            first_name: input.emFirst,
            last_name: input.emLast,
            role_id: input.emRole.value,
            manager_id: input.emManager.value
        })
        console.log('Employee added successfully');
        init();
    });
};

function addRole () {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'What is the roles name?',
            name: 'roleName'
        },
        {
            type: 'input',
            message: 'What is the roles salary?',
            name: 'roleSalary'
        },
        {
            type: 'list',
            message: "Which department should this role belong to?",
            choices: departments(),
            name: 'roleDepartment'
        }
       ]) .then((input) => {
            db.query('INSERT INTO employee_roles SET ?', {
                title: input.roleName,
                salary: input.roleSalary,
                department_id: input.roleDepartment.value
            })
            init();
        })
};  

function updateRole() {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Enter the ID of the employee you would like to update',
            name: 'roleName'
        },
        {
            type: 'list',
            message: 'What is the employees new role?',
            choices: roles(),
            name: 'updatedRole'
        }
       ]) .then((input) => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', {
            id: input.roleName,
            role_id: input.updatedRole.value
            })
            init()
        })
};

init();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  let managerArray = [];
  function managers() {
  
      db.query('SELECT id, first_name FROM employee WHERE manager_id IS NULL', (err, data) =>   {
       
          data = JSON.parse(JSON.stringify(data));
       
          for (let i = 0; i < data.length; i++){
              managerArray.push({name: data[i].first_name, value: data[i].id})
          };
      });
      return managerArray
  };
  
  let roleArray = [];
  function roles() {
  
      db.query('SELECT id, title FROM employee_roles', (err, data) =>   {
       
          data = JSON.parse(JSON.stringify(data));
       
          for (let i = 0; i < data.length; i++){
              roleArray.push({name: data[i].title, value: data[i].id});
              
          };
      });
      return roleArray
  };
  
  let departmentArray = [];
  function departments() {
      db.query('SELECT id, department_name FROM department', (err, data) =>   {
       
          data = JSON.parse(JSON.stringify(data));
   
          for (let i = 0; i < data.length; i++){
              departmentArray.push({name: data[i].department_name, value: data[i].id});
          
          };
      }); 
      return departmentArray
  };