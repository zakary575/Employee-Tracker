const inquirer = require("inquirer");
const {
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
} = require("./querys");

const addEmployeeInquirer = () => {
  getRoles().then(function ({ rows }) {
    const roles = rows.map(({ title, id }) => ({ name: title, value: id }));
    getEmployees().then(function ({ rows }) {
      const employees = rows.map(({ employees, id }) => ({
        name: employees,
        value: id,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roles,
          },
          {
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: employees,
          },
        ])
        .then((answers) => {
          addEmployee(
            answers.firstName,
            answers.lastName,
            answers.roleId,
            answers.managerId
          );
          setTimeout(() => {
            menu();
          }, 250);
        });
    });
  });
};

const addRoleInquirer = () => {
  getDepartments().then(function ({ rows }) {
    const departments = rows.map(({ name, id }) => ({ name, value: id }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "number",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "departmentId",
          message: "What department does this belong to?",
          choices: departments,
        },
      ])
      .then((answers) => {
        addRole(answers.title, answers.salary, answers.departmentId);
        setTimeout(() => {
          menu();
        }, 250);
      });
  });
};

const addDepartmentInquirer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      addDepartment(answers.department);
      setTimeout(() => {
        menu();
      }, 250);
    });
};

const updateEmployeeInquirer = () => {
  getRoles().then(function ({ rows }) {
    const roles = rows.map(({ title, id }) => ({ name: title, value: id }));
    getEmployees().then(function ({ rows }) {
      const employees = rows.map(({ employees, id }) => ({
        name: employees,
        value: id,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message: "What employee would you like to update?",
            choices: employees,
          },
          {
            type: "list",
            name: "roleId",
            message: "What employee is there new role?",
            choices: roles,
          },
          {
            type: "list",
            name: "managerId",
            message: "Who is there new manager?",
            choices: employees,
          },
        ])
        .then((answers) => {
          updateEmployee(answers.roleId, answers.employeeId, answers.managerId);
          setTimeout(() => {
            menu();
          }, 250);
        });
    });
  });
};

const menu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Update an Employee",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.menu) {
        case "View All Employees":
          getEmployeeTable();
          setTimeout(() => {
            menu();
          }, 250);
          break;
        case "Add Employee":
          addEmployeeInquirer();
          break;
        case "View All Roles":
          getRoleTable();
          setTimeout(() => {
            menu();
          }, 250);
          break;
        case "Add Role":
          addRoleInquirer();
          break;
        case "View All Departments":
          getDepartmentTable();
          setTimeout(() => {
            menu();
          }, 250);
          break;
        case "Add Department":
          addDepartmentInquirer();
          break;
        case "Update an Employee":
          updateEmployeeInquirer();
          break;
        case "Quit":
          process.exit();
          break;
        default:
          console.log("Not a valid option");
      }
    });
};

menu();
