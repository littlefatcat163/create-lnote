import inquirer from 'inquirer'
import chalk from 'chalk'

async function register() {
    const res = await inquirer.prompt([
        {
            type: 'password',
            name: 'password',
            message: '请输入管理员授权码：',
            // validate: validateLicense,
        },
    ])
}