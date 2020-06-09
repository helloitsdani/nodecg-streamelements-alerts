import { NodeCG } from './types'

interface BundleConfig {
  token?: string
}

let nodecgInstance: NodeCG

class StreamElementsAlertsContext {
  get nodecg() {
    return nodecgInstance
  }
  set nodecg(instance) {
    nodecgInstance = instance
  }

  get config() {
    return nodecgInstance.bundleConfig as BundleConfig
  }
  set config(_) {
    throw new Error('bundleConfig is read from cfg/nodecg-streamelements-alerts.json when NodeCG starts')
  }

  get log() {
    return nodecgInstance ? nodecgInstance.log : console
  }
  set log(_) {
    throw new Error('Logger is created by NodeCG and cannot be overwritten')
  }
}

const context = new StreamElementsAlertsContext()
export default context
