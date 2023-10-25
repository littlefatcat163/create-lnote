#!/usr/bin/env node

import inquirer from 'inquirer'
import chalk from 'chalk'
import yaml from 'js-yaml'
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
        log(chalk.red(wordings.appNameEmpty))
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
    lic: string
    name: string
    version: string
    theme: string
}

function create({ lic, name, version, theme }: InputInfo) {
    const generatePath = path.resolve(process.cwd(), `${appName}`)
    fse.copySync(
        path.resolve(__dirname, '../template'),
        generatePath
    )
    const pkgPath = path.resolve(process.cwd(), `${appName}/package.json`)
    const pkgContent = fse.readFileSync(pkgPath, 'utf-8')
    const pkgJson = {
        ...JSON.parse(pkgContent),
        name,
        version,
    }
    fse.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2))

    const configPath = `${generatePath}/${wordings.confName}`
    const config: any = yaml.load(fse.readFileSync(configPath, 'utf-8'))
    config.url = `${wordings.confUrl}/${name}`
    config.lnote_license = lic
    fse.writeFileSync(configPath, yaml.dump(config))

    const themeConfigPath = `${generatePath}/${wordings.themeConfName}`
    const themeConfig: any = yaml.load(fse.readFileSync(themeConfigPath, 'utf-8'))
    themeConfig.dark_mode.default = theme
    fse.writeFileSync(themeConfigPath, yaml.dump(themeConfig))

    log(`${chalk.green(appName)} ${wordings.done}`)
}

async function inputInfo() {
    const answers = await inquirer.prompt(generateCreateQuestions(appName))
    create(answers as InputInfo)
}

inputInfo()
