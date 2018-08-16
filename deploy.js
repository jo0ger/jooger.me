const path = require('path')
const scp = require('scp')
const child_process = require('child_process')
const axios = require('axios')

run()

async function run () {
    await build()
    await scpToServer()
    // await cdn()
    await pm2()
}

function build () {
    return exec('npm run build')
}

function scpToServer () {
    const opt = {
        file: path.join(__dirname, 'dist'),
        user: 'root',
        host: 'jooger.me',
        port: '22',
        path: '~/www/jooger.me/source'
    }
    return new Promise((resolve, reject) => {
        scp.send(opt, err => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                console.log('上传服务器完毕.')
                resolve()
            }
        })
    })
}

function cdn () {
    return axios.get('http://127.0.0.1:3000/aliyun/cdn').then(res => {
        if (res.code === 200) {
            return console.log('CDN上传成功');
        }
        console.error(res.message)
    })
}

function pm2 () {
    return exec('pm2 deploy ecosystem.config.js production')
}

function exec (cmd, options = {}) {
    return new Promise((resolve, reject) => {
        child_process.exec(cmd, Object.assign({
            maxBuffer: 1000 * 1024
        }, options), (err, stdout) => {
            console.log(stdout)
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve()
            }
        })
    })
}
