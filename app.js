// Load JS after DOM has loaded. Or put script tag end of body in html
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let width = 10
  let bombAmount = 20
  let squares = []

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
    }

    //add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0
      let neBomb = 0
      const isLeftEdge = i % width === 0 // divides with 10
      const isRightEdge = i === width - 1 // ends with 9
      if (squares[i].classList.contains('valid')) {
        // not 0 && not on left edge && square left from my square contains bomb -> add 1 to total
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++
        /* squares[i].setAttribute('leftBomb', total)
        console.log(squares[i]) */
        // if north east contains a bomb -> e.g (self[18])(bomb[9])
        if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) neBomb++
        /* squares[i].setAttribute('northEastBomb', neBomb)
		console.log(squares[i]) */
      }
    }
  }
  createBoard()
})
