const fs = require("fs");
const inquirer = require("inquirer");
const { asyncScheduler } = require("rxjs");

const promtUser_01 = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter Title",
            name: "title"
        },
        {
            type: "input",
            message: "Enter Description",
            name: "description"
        },
        // {
        //     type: "input",
        //     message: "Enter Content for TOC",
        //     name: "toc"
        // },
    ])
}

const promtUser_02 = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter Content for TOC",
            name: "TOC"
        },
        {
            type: "confirm",
            message: "Add more contents?",
            name: "confirmTOC",
        },
        
    ])    
}




const buildReadme_01 = ({title, description, toc, contentYN}) => 
`
# ${title}
## Description
${description}
`

const buildReadme_02 = ({toc}) => 
`
## Table of contents
${toc}
`

const init1 = async () => {
     await promtUser_01()
     await promtUser_02()
    // .then((input) => fs.appendFile("README.md", buildReadme_01(input)));
} 

const init2 = async () => {
    promtUser_02()
}

// const init = async () => {
//     await promtUser_01()
//     .then((input) => fs.appendFile("README.md", buildReadme_01(input)))
//     await promtUser_02()
//     .then((input) => {
//         console.log("i am here");
//         // if(input.confirmTOC) {
//         //     fs.appendFile("README.md", buildReadme_02(input))
//         // }
//         // else {
//         //     return;
//         // }
//     })
// };
init1();