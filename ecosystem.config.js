module.exports = {
  apps: [{
    name: 'Blog',
    script: './node_modules/react-scripts/scripts/start.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-188-204-67.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/blog.pem',
      ref: 'origin/master',
      repo: 'git@github.com:Dchang10/Blog.git',
      path: '/home/ubuntu/Blog',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
