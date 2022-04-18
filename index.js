const fs = require("fs");
const inquirer = require("inquirer");
const readme = require("./assets/readme");

const promptImg = () => {
    return inquirer.prompt([
        {
            name: "image",
            type: "input",
            message: "Please enter the file path of the image: "
        }
    ]);
};

const confirmImg = () => {
    return inquirer.prompt([
        {
            name: "addImage",
            type: "confirm",
            message: "Would you like to add an image?"
        }
    ]);
};

// Prompt user part 1: prompt for title and description

const promptTitle = () => {
    return inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter Title"
        }
    ]);
};

const promptDesc = () => {
    return inquirer.prompt([
        {
            name: "description",
            type: "input",
            message: "Enter Description"
        },
    ]);
};

const promptInstallation = () => {
    return inquirer.prompt([
        {
            name: "installation",
            type: "input",
            message: "Please enter the steps to install your project:"
        }
    ]);
};

const confirmInstallation = () => {
    return inquirer.prompt([
        {
            name: "moreInstallation",
            type: "confirm",
            message: "Add more installation instruction?"
        }
    ]);
};

const promptUsage = () => {
    return inquirer.prompt([
        {
            name: "usage",
            type: "input",
            message: "Please provide instructions and examples for use:"
        }
    ]);
};
const confirmUsage = () => {
    return inquirer.prompt([
        {
            name: "moreUsage",
            type: "confirm",
            message: "Add more usage instruction?"
        }
    ]);
};

const chooseLicense = async () => {
    return inquirer.prompt([
        {
            name: "license",
            type: "list",
            message: "Please choose a license for your project:",
            choices: [
                "MIT",
                "Apache 2.0",
                "GPL 3.0",
                "BSD 2 Clause",
                "BSD 3 Clause",
                "BSD 4 Clause"
            ]
        },
    ]);
};

const promptCreditTest = async () => {
    return inquirer.prompt([
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
    ]);
}

const promptQuestions = async () => {
    return inquirer.prompt([
        {
            name: "username", 
            type: "input", 
            message: "Please enter your github username:"
        },
        {
            name: "email", 
            type: "input",
            message: "Please enter your email address:"
        }
    ]);
}

let installArr = [];
const getInstallData = async () => {

    const installObj = {};
    const promptInstallData = await promptInstallation();

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
        await getInstallData();
    }
    installObj.installation = promptInstallData.installation;
    installArr.push(installObj);
    return installArr;
}

let usageArr = [];
const getUsageData = async () => {

    const usageObj = {};
    const promptUsageData = await promptUsage();

    const getImageConfirm = await confirmImg();
    if (getImageConfirm.addImage == true) {
        const promptImgData = await promptImg();
        usageObj.imgSrc = promptImgData.image;
    }
    else {
        usageObj.imgSrc = "";
    }

    const getUsageConfirm = await confirmUsage();
    if (getUsageConfirm.moreUsage == true) {
        await getUsageData();
    }
    usageObj.usage = promptUsageData.usage;
    usageArr.push(usageObj);
    return usageArr;
}

const init = async () => {
    const titleData = await promptTitle()
    const descData = await promptDesc()
    const installData_arr = await getInstallData();
    const usageData_arr = await getUsageData();
    const licenseData = await chooseLicense()
    const creditTestData = await promptCreditTest()
    const questionsData = await promptQuestions()

    const buildTitle = readme.buildTitle(titleData);
    const buildLicenseBadge = readme.buildLicenseBadge(licenseData);
    const buildDescription = readme.buildDescription(descData);
    const buildInstallation = readme.buildInstallation(installData_arr); 
    const buildUsage = readme.buildUsage(usageData_arr);
    const buildLicense = readme.buildLicense(licenseData);
    const buildCreditTest = readme.buildCreditTest(creditTestData);
    const buildQuestions = readme.buildQuestions(questionsData);

    let join = `
    ${buildTitle}
    ${buildLicenseBadge}
    ${buildDescription}
    ${buildInstallation}
    ${buildUsage}
    ${buildLicense}
    ${buildCreditTest}
    ${buildQuestions}
    `;
    fs.writeFileSync("README.md", join);
}
init();
