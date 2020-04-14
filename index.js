const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFilAsync = util.promisify(fs.writeFile);

// This needs a relative path because it only exists on your computer
const api = require("./api");

function promptUser() {
  return inquirer.prompt([
    
    {
      type: "input",
      name: "title",
      message: "What is the title of your project"
    },
    {
      type: "input",
      name: "description",
      message: "What is the description of your project?"
    },
    {
      type: "input",
      name: "tableOfContents",
      message: "Table of Contents?"
    },
    {
      type: "input",
      name: "installation",
      message: "What's the installation process?"
    },
    {
      type: "input",
      name: "usage",
      message: "What can this be used for?"
    },

    {
      type: "input",
      name: "credits",
      message: "Who deserves credit for helping out with this project?"
    },

    // {
    //   type: "input",
    //   name: "Badges",
    //   message: "Who deserves credit for helping out with this project?"
    // },

    {
      type: "input",
      name: "contributors",
      message: "Would you like to include contributors"
    },

    {
      type: "input",
      name: "tests",
      message: "How can your program's tests be ran?"
    },

    {
      type: "list",
      name: "license",
      choices: ["MIT", "ISC", "GPL-3.0"],
      message: "What kind of license was used for this?"
    },

    {
      type: "input",
      name: "github",
      message: "What is your GitHub account?"
    }

  ]);
}

// Look up inquirer documentation on promises and data
// The data that's being passed in are these prompts above
// The .then is waiting for the user to answer and .then is what allows us to get the answers through the prompt and inquirer
promptUser().then((answers) => {
  console.log(answers);
  // asycn turns the function into an async await function
  api.getUser(answers.github, async (githubData) => {
    console.log(githubData);
    const md = generateMarkdown(answers, githubData);

    await writeFilAsync("README.md", md);

  });
});

const renderLicenseBadge = (license) => {

  // Make the url string
  const licenseUrl = `https://img.shields.io/badge/license-${license}-purple`;
  console.log(licenseUrl)
  // Then turn it into markdown
  const licenseMarkdown =`![License](${licenseUrl})`;
  return licenseMarkdown;
}

// Gotta accept both arguments from the generateMarkdown function
function generateMarkdown(answers, githubData) {
  return `
  
# Title 
${answers.title}
  
## Description
${answers.description}
  
## Table of Contents
  
${answers.tableOfContents}
  
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## Installation

${answers.installation}

## Usage

${answers.usage}

## Credits

${answers.credits}

## Badges
${renderLicenseBadge(answers.license)}

## Contributors

${answers.contributors}

## Tests
  
${answers.tests}

## License

${answers.license}

${githubData.name}
${githubData.url}
${githubData.avatar_url}





`;


}


