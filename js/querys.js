const express = require('express');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const pool = new Pool(
    {
      user: 'postgres',
      password: 'ZzookK5757@',
      host: 'localhost',
      database: 'books_db'
    },
    console.log(`Connected to the books_db database.`)
  )
  
pool.connect();


const getDepartmentTable = () => {
pool.query(
    `SELECT * 
     FROM department`
)
}

const getRoleTable = () => {
pool.query(
    `SELECT role.id, role.title, department.name, role.salary 
    FROM role
    RIGHT JOIN department ON role.department_id = department.id`
)
}

const getEmployeeTable =() =>{
pool.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name,' ', manager.last_name) AS manager 
    FROM employee
    RIGHT JOIN role ON employee.role_id = role.id 
    LEFT JOIN employee manager ON employee.manager_id = manager.id 
    RIGHT JOIN department ON role.department_id = department.id`
)    
}

const addDepartment = (name) => {
pool.query(
    `INSERT INTO department (name)
    VALUES (${name})`
)
}

const addRole = (title,salary,department_id) => {
pool.query(
    `INSERT INTO role (title, salary, department_id)
    VALUES (${title},${salary},${department_id})`
)
}

const addEmployee = (firstName,LastName,roleId,managerId) => {
    pool.query(
        `INSERT INTO role (first_name, last_name, role_id, manager_id)
        VALUES (${first_name},${last_name},${role_id},${manager_id})`
    )
    }

module.exports ={
    getDeparmentTable(),
    getRoleTable(),
    getEmployeeTale()
}