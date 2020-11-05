const connection = require('./connection')

class DB {
    constructor(connection){
        this.connection = connection
    }

    createDepartment(department){
        return this.connection.query(`
            INSERT INTO department
            SET ?
        `, department)
    }

    readAllDepartments(){
        return this.connection.query(`
            SELECT * FROM department
        `)
    }

    createRole(role){
        return this.connection.query(`
            INSERT INTO role
            SET ?
        `, role)
    }

    readAllRoles(){
        return this.connection.query(`
            SELECT * FROM role
        `)
    }

    readRoleDisplay(){
        return this.connection.query(`
            SELECT role.id, role.title, role.salary, department.name AS 'department name'
            FROM role
            LEFT JOIN department ON department.id = role.department_id
        `)
    }    

    readAllEmployees(){
        return this.connection.query(`
            SELECT * FROM employee
        `)
    }

    readEmployeeDisplay(){
        return this.connection.query(`
            SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS 'department name', manager.first_name AS 'Manager First Name', manager.last_name AS 'Manager Last Name'
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON department.id = role.department_id
            LEFT JOIN employee manager ON manager.id = employee.id
        `)
    }

    createEmployee(employee){
        return this.connection.query(`
            INSERT INTO employee
            SET ?
        `, employee)
    }

    updateEmployee(employee){
        return this.connection.query(`
            UPDATE employee
            SET role_id = ?
            WHERE id = ?
        `, [employee.role_id, employee.id])
    }
 
}

module.exports = new DB(connection)