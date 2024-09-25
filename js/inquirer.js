const inquirer = require("inquirer")
const {
    getDepartmentTable,
    getRoleTable,
    getEmployeeTable,
    addDepartment,
    addRole,
    addEmployee,
  } = require("./querys");


  const addEmployeeInquirer = () =>{
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
                name: "role",
                message: "What is the employee's role?",
                choices: [
                    "Accountant",
                    "Legal Team Lead",
                    "Lawyer"
                ],
                // need to unhardcode
              },
              {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: [
                    "John Doe",
                    "Mike Chan"
                ],
                // need to unhardcode
              }
        ])
}

const addRoleInquirer = () =>{
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What is the name of the role?", 
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?", 
            },
            {
                type: "list",
                name: "department",
                message: "What department does this belong to?", 
                choices:[
                    "Sales",
                    "Engineering"
                ],
            // need to unhard code
            },
        ])
}


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
                "Quit"
            ],
          }
    ])
.then((answers) =>{
switch(answers.menu){
    case "View All Employees":
        getEmployeeTable();
        break
    case "Add Employee":
        addEmployeeInquirer();
        break
    case "View All Roles":
        getRoleTable()
        break
    case "Add Role":
        addRoleInquirer()
        break
    case "View All Departments":
        getDepartmentTable();
        break
    case "Add Department":

        break
    case "Quit":
        quit = true
        break
    default:
        console.log("Not a valid option")
}
}
)
}


menu()