import './styles/main.css'

const GROUND_HEIGHT = 100
const ARROW_UP = 38

let player = null
let isJumping = false

const homerunner = function (baseElement) {
  const mainCanvas = document.createElement('div')
  mainCanvas.className = 'homerunner-main-canvas'
  baseElement.appendChild(mainCanvas)

  createGround(mainCanvas)
  createPlayer(mainCanvas)

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

function start () {
  listenForInput()
}

function listenForInput () {
  window.addEventListener('keyup', (key) => {
    if (key.keyCode === ARROW_UP) {
      if (!isJumping) {
        jump()
      }
    }
  })
}

function jump () {
  player.style.transform = 'translateY(-100px)'
  isJumping = true
  setTimeout(() => {
    player.style.transform = 'translateY(0px)'
    isJumping = false
  }, 250)
}

export default homerunner
