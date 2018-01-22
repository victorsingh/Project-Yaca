module.exports = {
  webpack: (config, { buildId, dev }) => {
    console.log(config, '---------')
    // Perform customizations to webpack config
    const x = { 'target': 'web',
      'node': {
        // eslint-disable-next-line camelcase
        'child_process': "empty",
        'dgram': "empty",
        'fs': "empty",
        'net': "empty",
        'tls': "empty"
      }
    }
    console.log(x)
    config.target = 'web'
    config.node = {
      // eslint-disable-next-line camelcase
      'child_process': "empty",
      'dgram': "empty",
      'fs': "empty",
      'net': "empty",
      'tls': "empty"
    }
    // Important: return the modified config
    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config

    // Important: return the modified config
    return config
  }
}
