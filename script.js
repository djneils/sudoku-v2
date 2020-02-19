
let arrays = []
let boardWidth, cellWidth, c
let midOffSet = 0
let currentSudoku = null
let answers
let inp
let textScale
let clues = []
let showSolution = false
let wrongPositions = []
let f
let screen = 0
let message
let mx, my
let grid = []
let startGrid = []
let saveMode = true
let pause = false
let boxWidth = 0
let boxHeight = 0
let boxNum = 0
let showLogo = true
let logo
let record = false


function preload() {
  f = loadFont('f.ttf')
  logo = loadImage('logo.png')
}

function mouseReleased() {
  let r = floor(mouseY / cellWidth)
  let c = floor((mouseX - midOffSet) / cellWidth)
  // if(inp.row == r && inp.col==c){

  // }
  if (inp.life < 30 && screen == 1) {
    inp.setValue(inp.value)
    inp.active = true
    inp.life = 25
  }
}

function setup() {
  c = createCanvas(windowHeight, windowWidth)
  

  boardWidth = min(width, height)
  cellWidth = boardWidth / 9


  textFont(f)
  textAlign(CENTER, CENTER)
  windowResized()
  inp = new Input()
  textScale = map(width, 250, 1200, 10, 65)
  message = 'CREATE NEW GAME \n 1 Easy - 5 Hard \n 0 for blank'
  boxWidth = map(width, 250, 1200, 110, 600)
  boxHeight = map(height, 250, 1200, 110, 600)
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

  if (screen == 0 && (keyCode >= 48 && keyCode <= 53)) {
    if (keyCode == 48) {
      currentSudoku = {
        problem: [],
        solution: []
      }

      currentSudoku.solution = copySudoku(empty)
      currentSudoku.problem = copySudoku(empty)
      answers = copySudoku(empty)
      screen = 1

      return
    }
    currentSudoku = generateSudoku(keyCode - 48)
    answers = copySudoku(empty)
    //saveJSON(currentSudoku,'save.json')
    screen = 1
    return
  }
  if (currentSudoku == null) return
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
  if (key == 'D' || key == 'd') {
    if (currentSudoku == null) return
    screen = 3

    // let t1 = copySudoku(currentSudoku.problem)
    // merge(answers, t1)
    record = false
    //console.log(answers)
    //console.log('xxx',solveSudoku(t1))
    // if(!solveSudoku(t1)){
    //   alert('unsolvable')
    //   screen=1
    //   return
    // }

    grid = copySudoku(currentSudoku.problem)
    merge(answers, grid)
    startGrid = copySudoku(currentSudoku.problem)
    merge(answers, startGrid)
    arrays = []


    record = true
    if(!allEntriesValid(grid)){
      alert('not valid')
    }else{
      solveSudoku(grid)
    }
    //solveSudoku(grid)
    record=false

    //console.log(arrays)
    return
  }
  if (screen != 3 && (key == 'C' || key == 'c')) {
    clues.push(new Clue(mouseX - midOffSet, mouseY))
    return
  }

  if (key == 'M' || key == 'm') {
    arrays = []///////////
    screen = (screen + 1) % 2
    message = 'CREATE NEW GAME \n 1 Easy - 5 Hard \n 0 for blank'
    boxWidth = map(width, 250, 1200, 110, 600)
    boxHeight = map(height, 250, 1200, 110, 600)
    boxNum = 0
    return
  }

  if (key == 'K' || key == 'k') {
    if (currentSudoku == null) return
    arrays = []///////////
    screen = (screen + 1) % 2
    message = 'c - clue \n s - see solution \n z - count mistakes \n x - check answers \n = - see if solved \n p - take picture \n d - backtracking demo mode \n m - menu \n k - key menu'
    boxWidth = map(width, 250, 1200, 110, 800)
    boxHeight = map(height, 250, 1000, 210, 1000)
    boxNum = 1
    return
  }

  if (screen != 3 && (key == 'S' || key == 's')) {
    if (currentSudoku == null) return
    showSolution = true
  }
  if (screen != 3 && (key == 'P' || key == 'p')) {
    if (currentSudoku == null) return
    saveCanvas(c, 'sudoku.png')
  }
  if (screen == 3 && (key == 'P' || key == 'p')) {
    if (pause) {
      noLoop()
    } else {
      loop()
    }
    pause = !pause
  }
  if (screen != 3 && (key == 'X' || key == 'x')) {
    checkForDifferences(answers, currentSudoku.solution)
  }

  if (screen != 3 && (key == 'Z' || key == 'z')) {
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
  if (boxNum == 0) {
    boxWidth = map(width, 250, 1200, 110, 600)
    boxHeight = map(height, 250, 1200, 110, 600)
  } else {
    boxWidth = map(width, 250, 1200, 110, 800)
    boxHeight = map(height, 250, 1000, 210, 1000)
  }
}


function draw() {
  if (screen == 0) {
    background(140)

    frameRate(60)

    drawGrid(midOffSet, 25)

    textScale = map(width, 250, 1000, 10, 45)
    textSize(textScale)
    rectMode(CENTER)
    fill(50, 227, 224, 120)
    stroke(0)
    strokeWeight(3)
    rect(midOffSet + boardWidth / 2, boardWidth / 2, boxWidth, boxHeight)
    rectMode(CORNER)
    strokeWeight(1)
    fill(0)
    text(message, width / 2, height / 2)
    imageMode(CENTER)
    if (showLogo) {
      image(logo, midOffSet + boardWidth / 2, height / 6, boardWidth * 0.7, boardWidth * 0.3)

    }
  }
  if (screen == 1) {
    showLogo = false
    frameRate(60)
     textScale = map(width, 250, 1100, 10, 55)
    background(140)
    inp.display()
    drawGrid(midOffSet, 255)
    inp.mouseSelection()
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
      stroke(212, 32, 74)
      strokeWeight(3)
      square(pos.c * cellWidth + midOffSet, pos.r * cellWidth, cellWidth)
    }
  }
  if (screen == 3) {
    frameRate(map(mouseX, 0, width, 1, 60))
    textScale = map(width, 250, 1200, 10, 65)
    background(140)
    drawGridDemo(midOffSet, 255)
    if (arrays.length > 0) {
      if (arrays.length == 1) {
        currentSudoku.problem = arrays.shift()
        currentSudoku.solution = solveSudoku(currentSudoku.problem)
        grid = currentSudoku.problem
        arraus=[]
      } else {
        grid = arrays.shift()
      }

      //var newGrid =arrays.shift()
      //grid = merge(grid,newGrid)
      //console.log(current)
      // merge(current,grid)

    }
  }
}

function mousePressed() {
  mx = mouseX
  my = mouseY
  if (screen == 1) {
    inp.lock(mouseX - midOffSet, mouseY)
  }

}


function drawGridDemo(xOffSet, t) {
  if (grid.length == 0) return

  fill(217, 35, 196, 50)
  rect(midOffSet, 0, boardWidth, boardWidth)
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
    if (grid) {
      for (let col = 0; col < 9; col++) {

        fill(0)
        strokeWeight(1)
        if (grid[row][col] != 0) {
          textSize(textScale)
          if (startGrid[row][col] != 0) {
            fill(19, 162, 209)
            //fill(255,0,0)
          } else {
            fill(0)
          }

          text(grid[row][col], xOffSet + (cellWidth / 2) + (col * cellWidth), (cellWidth / 2) + (row * cellWidth))
        }


      }
    }
  }


}




function drawGrid(xOffSet, t) {
  fill(36, 171, 169, 50)
  rect(midOffSet, 0, boardWidth, boardWidth)
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
          // fill(0, 0, 255, t)
          fill(19, 162, 209, t)
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


