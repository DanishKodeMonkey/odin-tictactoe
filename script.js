/* REMEMBER, keep the project in factories, no globals(or atleast only 1) allowed */
/* 
What components are required for the game?
A game board - somewhere to form the grid
    a 3 x 3 grid of squares
    
    (*)
    Added to own factory. Each cell now has methods and properties.
    each square should have a cell that can handle a player piece X or O

A game logic controller
    handle state of game (score?)
    handle player objects and their state? Seperate?
*/
// gameBoard handles the board state, creating the board and maintaining it.
const gameBoard = () => {
  // Game board settings
  const rows = 3
  const columns = 3
  const board = []
  // Establish game board (Rows and columns)
  // handle establishment of rows, update array.
  for (let i = 0; i < rows; i++) {
    board[i] = []
    //For each row, create a corresponding column, update each row in array with a cell.
    for (let j = 0; j < columns; j++) {
      board[i].push(cell())
    }
  }
  const getBoard = () => board
  //We now have a 3x3 grid gameboard.

  //A function to check if a cell is available, using its methods, if it is, add player token
  const placeCell = (cell) => {
    if (board[cell].getValue === "") {
      board[cell] = addToken
      return true
    } else return false
  }

  // Print the board with it's cells values, tempoary until UI is created.
  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    )
    console.log(boardWithCellValues)
  }

  return { getBoard, placeCell, printBoard }
}

// Cell will be representing the individual cells within the gameboard,
// And handling the players interactions with it (Get state of cell, add token to cell)
// Each cell will then be pushed to the gameboard array, giving each cell methods to call
function cell() {
  //Start value of cell
  let value = ""

  // Add state to cell
  const addToken = (player) => {
    value = player
  }
  // Get state of a cell
  const getValue = () => value

  return {
    addToken,
    getValue,
  }
}

function gameController(
  // Default name state of players
  playerOneName = "Player one",
  playerTwoName = "Player two"
) {
  // Invoke a new board, and all its methods
  const board = gameBoard()

  // Establish player tokens, assign to array.
  const players = [
    { name: playerOneName, token: "X" },
    { name: playerTwoName, token: "O" },
  ]

  // Initial active player, taken from array
  let activePlayer = players[0]

  const nextTurn = () => {
    // Determine next turn, if next player is player index 0, switch to 1, otherwise switch to 0
    activePlayer = activePlayer === players[0] ? players[1] : players[0]
  }
  // Short function to fetch current player
  const currentPlayer = () => currentPlayer

  // Print current state of board, and announce next player
  const printBoardRound = () => {
    board.printBoard()
    console.log(`${currentPlayer().name}'s turn`)
  }

  const playRound = (cell) => {
    console.log(`Placing ${currentPlayer().name}'s token.`)
    board.placeCell(cell, currentPlayer().token)

    nextTurn()
    printBoardRound()
  }
  printBoardRound()
  return { playRound, currentPlayer }
}

const game = gameController()
