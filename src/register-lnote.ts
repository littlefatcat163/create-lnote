import inquirer from 'inquirer'
import ora from 'ora'
import clipboardy from 'clipboardy'
import { generateRegisterQuestions, licenseKey } from './generate'

async function register() {
    await inquirer.prompt(generateRegisterQuestions())
    const spinner = ora('registering\n').start()
    const lic = await licenseKey()
    console.log(lic)
    clipboardy.writeSync(lic)
    spinner.succeed('registered successfully')
}

register()
