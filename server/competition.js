const competition = exports

const socketio = require('socket.io')
const utils = require('./utils')

let io
let target
let currentCount

competition.generateNewTarget = () => {
  console.log('Generating new target')
  target = utils.generateNumber(5, 4)
  currentCount = 0
  console.log('Target: ', target)
}

/**
 * Connection listener called when server starts
 */
competition.setServer = (server) => {
  io = socketio(server)

  io.on('connection', (socket) => {
    competition.handleJoin(socket)
  })

  competition.generateNewTarget()
}

competition.handleJoin = (socket) => {
  console.log('Player joined', socket.id)
  io.to('playing').emit('player_joined')
  socket.join('playing')

  competition.sendScoreUpdate(socket)
  competition.addListeners(socket)
}

competition.addListeners = (socket) => {}

competition.incrementCorrectAnswers = () => {
  currentCount = currentCount + 1
  console.log('Correct answer submitted')

  if (currentCount >= target) {
    competition.handleTargetReached()
  }

  competition.sendScoreUpdate(io.to('playing'))
}

competition.handleTargetReached = () => {
  console.log('Target reached!')
  io.to('playing').emit('target_reached')
  competition.generateNewTarget()
  competition.sendScoreUpdate(io.to('playing'))
}

competition.sendScoreUpdate = (ioObject) => {
  console.log('Updating players')
  ioObject.emit('score_updated', {
    target: target,
    currentCount: currentCount,
  })
}
