import { NodeCG } from './types'

import context from './context'
import createSocketConnection from './socket'

module.exports = (nodecg: NodeCG) => {
  context.nodecg = nodecg

  if (!context.config?.token) {
    throw new Error('Please set your StreamElements JWT token in cfg/nodecg-streamelements-alerts.json!')
  }

  createSocketConnection(context.config.token)
}
