import inquirer from 'inquirer'
import ora from 'ora'
import { generateRegisterQuestions, licenseKey } from './generate'

async function register() {
    await inquirer.prompt(generateRegisterQuestions())
    const spinner = ora('registering\n').start()
    const lic = await licenseKey()
    console.log(lic)
    spinner.succeed('registered successfully')
}

register()
