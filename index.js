const inquirer = require("inquirer");
const fs = require("fs");
const generateReadme = require("./utils/generateReadme");

const prompts = [
  {
    type: "input",
    name: "title",
    message: "Please enter projects title",
    default: "",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Your project must have a title!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "description",
    message: "What is your projects description? ",
    default: "",
  },
  {
    type: "input",
    name: "installation",
    message: "What external packages did you install?",
    default: "",
  },
  {
    type: "input",
    name: "contributing",
    message:
      "List your collaborators, if any, with links to their GitHub profiles.",
    default: "",
  },
  {
    type: "input",
    name: "github",
    message: "Enter your GitHub username.",
    validate: (githubInput) => {
      if (githubInput) {
        return true;
      } else {
        console.log("You need to enter your GitHub username!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "repo",
    message: "Please enter your GitHub repo name.",
    default: "",
    validate: (repoInput) => {
      if (repoInput) {
        return true;
      } else {
        console.log("Please enter your GitHub repo name!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "Enter your email.",
    default: "",
  },
];

const promptUser = async () => {
  let dataObject = {};
  for (let i = 0; i < prompts.length; i++) {
    await inquirer.prompt(prompts[i]).then((data) => {
      if (data[prompts[i].name]) {
        // if the prompt was answered
        dataObject[prompts[i].name] = data[prompts[i].name];
      }
    });
  }
  return dataObject;
};

const writeToFile = async (data) => {
  const markdown = await generateReadme(data);
  console.log("in writeToFile");
  return new Promise((resolve, reject) => {
    fs.writeFile("./dist/README.md", markdown, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        ok: true,
        message: "File succesfully created!",
      });
    });
  });
};

// this is for app initialazion 
const init = () => {
  return promptUser();
};

//this is for error handling 
const failureCallback = (err) => {
  console.log(`Error : ${err}`);
};

//the function that initializes the app
init().then((data) => {
  writeToFile(data);
}, failureCallback);
