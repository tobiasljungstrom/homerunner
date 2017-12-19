import './styles/main.css'
import playerImage from './svg/player.svg'

const GROUND_HEIGHT = 100
const ARROW_UP = 38
const JUMP_DURATION = 600
const JUMP_HEIGHT = 150

// Elements
let player = null

// State
let gameIsRunning = true
let currentScore = 0
let latestJump = 0
let obstacles = []
let bgObjects = []

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
  playerDiv.style.transitionDuration = `${JUMP_DURATION / 2}ms`
  container.appendChild(playerDiv)
  player = playerDiv

  const playerGfx = document.createElement('div')
  playerGfx.className = 'homerunner-player-gfx'
  playerGfx.innerHTML = playerImage
  playerGfx.style.bottom = `${GROUND_HEIGHT}px`
  player.appendChild(playerGfx)
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
  spawnBackground()
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

function spawnBackground () {
  window.setInterval(spawnBgObject, 1000)
}

function spawnObstacle () {
  const obstacleDiv = document.createElement('div')
  obstacleDiv.className = 'homerunner-obstacle'
  document.querySelector('.homerunner-main-canvas').appendChild(obstacleDiv)
  obstacles.push([obstacleDiv, -100])
}

function spawnBgObject () {
  const bgDiv = document.createElement('div')
  bgDiv.className = 'homerunner-bg'
  document.querySelector('.homerunner-main-canvas').appendChild(bgDiv)
  bgObjects.push([bgDiv, -100])
}

function mainLoop () {
  obstacles.forEach(obstacle => {
    const currentPos = obstacle[1]
    const newPos = currentPos + 5
    obstacle[0].style.right = `${newPos}px`
    obstacle[1] = newPos
  })

  bgObjects.forEach(bg => {
    const currentPos = bg[1]
    const newPos = currentPos + 4
    bg[0].style.right = `${newPos}px`
    bg[1] = newPos
  })

  obstacles.forEach(obstacle => {
    const element = obstacle[0]
    const offset = element.style.right.substr(0, element.style.right.length - 2)
    const windowWidth = document.querySelector('.homerunner-main-canvas').offsetWidth
    if (offset > windowWidth) {
      element.parentElement.removeChild(element)
      obstacles.splice(obstacles.indexOf(obstacle), 1)
    }
  })

  bgObjects.forEach(bg => {
    const element = bg[0]
    const offset = element.style.right.substr(0, element.style.right.length - 2)
    const windowWidth = document.querySelector('.homerunner-main-canvas').offsetWidth
    if (offset > windowWidth) {
      element.parentElement.removeChild(element)
      bgObjects.splice(bgObjects.indexOf(bg), 1)
    }
  })

  obstacles.forEach(obstacle => {
    const element = obstacle[0]
    if (collides(element, player)) {
      element.style.backgroundColor = 'red'
    } else if (element.style.backgroundColor !== 'purple') {
      element.style.backgroundColor = 'purple'
    }
  })
}

function collides (el1, el2) {
  const rect1 = el1.getBoundingClientRect()
  const rect2 = el2.getBoundingClientRect()

  return !(
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right
  )
}

export default homerunner
