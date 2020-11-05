const {prompt} = require('inquirer')
const db = require('./db')

async function askTopQuestions(){
    const {action} = await prompt([
        {
            type: 'list',
            name: "action",
            message: "What would you like to do?",
            choices: [
                {
                    name: "Add a department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add a role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add an employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "View departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Update employee roles",
                    value: "UPDATE_EMPLOYEE_ROLES"
                },
                {
                    name: "Quit program",
                    value: "QUIT"
                },
            ]
        }
    ])
    switch(action){
        case 'ADD_DEPARTMENT':
            return addDepartment()
        case 'ADD_ROLE':
            return addRole() 
        case 'ADD_EMPLOYEE':
            return addEmployee() 
        case 'VIEW_DEPARTMENTS':
            return viewDepartments()
        case 'VIEW_ROLES':
            return viewRoles() 
        case 'VIEW_EMPLOYEES':
            return viewEmployees()  
        case 'UPDATE_EMPLOYEE_ROLES':
            return updateEmployeeRoles()    
        default:
            return process.exit()
    }
}

askTopQuestions()

async function addDepartment(){
    const department = await prompt([
        {
            type: 'text',
            name: "name",
            message: "What is the name of the department?",
        }
    ])

    await db.createDepartment(department)
    askTopQuestions()
}


async function addRole(){
    const departments = await db.readAllDepartments()
    const departmentChoices = departments.map(department => {
        return {
            name: department.name,
            value: department.id
        }
    })
    const role = await prompt([
        {
            type: 'text',
            name: "title",
            message: "What is the name of the role?",
        },
        {
            type: 'number',
            name: "salary",
            message: "What is the salary of the role?",
        },
        {
            type: 'list',
            name: 'department_id',
            message: "Which department does this role belong to?",
            choices: departmentChoices
        }
    ])

    await db.createRole(role)
    askTopQuestions()
}

async function addEmployee(){
    const roles = await db.readAllRoles()
    const employees = await db.readAllEmployees()

    const roleChoices = roles.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    })

    const managerChoices = employees.map(employee => {
        return {
            name: employee.first_name + " " + employee.last_name,
            value: employee.id
        }
    })
    managerChoices.push({
        name: "This employee does not have a manager",
        value: null
    })
    const employee = await prompt([
        {
            type: 'text',
            name: "first_name",
            message: "What is the first name of the employee?",
        },
        {
            type: 'text',
            name: "last_name",
            message: "What is the last name of the employee?",
        },
        {
            type: 'list',
            name: 'role_id',
            message: "What is the employee's role?",
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'manager_id',
            message: "Who is the employee's manager?",
            choices: managerChoices
        }
    ])

    await db.createEmployee(employee)
    askTopQuestions()
}

async function updateEmployeeRoles(){
    const roles = await db.readAllRoles()
    const employees = await db.readAllEmployees()

    const roleChoices = roles.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    })
    
    const employeeChoices = employees.map(employee => {
        return {
            name: employee.first_name + " " + employee.last_name,
            value: employee.id
        }
    })
    const employee = await prompt([
        {
            type: 'list',
            name: 'id',
            message: "Which employee would you like to update role?",
            choices: employeeChoices,
        },
        {
            type: 'list',
            name: 'role_id',
            message: "What is the employee's new role?",
            choices: roleChoices
        }
    ])

    await db.updateEmployee(employee)
    askTopQuestions()
}

async function viewDepartments(){
    const departments = await db.readAllDepartments()
    console.table(departments)
    askTopQuestions()
}

async function viewRoles(){
    const roles = await db.readRoleDisplay()
    console.table(roles)
    askTopQuestions()
}

async function viewEmployees(){
    const employees = await db.readEmployeeDisplay()
    console.table(employees)
    askTopQuestions()
}