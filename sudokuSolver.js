
function solveSudoku(arr) {
  let solved = copySudoku(arr)
  if (solve(solved)) return solved
  return false

}
function solveDemoSudoku(arr) {
  let solved = copySudoku(arr)
  if (solve(solved)) return solved
  return false

}

function areEqual(ans, cur, sol) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (ans[r][c] != 0) {
        cur[r][c] = ans[r][c]
      }
    }
  }

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (cur[r][c] != sol[r][c]) {
        return false
      }
    }
  }
  return true
}

function checkForDifferences(ans, sol) {
  wrongPositions = []
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (ans[r][c] != 0 && (ans[r][c] != sol[r][c])) {
        wrongPositions.push({ r, c })
      }
    }
  }

}
function generateOriginalSudoku() {


  let empty = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  let solution = solveSudoku(empty)
  let problem = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]


  return {
    problem: problem,
    solution: solution
  }
}

function generateSudoku(difficulty) {
  let d = map(difficulty, 1, 5, 30, 150)

  let empty = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  let solution = solveSudoku(empty)
  let problem = copySudoku(solution)

  for (var a = 0; a < d; a++) {
    var x = floor(random(9))
    var y = floor(random(9))
    problem[y][x] = 0
  }
  return {
    problem: problem,
    solution: solution
  }
}

function copySudoku(arr) {
  let copy = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      copy[r][c] = arr[r][c]
    }
  }
  return copy
}

function merge(a1, a2) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (a1[r][c] != 0) {
        a2[r][c] = a1[r][c]
      }
    }
  }
}
function solve(arr) {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (arr[y][x] == 0) {
        //ADAPTED TO GENERATE RANDOM SUDOKUS
        let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        nums = shuffle(nums)//p5 function!
        for (let n = 1; n < 10; n++) {
          let nn = nums.pop()
          if (screen == 3) nn = n
          if (possible(arr, y, x, nn)) {
            arr[y][x] = nn
            arrays.push(copySudoku(arr))

            if (solve(arr)) {
              return true
            } else {
              arr[y][x] = 0
              arrays.push(copySudoku(arr))
            }

          }
        }
        return false
      }
    }
  }
  return true
}

function solve2(arr) {

  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (arr[y][x] == 0) {

        for (let n = 1; n < 10; n++) {

          if (possible(arr, y, x, n)) {
            arr[y][x] = n
            arrays.push(copySudoku(arr))
            if (solve(arr)) {
              return true
            } else {
              arr[y][x] = 0
              arrays.push(copySudoku(arr))
            }
          }
        }
        return false
      }
    }
  }
  return true
}



function possible(arr, y, x, n) {
  for (let i = 0; i < 9; i++) {
    if (arr[y][i] == n || arr[i][x] == n) return false
  }
  var x0 = Math.floor(x / 3) * 3
  var y0 = Math.floor(y / 3) * 3

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (arr[y0 + i][x0 + j] == n) return false
    }
  }
  return true
}


