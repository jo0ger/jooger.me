const os = require('os')
const path = require('path')
const fs = require('fs-extra')
const colors = require('colors')
const inquirer = require('inquirer')
const utils = require('../utils')

const baseDir = path.resolve(__dirname, '../../src')
const tplPath = path.resolve(__dirname, './template')

const create = async () => {
    let {
        componentName,
        componentPath,
        yes
    } = await inquirer.prompt([{
            name: 'componentName',
            message: '请输入组件名:',
            type: 'input',
            default: 'VueComponent'
        },
        {
            name: 'componentPath',
            message: '请输入组件路径（基于src目录）:',
            type: 'input',
            default: 'components'
        },
        {
            name: 'yes',
            message: '确认创建 ?',
            type: 'confirm'
        }
    ])

    if (yes) {
        // 确认创建
        componentPath = path.join(baseDir, componentPath)
        componentName = utils.capitalize(componentName)
        const component = path.join(componentPath, componentName)
        
        const pass = await judge(componentPath, componentName)

        if (!pass) return

        fs.readdir(tplPath, 'utf8', (err, files) => {
            if (err) {
                console.log(colors.red(err))
                return false
            }

            const author = utils.getGitUser() || os.userInfo({ encoding: 'utf8' })
            const date = utils.getDate()
    
            files.forEach((filename) => {
                let content = compile(path.join(tplPath, filename), {
                    author,
                    date,
                    componentName,
                    hyphenateComponentName: utils.hyphenate(componentName)
                })
                const distFileName = `index.${filename.split('.')[1]}`
                const filePath = path.join(component, distFileName)
                console.log(colors.green(' => '), colors.underline(filePath))
                fs.writeFileSync(filePath, content, 'utf8')
            })
    
            console.log(colors.green(`组件 ${componentName} 生成成功`))
        })
    }
}

function judge (componentPath, componentName) {
    const component = path.join(componentPath, componentName)
    return new Promise(resolve => {
        if (fs.existsSync(component)) {
            utils.confirm(`组件 ${componentName} 已存在. 需要覆盖吗？`, false).then(resolve)
        } else {
            fs.mkdirpSync(component)
            resolve(true)
        }
    })
}

function compile (file, data) {
    const conent = fs.readFileSync(file, 'utf8')
    return conent.replace(/\${(\w+)}/gi, function (match, name) {
        return data[name] ? data[name] : ''
    })
}

module.exports = () => {
    
    create().catch(async err => {
        console.error(err)
        process.exit(1)
    })
}