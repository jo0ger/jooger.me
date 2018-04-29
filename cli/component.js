/**
 * @desc generate component
 * @author Jooger <iamjooger@gmail.com>
 * @since 25 Apr 2018
 */

const path = require('path')
const glob = require('glob')
const fs = require('fs-extra')
const chalk = require('chalk')
const cmd = require('commander')
const { camelize } = require('./lib/utils')
const getGitUser = require('./lib/git-user') 

function resolve (...args) {
  return path.resolve(__dirname, '..', ...args)
}

function getReplaceRE (keyword) {
  return new RegExp(`\\{\\{\\s+${keyword}\\s+\\}\\}`, 'g')
}

cmd
  .version(require('../package').version)
  .usage('yarn component [component name]')
  .option('-p, --path <path>', '路径')
  .parse(process.argv)

cmd.on('--help', function () {
  console.log('\n  示例:')
  console.log()
  console.log(chalk.gray('    # 创建一个新的名称为my-business的Business'))
  console.log('    $ packer new my-business')
})

run()

function run () {
  if (cmd.args.length < 1) return cmd.help()
  const componentName = cmd.args[0]
  // 默认在common目录里
  const componentPath = resolve('client', cmd.path || 'components/common')
  const templatePath = resolve('cli/template/component/*')
  const templates = glob.sync(templatePath)
  templates.forEach(t => {
    const data = gen(t, componentName, componentPath)
    copy(t, data, componentName, componentPath)
  })

  // padding
  console.log()
}

function gen (file, componentName, componentPath) {
  const camelName = camelize(componentName)
  const data = fs.readFileSync(file, 'utf8')
  const date = new Date()
  return data.replace(getReplaceRE('name'), componentName)
    .replace(getReplaceRE('camelName'), camelName)
    .replace(getReplaceRE('author'), getGitUser())
    .replace(getReplaceRE('date'), [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'))
}

function copy (template, data, componentName, componentPath) {
  const camelName = camelize(componentName)
  const frag = template.split(path.sep)
  const name = frag[frag.length - 1]
    .replace(/component/, componentName)
    .replace(/\.template/, '')
  fs.outputFileSync(path.join(componentPath, camelName, name), data)
}
