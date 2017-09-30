/**
 * @desc PM2 deploy
 * @author Jooger <zzy1198258955@163.com>
 * @date 19 Sep 2017
 */

const packageInfo = require('./package.json')

module.exports = {
  apps: [
    {
      name: packageInfo.name,
      script: 'build/main.js',
      env: {
        NODE_ENV: 'production'
      },
      env_production: {
        NODE_ENV: 'production'
        // log: true
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      out_file: './logs/pm2-out.log',
      error_file: './logs/pm2-error.log',
      pid_file: './logs/jooger.me.pid'
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: 'jooger.me',
      ref: 'origin/master',
      repo: packageInfo.repository.url,
      path: '/root/www/' + packageInfo.name,
      'post-deploy': 'git pull && cnpm install && pm2 stop all && npm run build && pm2 startOrReload ecosystem.config.js && pm2 start all'
    }
  }
}
