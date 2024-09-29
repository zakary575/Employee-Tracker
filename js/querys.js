const express = require("express");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
  {
    user: "postgres",
    password: "ZzookK5757@",
    host: "localhost",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

pool.connect();

const getDepartmentTable = () => {
  pool.query(
    `SELECT * 
     FROM department`,
    function (err, { rows }) {
      console.table(rows);
    }
  );
};

const getRoleTable = () => {
  pool.query(
    `SELECT role.id, role.title, department.name, role.salary 
    FROM role
    RIGHT JOIN department ON role.department_id = department.id`,
    function (err, { rows }) {
      console.table(rows);
    }
  );
};

const getEmployeeTable = () => {
  pool.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name,' ', manager.last_name) AS manager 
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN employee manager ON employee.manager_id = manager.id 
    RIGHT JOIN department ON role.department_id = department.id`,
    function (err, { rows }) {
      console.table(rows);
    }
  );
};

const addDepartment = (name) => {
  pool.query(
    `INSERT INTO department (name)
    VALUES ($1)`,
    [name],
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Department added!");
    }
  );
};

const addRole = (title, salary, department_id) => {
  pool.query(
    `INSERT INTO role (title, salary, department_id)
    VALUES ($1,$2,$3)`,
    [title, salary, department_id],
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Role added!");
    }
  );
};

const addEmployee = (firstName, LastName, roleId, managerId) => {
  pool.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ($1,$2,$3,$4)`,
    [firstName, LastName, roleId, managerId],
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Employee added!");
    }
  );
};

const getDepartments = () => {
  return pool.query(
    `SELECT *
        FROM department`
  );
};

const getRoles = () => {
  return pool.query(
    `SELECT id,title
            FROM role`
  );
};

const getEmployees = () => {
  return pool.query(
    `SELECT id,CONCAT (employee.first_name,' ', employee.last_name) AS employees   
        FROM employee`
  );
};

const updateEmployee = (roleId, employeeId,managerId) => {
  return pool.query(
    `UPDATE employee 
SET role_id = $1, manager_id = $3
WHERE id = $2`,
    [roleId, employeeId,managerId],
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Employee updated!");
    }
  );
};

module.exports = {
  getDepartmentTable,
  getRoleTable,
  getEmployeeTable,
  addDepartment,
  addRole,
  addEmployee,
  getDepartments,
  getRoles,
  getEmployees,
  updateEmployee,
};
