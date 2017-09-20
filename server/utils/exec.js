/**
 * @desc 利用Node原生异步子进程执行命令
 * @author Jooger <zzy1198258955@163.com>
 * @date 20 Sep 2017
 */

const { exec } = require('child_process')

export default (cmd, opts) => {
  return new Promise((resolve, reject) => {
    if (!cmd) {
      return reject(new Error('command is required'))
    }
    exec(cmd, opts, (err, stdout, stderr) => {
      if (err) {
        return reject(err)
      }
      console.log(stdout, stderr)
      resolve(stdout, stderr)
    })
  })
}
