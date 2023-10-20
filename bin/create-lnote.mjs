#!/usr/bin/env node

import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'


const log = console.log

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

log(chalk.green('hello lnote....'))

const args = process.argv.slice(2)
const [ appName ] = args

function validateAppName(appName) {
    if (!appName) {
        log(chalk.red('请输入新目录'))
        return false
    }
    if (fs.existsSync(appName)) {
        log(chalk.red(`${appName}已经存在，请重新输入!`))
        return false;
    }
    return true;
}

if (!validateAppName(appName)) {
    process.exit(1);
}

function create({name, version}) {
    fse.copySync(
        path.resolve(__dirname, '../template'),
        path.resolve(process.cwd(), `${appName}`)
    )
    const pkgPath = path.resolve(process.cwd(), `${appName}/package.json`)
    const pkgContent = fse.readFileSync(pkgPath, 'utf-8')
    const pkgJson = {
        ...JSON.parse(pkgContent),
        name,
        version
    }
    fse.writeFileSync(pkgPath, JSON.stringify(pkgJson,  null, 2))
    log(`${chalk.green(appName)} 创建成功!!!`)
}

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: '请输入项目名称：',
            default: appName
        },
        {
            type: 'input',
            name: 'version',
            message: '请输入版本号：',
            default: '0.1.0'
        }
    ])
    .then(answers => {
        create(answers)
    })