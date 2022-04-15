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
    ])
}

const promtUser_02 = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter Content for TOC",
            name: "toc"
        },
        {
            type: "confirm",
            message: "Add more contents?",
            name: "confirmTOC",
        },

    ])
}

const buildReadme_01 = ({ title, description }) =>
    `
# ${title}
## Description
${description}
`

const buildReadme_02 = (tocs) => {
    const tableOfContents = tocs.map(t => `${t.toc} <br />`).join('');
    return `## Table of contents\n${tableOfContents}`
}
const init = async () => {
    const input1 = await promtUser_01()
    const inputToc = [await promtUser_02()]

    console.log(inputToc);

    while (inputToc.slice(-1)[0].confirmTOC == true) {
        const inputNextToc = await promtUser_02()
        inputToc.push(inputNextToc);
        console.log(inputToc);
    }

    fs.writeFileSync("README.md", buildReadme_01(input1));
    fs.appendFileSync("README.md", buildReadme_02(inputToc));
}
init();