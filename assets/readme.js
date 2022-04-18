const sharp = require("sharp");
sharp.cache(false);

// Function to resize any image to a width of 700px using the sharp package
async function resizeFile(path) {
    try {
        let buffer = await sharp(path)
        .resize({ width: 700 })
        .toBuffer();
        return sharp(buffer).toFile(path);
    
    }
    catch(err) {
        console.error(err);
    }
}

const buildTitle = (data) => {
    return `
# ${data.title}
`
};

// License badge
const buildLicenseBadge = (data) => {
    const license = encodeURIComponent(data.license); 
    return`
![License](https://img.shields.io/badge/License-${license}-blue)
`  
};

// Build string for description and table of contents
const buildDescription = (data) => {
    return `
## Description
${data.description}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Credits](#credits)
- [Tests](#tests)
- [Questions](#questions)
`
};

// Function to check if an image exists and set the image link string
const checkImg = (imageSrc) => {
    if(imageSrc == "") {
        imgLink = "";
    }
    else {
        resizeFile(imageSrc);
        imgLink = `<br />![Image](${imageSrc})`;
    }
    return imgLink;
};

// Function to build installation string
const buildInstallation = (data_arr) => {
    const ins = data_arr.reverse().map(i => `${i.installation} ${checkImg(i.imgSrc)}<br /> <br />`).join('');
    return `\n## Installation\n${ins}\n`;
};

// Function to build usage string
const buildUsage = (data_arr) => {
    const ins = data_arr.reverse().map(u => `${u.usage} ${checkImg(u.imgSrc)} <br /> <br />`).join('');
    return `\n## Usage\n${ins}`;
};

// Function to build License string
const buildLicense = (data) => {
    return `
## License
Licensed under ${data.license}
`
};

// Function to build credit string
const buildCredit = (data_arr) => {
    const ins = data_arr.reverse().map(c => `${c.credit} <br />`).join('');
    return `\n## Credit\n${ins}`;
};

// Function to build testing string
const buildTest = (data_arr) => {
    const ins = data_arr.reverse().map(t => `${t.test} ${checkImg(t.imgSrc)} <br /> <br />`).join('');
    return `\n## Tests\n${ins}`;
};

// Function to build Questions string
const buildQuestions = (data) => {
    return `
## Questions
[My gitHub](https://github.com/${data.username}/)
\n
Should you have additional questions, you can email me at ${data.email} and I will be glad to answer them
`
}

// Exporting function modules
module.exports = { buildTitle, buildLicenseBadge, buildDescription, buildInstallation, buildUsage, buildLicense, buildCredit, buildTest, buildQuestions };