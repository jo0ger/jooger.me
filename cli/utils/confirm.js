const inquirer = require('inquirer')

module.exports = function (message, defaultChoice) {
    return inquirer.prompt([{
        name: 'yes',
        message,
        type: 'confirm',
        default: defaultChoice
    }]).then(anwser => {
        return anwser.yes
    })
}
