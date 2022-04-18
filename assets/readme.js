const sharp = require("sharp");
sharp.cache(false);

async function resizeFile(path) {
    try {
        let buffer = await sharp(path)
        .resize({ width: 650 })
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

const buildLicenseBadge = (data) => {
    const license = encodeURIComponent(data.license); 
    return`
![License](https://img.shields.io/badge/License-${license}-blue)
`  
};

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

const buildInstallation = (data_arr) => {
    const ins = data_arr.reverse().map(i => `${i.installation} ${checkImg(i.imgSrc)}<br /> <br />`).join('');
    return `\n## Installation\n${ins}\n`;
};

const buildUsage = (data_arr) => {
    const ins = data_arr.reverse().map(u => `${u.usage} ${checkImg(u.imgSrc)} <br /> <br />`).join('');
    return `\n## Usage\n${ins}`;
};

const buildLicense = (data) => {
    return `
## License
Licensed under ${data.license}
`
};

const buildCredit = (data_arr) => {
    const ins = data_arr.reverse().map(c => `${c.credit} <br />`).join('');
    return `\n## Credit\n${ins}`;
};

const buildTest = (data_arr) => {
    console.log(data_arr);
    const ins = data_arr.reverse().map(t => `${t.test} ${checkImg(t.imgSrc)} <br /> <br />`).join('');
    return `\n## Tests\n${ins}`;
};

const buildQuestions = (data) => {
    return `
## Questions
[My gitHub](https://github.com/${data.username}/)
\n
Should you have additional questions, you can email me at ${data.email} and I will be glad to answer them
`
}
module.exports = { buildTitle, buildLicenseBadge, buildDescription, buildInstallation, buildUsage, buildLicense, buildCredit, buildTest, buildQuestions };