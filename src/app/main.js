import './styles/main.css'

const GROUND_HEIGHT = 100

const homerunner = function (baseElement) {
  const mainCanvas = document.createElement('div')
  mainCanvas.className = 'homerunner-main-canvas'
  baseElement.appendChild(mainCanvas)

  createGround(mainCanvas)
  createPlayer(mainCanvas)
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
}

export default homerunner
