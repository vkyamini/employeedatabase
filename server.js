const inquirer = require('inquirer');
const mysql = require('mysql2');
//const cTable = require('console.table');
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'admin',
      database: 'EMP_DB'
    },
    console.log(`Connected to the EMP_DB database.`)
      
  );


//    db.query('SELECT * FROM employee', function (err, results) {
//         console.log(results);
        
//       });
 
const mainprompt = () => {
  inquirer.prompt([
      {
        name: 'choices',
        type: 'list',
        message: 'Please select an option:',
        choices: [
          'View All Employees',
          'View All Roles',
          'View All Departments',
          'Update Employee Role',
          'Add Employee',
          'Add Role',
          'Add Department',
          'Exit'
          ]
      }
    ])
    .then((answers) => {
      const {choices} = answers;

        if (choices === 'View All Employees') {
            viewAllEmployees();
        }

        if (choices === 'View All Departments') {
          viewAllDepartments();
         }
         if (choices === 'View All Roles') {
          viewAllRoles();
         }
         if (choices === 'Add Employee') {
            addEmployee();
        }
         if (choices === 'Add Role') {
          addRole();
        }
        if (choices === 'Add Department') {
          addDepartment();
        }
        if (choices === 'Exit') {
            console.log("thank you!")
        }
  });
};

mainprompt();

const viewAllEmployees = () => {
  db.query('SELECT * FROM employee', function (err, results) {
         console.table(results);
         mainprompt();
          });
          
   };
   

   const viewAllDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
           console.table(results);
           mainprompt(); 
            });
     };
     const viewAllRoles = () => {
      db.query('SELECT * FROM role', function (err, results) {
             console.table(results);
             mainprompt(); 
              });
      };

  
const addEmployee = () =>{

inquirer.prompt([
  {
     type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?",

  },
  {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
  },
  {
    type: 'input',
      name: 'role_id',
      message: "What is the role_id?",
  },
  {
     type: 'input',
      name: 'manager_id',
      message: "What is the manager_id?",
  }
  
]).then((answers) => {
  console.log(answers);

  db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) 
  VALUES ('${answers.firstName}', '${answers.lastName}', '${answers.role_id}', '${answers.manager_id}')`),(err,data)=>{
    console.log(`successfully added employee!`, data);
    
  }
}).then(() => {
  viewAllEmployees();
});

}
const addRole = () =>{
  inquirer.prompt([
    {
       type: 'input',
        name: 'title',
        message: "What is the role title?",
  
    },
    {
        type: 'input',
        name: 'salary',
        message: "What is the salary?",
    },
    {
      type: 'input',
        name: 'dep_id',
        message: "What is the department_id?",
    },
  ]).then((answers) => {
    console.log(answers);
  
    db.query(`INSERT INTO role(title, salary, department_id) 
    VALUES ('${answers.title}', '${answers.salary}', '${answers.dep_id}')`),(err,data)=>{
      console.log(`successfully added role!` , data);
    }
  }).then(() => {
    viewAllRoles();
   
  });
}
const addDepartment =() =>{

  inquirer.prompt([
    {
       type: 'input',
        name: 'depname',
        message: "What is the department name?",
  
    },
    
  ]).then((answers) => {
    console.log(answers);
  
    db.query(`INSERT INTO department(department_name) 
    VALUES ('${answers.depname}')`),(err,data)=>{
      console.log(`successfully added department!` , data);
    }
  }).then(() => {
    viewAllDepartments();
   
  });
}