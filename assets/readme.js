const inquirer = require("inquirer");

const buildReadme_part1 = (input) =>
{
return `

# ${input.title}

## Description
${input.description}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Credits](#credits)
- [Tests](#tests)
`
}

const buildReadme_part2 = (installations) => {
    
    console.log(installations);
//    const ins = installations.map(i => `${i.installation} <br />`).join('');
//    return `## Instructions\n${ins}`;
}

const buildReadme_part3 = (input) =>  {
return `
## Usage
${input.usage}

## License
${input.license}

## Credits
${input.credits}

## Tests
${input.tests}
---

## Badges

![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

`
}
module.exports = { buildReadme_part1, buildReadme_part2, buildReadme_part3 };