#!/usr/bin/env node

const program = require('commander')
const generateComponent = require('./component/generate.js')

program
    .version('0.0.1', '-v, --Version')

program
    .command('new [组件名]')
    .alias('n')
    .description('新建组件')
    .action(() => {
        generateComponent()
    })

program.parse(process.argv)
