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

const chooseLicense = () => {
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

const promptCredit = () => {
    return inquirer.prompt([
        {
            name: "credit",
            type: "input",
            message: "Please enter a collaborator:"
        }
    ]);
};

const confirmCredit = () => {
    return inquirer.prompt([
        {
            name: "moreCredit",
            type: "confirm",
            message: "Add more collaborator?"
        }
    ]);
};

const promptTest = () => {
    return inquirer.prompt([
        {
            name: "test",
            type: "input",
            message: "Please enter testing: "
        }
    ]);
}

const confirmTest = () => {
    return inquirer.prompt([
        {
            name: "moreTest",
            type: "confirm",
            message: "Add more test examples?"
        }
    ]);
};

const promptQuestions = () => {
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

let creditArr = [];
const getCreditData = async () => {

    const creditObj = {};
    const promptCreditData = await promptCredit();

    const getCreditConfirm = await confirmCredit();
    if (getCreditConfirm.moreCredit == true) {
        await getCreditData();
    }
    creditObj.credit = promptCreditData.credit;
    creditArr.push(creditObj);
    return creditArr;
}

let testArr = [];
const getTestData = async () => {

    const testObj = {};
    const promptTestData = await promptTest();

    const getImageConfirm = await confirmImg();
    if (getImageConfirm.addImage == true) {
        const promptImgData = await promptImg();
        testObj.imgSrc = promptImgData.image;
    }
    else {
        testObj.imgSrc = "";
    }

    const getTestConfirm = await confirmTest();
    if (getTestConfirm.moreTest == true) {
        await getTestData();
    }
    testObj.test = promptTestData.test;
    testArr.push(testObj);

    return testArr;
}

const init = async () => {
    const titleData = await promptTitle()
    const descData = await promptDesc()
    const installData_arr = await getInstallData();
    const usageData_arr = await getUsageData();
    const licenseData = await chooseLicense();
    const creditData = await getCreditData();
    const testData = await getTestData();
    const questionsData = await promptQuestions();

    const buildTitle = readme.buildTitle(titleData);
    const buildLicenseBadge = readme.buildLicenseBadge(licenseData);
    const buildDescription = readme.buildDescription(descData);
    const buildInstallation = readme.buildInstallation(installData_arr); 
    const buildUsage = readme.buildUsage(usageData_arr);
    const buildLicense = readme.buildLicense(licenseData);
    const buildCredit = readme.buildCredit(creditData);
    const buildTest = readme.buildTest(testData);
    const buildQuestions = readme.buildQuestions(questionsData);

    let join = `
    ${buildTitle}
    ${buildLicenseBadge}
    ${buildDescription}
    ${buildInstallation}
    ${buildUsage}
    ${buildLicense}
    ${buildCredit}
    ${buildTest}
    ${buildQuestions}
    `;

    fs.writeFileSync("./README.md", join);
}
init();
