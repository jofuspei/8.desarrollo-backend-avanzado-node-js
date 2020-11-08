module.exports = {
  apps : [
    {
      name:'nodepop',
      script: './bin/www',
      env_production: {
        NODE_ENV: 'production'
      },
    },
    {
      name:'tuhmbnailGenerator',
      script: 'lib/thumbnailResponder.js',
      watch: 'lib/thumbnaillResponder.js',
      log_file: 'logs/service.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    }
  ],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
