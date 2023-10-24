#!/usr/bin/env node

import inquirer from 'inquirer'
import chalk from 'chalk'
import fse from 'fs-extra'
import path from 'path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateCreateQuestions, createAppWording } from './generate'

const log = console.log

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const args = process.argv.slice(2)
const [appName] = args

const wordings = createAppWording()

function validateAppName(appName: string) {
    if (!appName) {
        log(chalk.red(wordings[0]))
        return false
    }
    /* if (fse.existsSync(appName)) {
        log(chalk.red(`${appName}已经存在，请重新输入!`))
        return false;
    } */
    return true
}

if (!validateAppName(appName)) {
    process.exit(1)
}

type InputInfo = {
    name: string
    version: string
}

function create({ name, version }: InputInfo) {
    fse.copySync(
        path.resolve(__dirname, '../template'),
        path.resolve(process.cwd(), `${appName}`)
    )
    const pkgPath = path.resolve(process.cwd(), `${appName}/package.json`)
    const pkgContent = fse.readFileSync(pkgPath, 'utf-8')
    const pkgJson = {
        ...JSON.parse(pkgContent),
        name,
        version,
    }
    fse.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2))
    log(`${chalk.green(appName)} ${wordings[1]}`)
}

async function inputInfo() {
    const answers = await inquirer.prompt(generateCreateQuestions(appName))
    create(answers as InputInfo)
}

inputInfo()
