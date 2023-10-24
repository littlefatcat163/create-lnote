import inquirer from 'inquirer'
import chalk from 'chalk'
import { generateRegisterQuestions } from './generate'

async function register() {
    const res = await inquirer.prompt(generateRegisterQuestions())
}