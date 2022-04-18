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

const promptImg = () => {
    return inquirer.prompt([
        {
            name: "image",
            type: "input",
            message: "Please enter the file path of the image: "
        }
    ])
}


const confirmImg = () => {
    return inquirer.prompt([
        {
            name: "addImage",
            type: "confirm",
            message: "Would you like to add an image?"
        }
    ])
}

const confirmInstallation = () => {
    return inquirer.prompt([
        {
            name: "moreInstallation",
            type: "confirm",
            message: "Add more installation instruction?"
        }
    ])
}
// Prompt user part 2: Installation
const promtInstallation = () => {
    return inquirer.prompt([
        {
            name: "installation",
            type: "input",
            message: "Please enter the steps to install your project: [PROMPT STEPS]"
        }
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

let installArr = [];

const getInstall = async () => {
    const installObj = {};

    const promptInstallData = await promtInstallation();

    const getImageConfirm = await confirmImg();
    if (getImageConfirm.addImage == true) {
        const promptImgData = await promptImg();
        installObj.imgSrc = promptImgData.image;
    }
    else {
        installObj.imgSrc = "";        
    }

    const getInstallConfirm = await confirmInstallation();
    if (getInstallConfirm.moreInstallation == true) {
        await getInstall();
    }
    installObj.intallation = promptInstallData.installation;

    installArr.push(installObj);
    // console.log(getImageConfirm.addImage);
    // console.log(getInstallConfirm.moreInstallation);
    //console.log(installArr);

    return installArr;
}

const init = async () => {
    const input_01 = await promtUser_part1();


    input_02_arr = await getInstall();


    // const input_02 = [await promtUser_part2()];
    // while(input_02.slice(-1)[0].moreInstruction == true) {
    //     const inputNextIns = await promtUser_part2();
    //     input_02.push(inputNextIns);
    // }
    const input_03 = await promtUser_part3();

    const generateReadme_part1 = readme.buildReadme_part1(input_01);
    const generateReadme_part2 = readme.buildReadme_part2(input_02_arr);
    const generateReadme_part3 = readme.buildReadme_part3(input_03);

    fs.writeFileSync("README.md", generateReadme_part1);
    //fs.appendFileSync("README.md", generateReadme_part2);
    fs.appendFileSync("README.md", generateReadme_part3);
}
init();
