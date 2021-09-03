//Includes packages needed for this application
const inquirer = require("inquirer");
const jest = require("jest");
const fs = require("fs");
const path = require("path");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

let team = [];
let id = 0;

const addTeamMember = async () => {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "What is the new teammates role?",
      choices: ["Manager", "Engineer", "Intern", "N/A"],
    },
  ]);

  switch (answer.role) {
    case "Manager":
      createManager();
      break;
    case "Intern":
      createIntern();
      break;
    case "Engineer":
      createEngineer();
      break;
    default:
      end();
      break;
  }
};

const createManager = async () => {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the new teammates name?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the new teammates email?",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is the new teammates offcie number?",
    },
  ]);

  //create Manager Object
  const newManager = new Manager(
    answer.name,
    id,
    answer.email,
    answer.officeNumber
  );
  //push Manager Object into the teams array
  id = id + 1;
  team.push(newManager);
  //ask the question once more
  moreMembers();
};

const createEngineer = async () => {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the new teammates name?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the new teammates email?",
    },
    {
      type: "input",
      name: "github",
      message: "What is the new teammates github?",
    },
  ]);

  //create Engineer Object
  const newEngineer = new Engineer(
    answer.name,
    id,
    answer.email,
    answer.github
  );
  id = id + 1;
  //push Engineer Object into the teams array
  team.push(newEngineer);
  //ask the question once more
  moreMembers();
};

const createIntern = async () => {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the new teammates name?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the new teammates email?",
    },
    {
      type: "input",
      name: "school",
      message: "What is the new teammates school?",
    },
  ]);

  //create Intern Object
  const newIntern = new Intern(answer.name, id, answer.email, answer.school);
  id = id + 1;
  //push Intern Object into the teams array
  team.push(newIntern);
  //ask the question once more
  moreMembers();
};

const end = () => {
  let template = "";

  team.forEach((member) => {
    switch (member.getRole()) {
      case "Manager":
        template += `
        <div class="card h-100" style="width: 18rem">
          <img
            src="https://img.freepik.com/free-vector/programming-code-icon-made-with-binary-code-coding-hacker-matrix-background-with-digits-1-0_127544-1141.jpg?size=626&ext=jpg"
            class="card-img-top"
           alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${member.name}</h5>
          <p class="card-text">Title: ${member.getRole()}</p>
          <p class="card-text">Id: ${member.id}</p>
          <p class="card-text">email: ${member.email}</p>
          <p class="card-text">OfficeNumber: ${member.officeNumber}</p>
        </div>
      </div>
      `;
      break;
      case "Intern":
        template += `
        <div class="card h-100" style="width: 18rem">
          <img
            src="https://img.freepik.com/free-vector/programming-code-icon-made-with-binary-code-coding-hacker-matrix-background-with-digits-1-0_127544-1141.jpg?size=626&ext=jpg"
            class="card-img-top"
           alt="..."
        />
          <div class="card-body">
            <h5 class="card-title">${member.name}</h5>
            <p class="card-text">Title: ${member.getRole()}</p>
            <p class="card-text">Id: ${member.id}</p>
            <p class="card-text">email: ${member.email}</p>
            <p class="card-text">school: ${member.school}</p>
          </div>
        </div>
        `;
        break;
      case "Engineer":
        template += `
        <div class="card h-100" style="width: 18rem">
          <img
           src="https://img.freepik.com/free-vector/programming-code-icon-made-with-binary-code-coding-hacker-matrix-background-with-digits-1-0_127544-1141.jpg?size=626&ext=jpg"
           class="card-img-top"
           alt="..."
        />
            <div class="card-body">
              <h5 class="card-title">${member.name}</h5>
              <p class="card-text">Title: ${member.getRole()}</p>
              <p class="card-text">Id: ${member.id}</p>
              <p class="card-text">email: ${member.email}</p>
              <p class="card-text">github: ${member.github}</p>
            </div>
          </div>
          `;
        break;
    }
  });

  
  const finalHTML = `
  
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
      crossorigin="anonymous"
    />
    <title>Profile Generator</title>
  </head>
  <body>
    <header class="card d-block p-2 bg-primary text-white text-center">
      <h1>My Team</h1>
    </header>
    <div class="row row-cols-1 row-cols-md-2 g-4 mx-5">
     ${template}
  </body>
  </html>
  `;

  fs.appendFileSync(path.join(__dirname, "/index.html"), finalHTML, "utf8");
};
function moreMembers() {
  inquirer
    .prompt([
      {
        name: "continue",
        message: "Do you want to add another team member?",
        type: "confirm",
      },
    ])
    .then(function (confirmRes) {
      confirmRes.continue ? addTeamMember() : end();
    });
}

addTeamMember();

