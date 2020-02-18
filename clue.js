class Clue {
  constructor(x, y, s) {

    this.col = floor(x / cellWidth)
    this.row = floor(y / cellWidth)
    this.x = (cellWidth / 2) + this.col * cellWidth + midOffSet
    this.y = (cellWidth / 2) + this.row * cellWidth
    this.value = currentSudoku.solution[this.row][this.col]
    this.life = 160
    this.a = 0
  }

  display() {
    let offset = map(sin(this.a), -1, 1, -20, 20)
    fill(129, 14, 138, this.life)
    stroke(129, 14, 138, this.life)
    textSize(textScale / 2)
    text(this.value, this.x + offset, this.y)
    this.life -= 2
    this.y -= 2


    if (this.life < 0) {
      clues.splice(clues.indexOf(this), 1)
    }
    this.a += 0.1
  }


}