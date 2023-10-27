import inquirer from 'inquirer'
import ora from 'ora'
import clipboardy from 'clipboardy'
import path from 'path'
import yaml from 'yaml'
import fse from 'fs-extra'
import _ from 'lodash'

import { generateRegisterQuestions, licenseKey, createAppWording } from './generate'

async function register() {
    await inquirer.prompt(generateRegisterQuestions())
    const spinner = ora('registering\n').start()
    const lic = await licenseKey()
    spinner.info(lic)
    writeIn(lic)
    clipboardy.writeSync(lic)
    spinner.succeed('registered successfully')
}

function writeIn(lic: string) {
    try {
        const { confName, confEncode } = createAppWording()
        const generatePath = path.resolve(process.cwd())
        const configPath = `${generatePath}/${confName}`
        if (!fse.existsSync(configPath)) {
            return
        }
        const config: any = yaml.parse(fse.readFileSync(configPath, confEncode))
        let { lnote_licenses } = config
        if (_.isEmpty(lnote_licenses) || !_.isArray(lnote_licenses)) {
            lnote_licenses = []
        }
        if (_.some(lnote_licenses, (item) => item === lic)) {
            return
        } else {
            config.lnote_licenses = [...lnote_licenses, lic]
            fse.writeFileSync(configPath, yaml.stringify(config))
        }
    } catch (error) {
        
    }
}

register()
