import si from 'systeminformation'
import ora from 'ora'
import chalk from 'chalk'
import inquirer from 'inquirer'
import _ from 'lodash'
import yaml from 'js-yaml'
import fs from 'fs'

function testYaml() {
    const data = yaml.load(fs.readFileSync('./template/_config.yml', 'utf-8'))
    const { lnote_licenses = [] } = data
    data.lnote_licenses = [...lnote_licenses, 'sadfasdf']
    fs.writeFileSync('my.yml', yaml.dump(data))
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