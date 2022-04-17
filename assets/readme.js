const buildReadme = (input) =>
{
return `

# ${input.title}

## Description
${input.description}

## Table of Contents


If your README is long, add a table of contents to make it easy for users to find what they need.

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Credits](#credits)
- [Tests](#tests)


## Installation
${input.installation}

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

`;
}

module.exports = { buildReadme };