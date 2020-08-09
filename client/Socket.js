import io from 'socket.io-client'
let socket

export const initiateSocket = (room) => {
  socket = io('/')
  console.log(`Connecting socket...`)
  if (socket && room) socket.emit('player_joined', room)
}
export const disconnectSocket = () => {
  console.log('Disconnecting socket...')
  if (socket) socket.disconnect()
}
export const subscribeToRoom = (cb) => {
  if (!socket) return true
  socket.on('player_joined', () => {
    return cb(null)
  })
}

export const scoreUpdated = (cb) => {
  if (!socket) return true
  socket.on('score_updated', (data) => {
    return cb(null, data)
  })
}

export const targetReached = (cb) => {
  if (!socket) return true
  socket.on('target_reached', () => {
    return cb(null)
  })
}
