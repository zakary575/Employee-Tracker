DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db

CREATE TABLE department(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role(
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) ,
    salary DECIMAL,
    department_id INTEGER, FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER, FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    manager_id INTEGER, FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);