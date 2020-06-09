import io from 'socket.io-client'

import context from './context'

interface SEAuthenticatedMessage {
  clientId: string
  channelId: string
  project: string
  message: string
}

const createSocketConnection = (token: string): void => {
  const socket = io('wss://realtime.streamelements.com', {
    transports: ['websocket'],
  })

  socket.on('connect', () => {
    context.log.info('Connected. Authenticating...')

    socket.emit('authenticate', {
      method: 'jwt',
      token,
    })
  })

  socket.on('disconnected', () => {
    context.log.info('Disconnected')
  })

  socket.on('authenticated', (data: SEAuthenticatedMessage) => {
    context.log.info(`Authenticated with channel ${data.channelId}`)
  })

  // fired when a test event is sent/overlays are refreshed in the dashboard
  socket.on('event:test', (data: any) => {
    console.log(data)
  })

  // fired when a real alert is recieved
  socket.on('event', (data: any) => {
    console.log(data)
  })

  // fired when session data is updated, after other events have fired
  socket.on('event:update', (data: any) => {
    console.log(data)
  })

  // i mean who knows this is all undocumented
  socket.on('event:reset', (data: any) => {
    console.log(data)
  })
}

export default createSocketConnection
