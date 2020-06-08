import io from 'socket.io-client'

export default (token: string): void => {
  const socket = io('https://realtime.streamelements.com', {
    transports: ['websocket'],
  })

  socket.on('connect', () => {
    console.log('Successfully connected to the websocket')
    socket.emit('authenticate', {
      method: 'jwt',
      token,
    })
  })

  // Socket got disconnected
  socket.on('disconnect', () => {
    console.log('Disconnected from websocket')
    // Reconnect
  })

  // Socket is authenticated
  socket.on('authenticated', (data: any) => {
    const { channelId } = data

    console.log(`Successfully connected to channel ${channelId as string}`)
  })

  socket.on('event:test', (data: any) => {
    console.log(data)
    // Structure as on JSON Schema
  })

  socket.on('event', (data: any) => {
    console.log(data)
    // Structure as on JSON Schema
  })

  socket.on('event:update', (data: any) => {
    console.log(data)
    // Structure as on https://github.com/StreamElements/widgets/blob/master/CustomCode.md#on-session-update
  })

  socket.on('event:reset', (data: any) => {
    console.log(data)
    // Structure as on https://github.com/StreamElements/widgets/blob/master/CustomCode.md#on-session-update
  })
}
