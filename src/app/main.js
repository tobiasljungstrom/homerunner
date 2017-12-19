import './styles/main.css'

const GROUND_HEIGHT = 100
const ARROW_UP = 38
const JUMP_DURATION = 600
const JUMP_HEIGHT = 150

// Elements
let player = null

// State
let currentScore = 0
let latestJump = 0
let obstacles = []

const homerunner = function (baseElement) {
  const mainCanvas = document.createElement('div')
  mainCanvas.className = 'homerunner-main-canvas'
  baseElement.appendChild(mainCanvas)

  createGround(mainCanvas)
  createPlayer(mainCanvas)
  createCounter(mainCanvas)

  start()
}

function createGround (container) {
  const groundDiv = document.createElement('div')
  groundDiv.className = 'homerunner-ground'
  groundDiv.style.height = `${GROUND_HEIGHT}px`
  container.appendChild(groundDiv)
}

function createPlayer (container) {
  const playerDiv = document.createElement('div')
  playerDiv.className = 'homerunner-player'
  playerDiv.style.bottom = `${GROUND_HEIGHT}px`
  container.appendChild(playerDiv)
  player = playerDiv
}

function createCounter (container) {
  const counterDiv = document.createElement('div')
  counterDiv.className = 'homerunner-counter'
  counterDiv.innerHTML = '0'
  container.appendChild(counterDiv)
}

function start () {
  listenForInput()
  countScore()
  spawnObstacles()
  window.setInterval(mainLoop, 10)
}

function listenForInput () {
  window.addEventListener('keydown', (key) => {
    if (key.keyCode === ARROW_UP) {
      if (canJump()) {
        jump()
      }
    }
  })
}

function jump () {
  latestJump = +new Date()
  player.style.transitionTimingFunction = 'ease-out'
  player.style.transform = `translateY(-${JUMP_HEIGHT}px)`
  setTimeout(() => {
    player.style.transitionTimingFunction = 'ease-in'
    player.style.transform = 'translateY(0px)'
  }, JUMP_DURATION / 2)
}

function canJump () {
  const now = +new Date()
  return now - latestJump > JUMP_DURATION
}

function countScore () {
  window.setInterval(() => {
    currentScore++
    updateScore()
  }, 1000)
}

function updateScore () {
  document.querySelector('.homerunner-counter').innerHTML = currentScore
}

function spawnObstacles () {
  window.setInterval(spawnObstacle, 1000)
}

function spawnObstacle () {
  const obstacleDiv = document.createElement('div')
  obstacleDiv.className = 'homerunner-obstacle'
  document.querySelector('.homerunner-main-canvas').appendChild(obstacleDiv)
  obstacles.push([obstacleDiv, 0])
}

function mainLoop () {
  obstacles.forEach(obstacle => {
    const currentPos = obstacle[1]
    const newPos = currentPos + 4
    obstacle[0].style.right = `${newPos}px`
    obstacle[1] = newPos
  })

  obstacles.forEach(obstacle => {
    const element = obstacle[0]
    const offset = element.style.right.substr(0, element.style.right.length - 2)
    const windowWidth = document.querySelector('.homerunner-main-canvas').offsetWidth
    if (offset > windowWidth) {
      console.log(obstacles)
      element.parentElement.removeChild(element)
      obstacles.splice(obstacles.indexOf(obstacle), 1)
      console.log(obstacles)
    }
  })
}

export default homerunner
