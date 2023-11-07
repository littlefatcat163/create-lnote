import si from 'systeminformation'
import ora from 'ora'
import chalk from 'chalk'
import inquirer from 'inquirer'
import _ from 'lodash'
// import yaml from 'js-yaml'
import yaml from 'yaml'
import fs from 'fs'
import path from 'path'
// import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createContext } from 'this-file'
import {getCache, setCache} from 'lnote-esm'

/* function testYaml() {
    const data = yaml.load(fs.readFileSync('_config.yml', 'utf-8'))
    let { lnote_licenses } = data
    if (_.isEmpty(lnote_licenses) || !_.isArray(lnote_licenses)) {
        lnote_licenses = []
    }
    data.lnote_licenses = [...lnote_licenses, 'xxxxx-xxxxx-xxxxx-xxxxx-xxxxx']
    fs.writeFileSync('_config.yml', yaml.dump(data))
} */

function testYaml() {
    // const data = yaml.parse(fs.readFileSync('test.yml', 'utf-8'))
    // console.log(data)
    // const url = new URL('.', import.meta.url)
    
    // console.log(import.meta.url)
    /* console.log(path.resolve('../'))
    console.log(process.cwd())
    console.log(createEsmUtils(import.meta).dirname) */
    const context = createContext()
    console.log(context.dirname)
    console.log(path.resolve(context.dirname, '../'))
    // console.log(esm())
    console.log(setCache('xxx'))
    console.log(getCache())
    // fs.writeFileSync(path.resolve('.cache/abc'), 'xxx1')
    /* let { lnote_licenses } = data
    if (_.isEmpty(lnote_licenses) || !_.isArray(lnote_licenses)) {
        lnote_licenses = []
    }
    data.lnote_licenses = [...lnote_licenses, 'xxxxx-xxxxx-xxxxx-xxxxx-xxxxx']
    fs.writeFileSync('_config.yml', yaml.stringify(data)) */
}

// platform distro serial
/* si.osInfo()
    .then(s => console.log('osinfo', s.serial))
    .catch(e => console.log(e)) */

// uuid sku
/* si.system()
    .then(s => console.log('system', s))
    .catch(e => console.log(e)) */

function start() {
    console.log(chalk.bgGreenBright('请稍后，正在验证中...'))
    const spinner = ora('Loading\n').start()
    console.log('sadfasdf')
    setTimeout(() => {
        spinner.color = 'yellow'
        spinner.text = 'Loading rainbows'
    }, 1000)

    setTimeout(() => {
        spinner.succeed()
        // spinner.fail('error')
        // console.log(chalk.bgRedBright('失败，请重新注册'))
    }, 2000)
}

function validateInput(input) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (_.isEmpty(input)) {
                reject('请输入内容')
                return
            }
            resolve(true)
        }, 1000)
        
    })
}

async function propmt() {
    const res = await inquirer.prompt([
        {
            type: 'list',
            name: 'theme',
            message: '请选择主题',
            choices: ['auto', 'light', 'dark']
        },
        {
            type: 'input',
            name: 'name',
            message: '请输入项目名称：',
            validate: validateInput
        }
    ])
    console.log(res)

}

// propmt()



// start()

testYaml()