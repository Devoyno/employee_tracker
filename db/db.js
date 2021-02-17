const connection = require("./connection")


class DB {
  constructor (connection) {
    this.connection = connection;
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
  createRoles(title, salary, dep_id)
}

module.exports = new DB(connection);