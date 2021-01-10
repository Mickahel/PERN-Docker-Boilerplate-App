import config from "./src/configuration/config"

let app = {
  name: `WEBAPP - ${config.long}`,
  script: 'serve',
  env: {
    PM2_SERVE_PATH: 'build',
    PM2_SERVE_PORT: 5000,
    PM2_SERVE_SPA: 'true',
    PM2_SERVE_HOMEPAGE: './index.html'
  },
  watch: true,
  ignore_watch: ['node_modules'],
  restart_delay: 5000,
  autorestart: true,
  output: '/dev/null',
  error: '/dev/null',
  log: '/dev/null',
}

module.exports = app
