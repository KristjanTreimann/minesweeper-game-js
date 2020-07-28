for (let i = 0; i < squares.length; i++) {
  let total = 0
  const isLeftEdge = i % width === 0 // divides with 10
  const isRightEdge = i === width - 1 // ends with 9
  if (squares[i].classList.contains('.valid')) {
    if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++
    if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++
    squares[i].setAttribute('data', total)
    console.log(squares[i])
  }
}
