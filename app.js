// Load JS after DOM has loaded. Or put script tag end of body in html
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let width = 10
  let bombAmount = 20
  let flags = 0
  let squares = []
  let isGameOver = false

  //create Board
  function createBoard() {
    // get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width * width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombsArray) // concat() - two arrays joined together
    const shuffledArray = gameArray.sort((el) => Math.random(el) - 0.5)

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div') // create 100 squares
      square.setAttribute('id', i) // each square gets unique id
      square.classList.add(shuffledArray[i]) // add 'bomb' & 'valid' as classes to squares
      grid.appendChild(square)
      squares.push(square)

      //normal click
      // on click invoke function called click and into it pass square
      square.addEventListener('click', function (e) {
        click(square)
      })

      //left click adds / removes flags
      square.oncontextmenu = function (e) {
        e.preventDefault()
        addFlag(square)
      }
    }

    //add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0
      let test = 0
      const isLeftEdge = i % width === 0 // divides with 10
      const isRightEdge = i === width - 1 // ends with 9
      if (squares[i].classList.contains('valid')) {
        // 1-LEFT contains a bomb
        // not 0 && not on left edge && 1-left from my square contains bomb -> add 1 to total
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++

        // 1 UP-RIGHT contains a bomb
        if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++
        /* squares[i].setAttribute('total', total) 
        console.log(squares[i]) */

        // 1 UP contains a bomb
        if (i > 10 && squares[i - width].classList.contains('bomb')) total++

        // 1 UP-LEFT contains a bomb
        if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++

        // 1 RIGHT contains a bomb
        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++

        // 1 DOWN-LEFT
        if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++

        // 1 DOWN-RIGHT
        if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++

        // 1 DOWN
        if (i < 89 && squares[i + width].classList.contains('bomb')) total++

        squares[i].setAttribute('data', total)
      }
    }
  }
  createBoard()

  // add Flag with right click
  function addFlag(square) {
    if (isGameOver) return
    if (!square.classList.contains('checked') && flags < bombAmount) {
      // if square doesnt have flag already add a flag to it
      if (!square.classList.contains('flag')) {
        square.classList.add('flag')
        square.innerHTML = '🏁'
        flags++

        // Check for win if all flags placed correctly
        checkForWin()
      } else {
        // remove the flag if needed
        square.classList.remove('flag')
        square.innerHTML = ''
        flags--
      }
    }
  }

  //click on square functions
  function click(square) {
    let currentId = square.id
    if (isGameOver) return // game over go out of this function
    if (square.classList.contains('checked') || square.classList.contains('flag')) return

    if (square.classList.contains('bomb')) {
      gameOver(square)
    } else {
      let total = square.getAttribute('data')
      if (total != 0) {
        // if has bomb nearby, add class check if not 0 and checked
        square.classList.add('checked')
        square.innerHTML = total
        // break the cycle with return
        return
      }
      checkSquare(square, currentId)
      // not a bomb and doesnt have a bomb nearby
    }
    square.classList.add('checked')
  }

  // RECURSION
  //check  8 neighbouring squares once square is clicked
  function checkSquare(square, currentId) {
    // check if square is on the left or right edge
    const isLeftEdge = currentId % width === 0
    const isRightEdge = currentId % width === width - 1

    // delay check after clicking on square
    setTimeout(() => {
      // 1 LEFT
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1].id // id from the left square. parseInt to ensure number not a string
        const newSquare = document.getElementById(newId)
        // pass the square through the click function to check again
        click(newSquare)
      }

      // 1 UP-RIGHT
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 - width].id // id from the 1 UP-LEFT
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }

      // 1 UP
      if (currentId > 10) {
        const newId = squares[parseInt(currentId) - width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }

      // 1 UP-LEFT
      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 - width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }

      // 1 RIGHT
      if (currentId < 98 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }

      // 1 DOWN-LEFT
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 + width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }

      // 1 DOWN-RIGHT
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 + width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }

      // 1 DOWN
      if (currentId < 89) {
        const newId = squares[parseInt(currentId) + width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
    }, 10)
  }

  // Game over
  function gameOver(square) {
    console.log('Boom')
    // disable click when game over
    isGameOver = true

    // show ALL the bombs
    squares.forEach((square) => {
      if (square.classList.contains('bomb')) {
        square.innerHTML = '💣'
      }
    })
  }

  //check for win
  function checkForWin() {
    let matches = 0
    for (let i = 0; i < squares.length; i++) {
      // if all bombs are flagged
      if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
        matches++
      }
      if (matches === bombAmount) {
        console.log('WIN!')
        isGameOver = true
      }
    }
  }
})
