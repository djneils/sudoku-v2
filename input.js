class Input {
  constructor() {
    this.active = false
    this.maxLife=50

    this.x = -100
    this.y = -100
    this.row = 0
    this.col = 0
    this.life = 0
  }

  display() {

    if (this.active) {
      noStroke()
      let t = map(this.life,0,this.maxLife,10,140)
      fill(0,255,255,t)

      square(this.x + midOffSet, this.y, cellWidth)
  
    }
    this.life--
    if (this.life < 0) {
      this.active = false
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
    this.value = 'ENTER \n NUMBER'
  


    this.row = row
    this.col = col
    this.x = this.col * cellWidth
    this.y = this.row * cellWidth
   

  }
}