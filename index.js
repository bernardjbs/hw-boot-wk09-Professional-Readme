const fs = require("fs");
const inquirer = require("inquirer");
const readme = require("./assets/readme")

// Prompt user part 1: prompt for title and description
const promtUser_part1 = () => {
    return inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter Title"
        },
        {
            name: "description",
            type: "input",
            message: "Enter Description"
        },
    ])
}

// Prompt user part 2: Installation
const promtUser_part2 = () => {
    return inquirer.prompt([
        {
            name: "installation",
            type: "input", 
            message: "Please enter the steps to install your project: [PROMPT STEPS]"
        }, 
        {
            type: "confirm",
            message: "Add more instruction?",
            name: "moreInstruction",
        },

    ])
}

const promtUser_part3 = () => {
    return inquirer.prompt([
        {
            name: "usage",
            type: "input", 
            message: "Please provide instructions and examples for use: [PROMPT STEPS - IMAGES]"
        }, 
        {
            name: "license", 
            type: "list", 
            message: "Please choose a license for your project: ", 
            choices: [
                "MIT",
                "Apache-2.0",
                "GPL-3.0",
                "BSD-2-Clause",
                "BSD-3-Clause",
                "BSD-4-Clause"
            ]
        }, 
        {
            name: "credits", 
            type: "input", 
            message: "List your collaborators + [LINK]"
        }, 
        {
            name: "tests", 
            type: "input", 
            message: "Please enter testing: "
        }        
    ])
}


const init = async () => {
    const input_01 = await promtUser_part1();
    const input_02 = [await promtUser_part2()];
    while(input_02.slice(-1)[0].moreInstruction == true) {
        const inputNextIns = await promtUser_part2();
        input_02.push(inputNextIns);
    }
    const input_03 = await promtUser_part3();
    
    const generateReadme_part1 = readme.buildReadme_part1(input_01);
    const generateReadme_part2 = readme.buildReadme_part2(input_02);
    const generateReadme_part3 = readme.buildReadme_part3(input_03);

    fs.writeFileSync("README.md", generateReadme_part1);
    fs.appendFileSync("README.md", generateReadme_part2);
    fs.appendFileSync("README.md", generateReadme_part3);
}
init();





























// const promtUser_02 = () => {
//     return inquirer.prompt([
//         {
//             type: "input",
//             message: "Enter Content for TOC",
//             name: "toc"
//         },
//         {
//             type: "confirm",
//             message: "Add more contents?",
//             name: "confirmTOC",
//         },

//     ])
// }

// const promtUser_03 = () => {
//     return inquirer.prompt([
//         {
//             type: "input", 
//             message: "Enter installation instructions",
//             name: "installation"
//         }, 
//         {
//             type: "input", 
//             message: "Enter usage",
//             name: "usage"
//         },
//         {
//             type: "input", 
//             message: "Enter License",
//             name: "license"
//         }, 
//         {
//             type: "input", 
//             message: "Enter Contribution",
//             name: "contributing"
//         }, 
//         {
//             type: "input", 
//             message: "Enter Tests",
//             name: "tests"
//         }, 
//         {
//             type: "input", 
//             message: "Enter Questions",
//             name: "questions"
//         }, 
        
//     ])
// }

// const buildReadme_01 = ({ title, description }) =>
//     `
// # ${title}
// ## Description
// ${description}
// `

// const buildReadme_02 = (tocs) => {
//     const tableOfContents = tocs.map(t => `${t.toc} <br />`).join('');
//     return `## Table of contents\n${tableOfContents}`
// }

// const buildReadme_03 = ({installation, usage, license, contributing, tests, questions}) => 
// `
// ## Installation
// ${installation}

// ## Usage
// ${usage}

// ## License
// ${license}

// ## Contributing
// ${contributing}

// ## Tests
// ${tests}

// ## Questions
// ${questions}
// `

// const init = async () => {
//     const input1 = await promtUser_01()
//     // const inputToc = [await promtUser_02()]
//     // while (inputToc.slice(-1)[0].confirmTOC == true) {
//     //     const inputNextToc = await promtUser_02()
//     //     inputToc.push(inputNextToc);
//     // }

//     const generateReadme = readme.buildReadme(input1)
//     fs.writeFileSync("README.md", generateReadme);
//     // fs.appendFileSync("README.md", buildReadme_02(inputToc));

//     // const input3 = await promtUser_03()
//     // fs.appendFileSync("README.md", buildReadme_03(input3));
// }

