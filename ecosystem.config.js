/**
 * @desc PM2 deploy
 * @author Jooger <zzy1198258955@163.com>
 * @date 19 Sep 2017
 */

const packageConfig = require('./package.json')

module.exports = {
  apps: [
    {
      name: packageConfig.name,
      script: 'build/main.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
        // log: true
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'root',
      host: 'jooger.me',
      ref: 'origin/master',
      repo: packageConfig.repository.url,
      path: '/root/www/' + packageConfig.name,
      'post-deploy': 'cnpm install && pm2 stop all && cnpm run build && pm2 reload ecosystem.config.js --env production && pm2 start all'
    }
  }
}
