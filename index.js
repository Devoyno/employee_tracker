const inquirer = require("inquirer");
const { prompt } = require("inquirer");
const DB = require("./db/db.js");
const { printTable } = require("console-table-printer");
const { listenerCount } = require("./db/connection.js");

function seeDepartments() {
  DB.viewDepartment().then(function (res) {
    printTable(res);
    console.log("\n");
    init();
  });
}
function addDepartment() {
  prompt({
    type: "input",
    message: "what is the name of your department?",
    name: "department",
  }).then(function (answer) {
    DB.createDepartment(answer.department).then(function (res) {
      console.log(res);
      seeDepartments();
    });
  });
}
async function deleteDepartment() {
  const departments = await DB.viewDepartment();
  const depArray = departments.map(({ dep_name, id }) => ({
    name: dep_name,
    value: id,
  }));

  prompt({
    type: "list",
    name: "department_name",
    message: "which department would you like to delete?",
    choices: depArray,
  }).then(function (answer) {
    DB.deleteDepartment(answer.department_name).then(function (response) {
      console.log(response);
      seeDepartments();
    });
  });
}

async function deleteRole() {
  const roles = await DB.viewRoles();
  const rolesArray = roles.map(({ title, id }) => ({
    name: title,
    value: id,
  }));

  prompt({
    type: "list",
    name: "role_id",
    message: "which role would you like to delete?",
    choices: rolesArray,
  }).then(function (answer) {
    DB.deleteRole(answer.role_id).then(function (response) {
      console.log("\n");
      seeRoles();
    });
  });
}

function seeRoles() {
  DB.viewRoles().then(function (res) {
    printTable(res);
    console.log("\n");
    init();
  });
}

function seeEmployees() {
  DB.viewEmployees().then(function (res) {
    printTable(res);
    console.log("\n");
    init();
  });
}

async function createRoles() {
  const departments = await DB.viewDepartment();
  const depArray = departments.map(({ dep_name, id }) => ({
    name: dep_name,
    value: id,
  }));
  prompt([
    {
      type: "input",
      message: "what is the title for this role?",
      name: "title",
    },
    {
      type: "input",
      message: "what is the salary for this role?",
      name: "salary",
    },
    {
      type: "list",
      message: "what is the department for this role?",
      name: "departmentID",
      choices: depArray,
    },
  ]).then(function (answer) {
    DB.createRoles(answer.title, answer.salary, answer.departmentID).then(
      function (response) {
        seeRoles();
      }
    );
  });
}
async function createEmployee() {
  const roles = await DB.viewRoles();
  const roleArray = roles.map(({ title, id }) => ({
    name: title,
    value: id,
  }));
  const manager = await DB.viewEmployees();
  const managerArray = manager.map(({ first_name, last_name, id }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));
  prompt([
    {
      type: "input",
      message: "what is the employee's first name?",
      name: "first_name",
    },
    {
      type: "input",
      message: "what is the employee's last name?",
      name: "last_name",
    },
    {
      type: "list",
      message: "what is the employee's role?",
      name: "roleID",
      choices: roleArray,
    },
    {
      type: "list",
      message: "who is the employee's manager?",
      name: "managerID",
      choices: managerArray,
    },
  ]).then(function (answer) {
    DB.createEmployee(
      answer.first_name,
      answer.last_name,
      answer.roleID,
      answer.managerID
    ).then(function (res) {
      seeEmployees();
      console.log("\n");
    });
  });
}
async function updateEmployeeRole() {
  const employees = await DB.viewEmployees();
  const employeeArray = employees.map(({ first_name, last_name, id }) => ({
    name: first_name +" "+ last_name,
    value: id,
  }));

  const roles = await DB.viewRoles();
  const rolesArray = roles.map(({ title, id }) => ({
    name: title,
    value: id,
  }));

  prompt({
    type: "list",
    message: "What employee would you like to update",
    name: "employee_id",
    choices: employeeArray
  }).then(function(res) {
    prompt({
      type: "list",
      message: "What is the employee's new title",
      name: "newTitle",
      choices: rolesArray
    }).then(function(res2) {
      console.log(res);

      console.log(res2);

      DB.updateEmployeeRole(res2.newTitle, res.employee_id).then(function(response){
        console.log(response)
        seeEmployees();
      })
     
    })

  })
}

function init() {
  prompt({
    type: "list",
    name: "choice",
    message: "What would you like to do today?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View Departments",
      "Create Department",
      "Delete Department",
      "View All Roles",
      "Create Role",
      "Delete Role",
    ],
  }).then(function (answer) {
    switch (answer.choice) {
      case "View All Employees":
        seeEmployees();
        break;
      case "Create Role":
        createRoles();
        break;
        case "Update Employee Role":
        updateEmployeeRole();
        break;
      case "Add Employee":
        createEmployee();
        break;
      case "Delete Role":
        deleteRole();
        break;
      case "View All Roles":
        seeRoles();
        break;
      case "View Departments":
        seeDepartments();
        break;
      case "Create Department":
        addDepartment();
        break;
      case "Delete Department":
        deleteDepartment();
        break;
      default:
        connection.end();
    }
  });
}

init();
