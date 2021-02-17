const inquirer = require("inquirer");
const { prompt } = require("inquirer");
const DB = require("./db/db.js")

function employeeMenu() {
  prompt({
    type: "list",
    name: "choice",
    message: "What action would you like to take?",
    choices: ["create", "view", "update", "delete"]
  }).then (function(answer) {
    switch(answer.choice) {
      case "create":
        // code block
        break;
      case "view":
        // code block
        break;
        case "update":
        // code block
        break;
        case "delete":
        // code block
        break;
      default:
        // code block
    }
  })
}
function roleMenu() {
  prompt({
    type: "list",
    name: "choice",
    message: "What action would you like to take?",
    choices: ["create", "view", "update", "delete"]
  }).then (function(answer) {
    switch(answer.choice) {
      case "create":
        // code block
        break;
      case "view":
        // code block
        break;
        case "update":
        // code block
        break;
        case "delete":
        // code block
        break;
      default:
        // code block
    }
  })
}
function departmentMenu() {
  prompt({
    type: "list",
    name: "choice",
    message: "What action would you like to take?",
    choices: ["create", "view", "update", "delete"]
  }).then (function(answer) {
    switch(answer.choice) {
      case "create":
        addDepartment();
        break;
      case "view":
       seeDepartments();
        break;
        case "update":
        // code block
        break;
        case "delete":
        deleteDepartment();
        break;
      default:
        // code block
    }
  })
}
function seeDepartments() {
 DB.viewDepartment().then(function(res){
   console.log(res);
   init()
 })
}
function addDepartment() {
  prompt({
    type: "input",
    message: "what is the name of your department?",
    name: "department"
  }).then(function(answer){
    DB.createDepartment(answer.department).then(function(res) {
      console.log(res);
      seeDepartments();
    })

  })
}
async function deleteDepartment() {
  const departments = await DB.viewDepartment();
const depArray = departments.map(({dep_name, id}) => ({
  name: dep_name,
  value: id
}))

  prompt({ 
    type: "list",
    name: "department_name",
    message: "which department would you like to delete?",
    choices: depArray
  }).then(function(answer) {
    DB.deleteDepartment(answer.department_name).then(function(response) {
      console.log(response);
      seeDepartments();
    })
  })
}
function init() {
prompt({
  type: "list",
  name: "choice",
  message: "What would you like to do today?",
  choices: ["employees", "roles", "departments"]
}).then (function(answer) {
  switch(answer.choice) {
    case "employees":
      employeeMenu();
      break;
    case "roles":
      roleMenu();
      break;
      case "departments":
      departmentMenu();
      break;
    default:
      // code block
  }
})
}

init();