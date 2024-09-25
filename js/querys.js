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
     INNER JOIN role.department_id = department.id`
)
}

const getEmployeeTable =() =>{
pool.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, manger.first_name + '' + manger.last_name AS manager 
     FROM employee 
     LEFT JOIN employees ON employee.role_id = role.id 
     LEFT JOIN employee manager ON employee.manager_id = manager.id 
     LEFT JOIN role ON role.department_id = department.id`
)    
}

module.exports ={
    getDeparmentTable(),
    getRoleTable(),
    getEmployeeTale()
}