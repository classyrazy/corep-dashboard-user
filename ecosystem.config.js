module.exports = {
    apps: [
      {
        name: 'HomePage',
        exec_mode: 'cluster',
        instances: 'max',
        script: '.output/server/index.mjs',
        env: {
          NUXT_PORT: 9030,
          port: 9030
        }
      }
    ]
  }
  