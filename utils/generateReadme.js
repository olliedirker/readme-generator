function renderBadges(username, repo) {
  let ret = ""
  ret += `
![Analysis](https://img.shields.io/github/languages/top/${username}/${repo})`
  return ret
}
//function for generating markdown for file
const generateReadme = async (data) => {
  console.log("Markdown generated");
  console.log(data);

  let addSections = "";

  // gets title data
  if (data.title) {
    addSections += `# ${data.title}
`;
  }

  // repo link data
  if (data.github && data.title) {
    addSections += `
https://github.com/${data.github}
`;
  }

  //creates the repo badges
  addSections += `${renderBadges(data.github, data.repo)}`

  //gets description data
  if (data.description) {
    addSections += `
## Description
${data.description}
`;
  }

  //adds to table of contents
  addSections += tableOContents(data);

  //installing the data
  if (data.installation) {
    addSections += `
## Installation
${data.installation}
`;
  }

  if (data.usage) {
    addSections += `
## Usage
${data.usage}
`;
  }
  if (data.contributing) {
    addSections += `
## Contributing
${data.contributing}
`;
  }
  // QUESTIONS
  if (data.email) {
    addSections += `
## Questions
If there are any additional questions send me an email! 
${data.email}
`;
  }
  console.log(addSections);
  return addSections;
};

// Creates Table of Contents
function tableOContents(data) {
  const content = Object.entries(data);
  let result = "";
  let i = 2; 
  //cut title and description
  result += `
## Table of Contents`;
  while (content[i][0] != "github") {
    let header = content[i][0].charAt(0).toUpperCase() + content[i][0].slice(1);
    result += `
* [${header}](#${content[i][0]})`;
    i++;
  }
  result += `
* [Questions](#questions)
`;
  return result;
}

module.exports=generateReadme;
