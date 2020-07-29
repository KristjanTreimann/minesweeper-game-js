// Load JS after DOM has loaded. Or put script tag end of body in html
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let width = 10
  let bombAmount = 20
  let squares = []
  let numbers = []

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

      square.addEventListener('click', function () {
        console.log(square)
      })
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

        // 1 DOWN contains a bomb
        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++

        // 1 DOWN-LEFT
        if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++

        // 1 DOWN-RIGHT
        if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++

        // 1 DOWN
        if (i < 89 && squares[i + width].classList.contains('bomb')) total++
      }
    }
  }
  createBoard()
})
