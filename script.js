let boardWidth, cellWidth, c
let midOffSet = 0
let currentSudoku=null
let answers
let inp
let textScale
let clues = []
let showSolution = false
let wrongPositions = []
let f
let screen = 0
let message
function preload() {
  f = loadFont('f.ttf')
}

function setup() {
  c = createCanvas(windowHeight, windowWidth)
  createSlider(0, 100, 2)
  //console.log(width, height)
  boardWidth = min(width, height)
  cellWidth = boardWidth / 9
 

  textFont(f)
  textAlign(CENTER, CENTER)
  windowResized()
  inp = new Input()
  textScale = map(width, 250, 1200, 10, 75)
  message = 'CREATE NEW GAME \n 1 Easy - 5 Hard'
}

function keyReleased() {
  if (key == 'S' || key == 's') {
    showSolution = false
  }
  if (key == 'X' || key == 'x') {
    wrongPositions = []
  }
}
function keyPressed() {
  //console.log(screen, keyCode)
  if (screen == 0 && (keyCode >= 49 && keyCode <= 53)) {

    currentSudoku = generateSudoku(keyCode - 48)
    answers = copySudoku(empty)
    screen = 1
    return
  }

  if ((keyCode >= 49 && keyCode <= 57) || keyCode == 27) {
    if (keyCode == 27) {
      inp.setValue(0)

    } else {
      inp.setValue(keyCode - 48)
    }

  }
  if (keyCode == 187) {
    if (areEqual(answers, currentSudoku.problem, currentSudoku.solution)) {
      screen = (screen + 1) % 2
      message = 'WELL DONE \n ALL COMPLETED'
    } else {
      screen = (screen + 1) % 2
      message = 'NOT THERE YET'
    }
  }

  if (key == 'C' || key == 'c') {
    clues.push(new Clue(mouseX - midOffSet, mouseY))
    return
  }

  if (key == 'M' || key == 'm') {
    screen = (screen + 1) % 2
    message = 'CREATE NEW GAME \n 1 Easy - 5 Hard'
  }

  if (key == 'K' || key == 'k') {
    screen = (screen + 1) % 2
    message = 'c for a clue \n s to see solution \n z to count mistakes \n x to check answers \n = to see if solved \p = to take picture'
  }

  if (key == 'S' || key == 's') {
    showSolution = true
  }
  if (key == 'P' || key == 'p') {
    saveCanvas(c, 'sudoku.png')
  }
  if (key == 'X' || key == 'x') {
    checkForDifferences(answers, currentSudoku.solution)
  }

  if (key == 'Z' || key == 'z') {
    checkForDifferences(answers, currentSudoku.solution)
    screen = (screen + 1) % 2
    let errors = wrongPositions.length
    if (errors == 0) {
      message = 'You have made No Errors'
    } else if (errors > 1) {
      message = 'You have made \n' + errors + ' errors'
    } else {
      message = 'You have made \n' + errors + ' error'
    }
    wrongPositions = []
  }

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  boardWidth = min(height, width)
  cellWidth = boardWidth / 9
  if (width - 50 > boardWidth) {
    midOffSet = (width - boardWidth) / 2
  }
  textScale = map(width, 250, 1200, 10, 65)
}


function draw() {
  if (screen == 0) {
    background(140)
    
    drawGrid(midOffSet, 25)
    fill(0)
    textScale = map(width, 250, 1200, 10, 75)
    textSize(textScale)

    text(message, width / 2, height / 2)

  }
  if (screen == 1) {
    textScale = map(width, 250, 1200, 10, 75)
    background(140)
    inp.display()
    drawGrid(midOffSet, 255)

    cellWidth = boardWidth / 9
    if (width - 50 > boardWidth) {
      midOffSet = (width - boardWidth) / 2
    }

    textSize(20)

    for (let clue of clues) {
      clue.display()
    }
    for (let pos of wrongPositions) {
      noFill()
      stroke(255, 0, 0)
      strokeWeight(3)
      square(pos.c * cellWidth + midOffSet, pos.r * cellWidth, cellWidth)
    }
  }
}

function mousePressed() {
  if (screen == 1) {
    inp.lock(mouseX - midOffSet, mouseY)
  }

}



function drawGrid(xOffSet, t) {

  strokeWeight(4)
  stroke(0, t)
  line(xOffSet, 0, boardWidth + xOffSet, 0)
  line(xOffSet, 0, xOffSet, boardWidth)
  line(boardWidth + xOffSet, 0, boardWidth + xOffSet, boardWidth)
  line(xOffSet, boardWidth, boardWidth + xOffSet, boardWidth)
  for (let row = 0; row < 9; row++) {
    if (row % 3 == 0 && row != 0) {
      strokeWeight(textScale / 8)
    } else {
      strokeWeight(1)
    }
    if (row != 0) {
      line(xOffSet, row * cellWidth, boardWidth + xOffSet, row * cellWidth)
      line(row * cellWidth + xOffSet, 0, row * cellWidth + xOffSet, boardWidth)
    }
    if (currentSudoku) {
      for (let col = 0; col < 9; col++) {

        fill(0, t)
        strokeWeight(1)
        if (currentSudoku.problem[row][col] != 0) {

          textSize(textScale)
          text(currentSudoku.problem[row][col], xOffSet + (cellWidth / 2) + (col * cellWidth), (cellWidth / 2) + (row * cellWidth))
        }
        if (answers[row][col] != 0) {
          textSize(textScale)
          fill(0, 0, 255, t)
          text(answers[row][col], xOffSet + (cellWidth / 2) + (col * cellWidth), (cellWidth / 2) + (row * cellWidth))
        }
        if (showSolution && currentSudoku.problem[row][col] == 0) {
          fill(0, 33)

          textSize(textScale)
          text(currentSudoku.solution[row][col], xOffSet + (cellWidth / 2) + (col * cellWidth), (cellWidth / 2) + (row * cellWidth))
        }

      }
    }
  }


}


