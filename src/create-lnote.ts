import inquirer from 'inquirer'
import chalk from 'chalk'
import yaml from 'yaml'
import fse from 'fs-extra'
import path from 'path'
import { generateCreateQuestions, createAppWording } from './generate'
import esm from 'lnote-esm'

const log = console.log

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
    const { templatePath } = esm()
    fse.copySync(templatePath, generatePath)
    const pkgPath = path.resolve(
        process.cwd(),
        `${appName}/${wordings.pkgName}`
    )
    const pkgContent = fse.readFileSync(pkgPath, wordings.confEncode)
    const pkgJson = {
        ...JSON.parse(pkgContent),
        name,
        version,
    }
    fse.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2))

    const configPath = `${generatePath}/${wordings.confName}`
    const config: any = yaml.parse(
        fse.readFileSync(configPath, wordings.confEncode)
    )
    config.url = `${wordings.confUrl}/${name}`
    config.lnote_licenses = [lic]
    fse.writeFileSync(configPath, yaml.stringify(config))

    const themeConfigPath = `${generatePath}/${wordings.themeConfName}`
    const themeConfig: any = yaml.parse(
        fse.readFileSync(themeConfigPath, wordings.confEncode)
    )
    themeConfig.dark_mode = theme
    fse.writeFileSync(themeConfigPath, yaml.stringify(themeConfig))

    log(`${chalk.green(appName)} ${wordings.done}`)
}

async function inputInfo() {
    const answers = await inquirer.prompt(generateCreateQuestions(appName))
    create(answers as InputInfo)
}

inputInfo()
