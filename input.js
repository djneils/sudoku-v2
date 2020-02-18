class Input {
  constructor() {
    this.active = false
    this.maxLife = 50
    this.value = 5
    this.x = -100
    this.y = -100
    this.row = 0
    this.col = 0
    this.life = 0
  }

  display() {


    if (this.active) {
      noStroke()
      let t = map(this.life, 0, this.maxLife, 10, 140)
      fill(0, 255, 255, t)

      square(this.x + midOffSet, this.y, cellWidth)

    }
    this.life--
    if (this.life < 0) {
      this.active = false
    }



  }

  mouseSelection() {
    // let r = floor(my / cellWidth)
    // let c = floor((mx - midOffSet) / cellWidth)
    // let v = currentSudoku.problem[r][c] == 0
    if (mouseIsPressed ) {
      fill(0, 255, 255)

      textAlign(CENTER, CENTER)
      let xOff = floor(mouseX - mx)
      this.value = floor(map(xOff, -100, 50, 1, 9))
      this.value = constrain(this.value, 1, 9)
      textSize(textScale * 2)
      text(this.value, this.x + midOffSet - (cellWidth * 0.1), this.y + (cellWidth / 2.3), cellWidth * 1.5)
      textSize(textScale)
    }
  }
  setValue(value) {

    answers[this.row][this.col] = value

  }



  lock(x, y) {

    let row = floor(y / cellWidth)
    let col = floor(x / cellWidth)
    if ((currentSudoku.problem[row][col] != 0)) return

    this.life = this.maxLife
    this.active = true




    this.row = row
    this.col = col
    this.x = this.col * cellWidth
    this.y = this.row * cellWidth


  }
}