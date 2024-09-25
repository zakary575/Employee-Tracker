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
      console.log(rows);
    }
  );
};

const getRoleTable = () => {
  pool.query(
    `SELECT role.id, role.title, department.name, role.salary 
    FROM role
    RIGHT JOIN department ON role.department_id = department.id`,
    function (err, { rows }) {
      console.log(rows);
    }
  );
};

const getEmployeeTable = () => {
  pool.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name,' ', manager.last_name) AS manager 
    FROM employee
    RIGHT JOIN role ON employee.role_id = role.id 
    LEFT JOIN employee manager ON employee.manager_id = manager.id 
    RIGHT JOIN department ON role.department_id = department.id`,
    function (err, { rows }) {
      console.log(rows);
    }
  );
};

const addDepartment = (name) => {
  pool.query(
    `INSERT INTO department (name)
    VALUES (${name})`
  );
};

const addRole = (title, salary, department_id) => {
  pool.query(
    `INSERT INTO role (title, salary, department_id)
    VALUES (${title},${salary},${department_id})`
  );
};

const addEmployee = (firstName, LastName, roleId, managerId) => {
  pool.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (${first_name},${last_name},${role_id},${manager_id})`
  );
};

const getDepartments = () => {
   let departments = ''
   pool.query(
    `SELECT name
        FROM department`,
    function (err, {rows}) {
    console.log(rows)
    departments = rows
    }
  )
  console.log(departments)
  return departments;
};

module.exports = {
  getDepartmentTable,
  getRoleTable,
  getEmployeeTable,
  addDepartment,
  addRole,
  addEmployee,
};

console.log(getDepartments())