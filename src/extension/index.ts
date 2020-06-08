import socket from './socket'

interface NodeCG {
  bundleConfig: BundleConfig
}

interface BundleConfig {
  token: string
}

module.exports = (nodecg: NodeCG) => {
  const config = nodecg.bundleConfig

  if (!config?.token) {
    throw new Error('Please set your StreamElements JWT token in cfg/nodecg-streamelements-alerts.json!')
  }

  socket(config.token)
}
