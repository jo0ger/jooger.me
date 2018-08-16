/**
 * @desc PM2 deploy
 * @author Jooger <iamjooger@gmail.com>
 * @date 20 Dec 2017
 */

'use strict'

const packageInfo = require('./package.json')

module.exports = {
  apps: [
    {
      name: packageInfo.name,
      script: 'build/main.js',
      env: {
        NODE_ENV: 'development'
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
      'post-deploy': 'git pull && yarn && pm2 startOrReload ecosystem.config.js --env production'
    }
  }
}
