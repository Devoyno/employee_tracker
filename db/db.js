const connection = require("./connection")


class DB {
  constructor (connection) {
    this.connection = connection;
  }
  viewEmployees() {
    return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.dep_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.dep_id = department.id")
  }
  viewDepartment() {
    return this.connection.query("SELECT * FROM department")
  }
  createDepartment(name) {
    return this.connection.query("INSERT into department SET ?", {
      dep_name: name
    })
  }
  deleteDepartment(id) {
    return this.connection.query("DELETE FROM department WHERE id=?", id)
  }
  deleteRole(id) {
    return this.connection.query("DELETE FROM role WHERE id=?", id)
  }
  viewRoles() {
    return this.connection.query("SELECT * FROM role")
  }
  createRoles(title, salary, dep_id) {
    return this.connection.query("INSERT into role SET ?", {
      title: title,
      salary: salary,
      dep_id: dep_id
    })
  }
  createEmployee(first_name, last_name, role_id, manager_id) {
    return this.connection.query("INSERT into employee SET ?", {
      first_name, last_name, role_id, manager_id
    })
  }
  updateEmployeeRole(role_id, employee_id) {
    return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [role_id, employee_id])
  }
}

module.exports = new DB(connection);