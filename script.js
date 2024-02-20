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
  // The function is used by calling the location(row, col) of the array, and the players token
  const placeCell = (row, col, playerToken) => {
    const targetCell = board[row][col]
    if (targetCell.getValue() === "") {
      targetCell.addToken(playerToken)
      return true
    } else {
      return false
    }
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
  // pre-Determine win conditions, based on placements in board array
  var winConditions = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ]

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
  const currentPlayer = () => activePlayer

  // Print current state of board, and announce next player
  const printBoardRound = () => {
    board.printBoard()
    console.log(`${currentPlayer().name}'s turn`)
  }
  // Check if a win state has been reached
  const checkWinState = () => {
    // Get the current state of the board for check
    const currentBoard = board.getBoard()

    // Itterate through each win condition in the winConditions array
    for (const condition of winConditions) {
      // Dedstructure the condition from the array to get the 3 positions
      // assign these positions to a, b, and c
      const [a, b, c] = condition

      // Extract values from the cells in the board from positions a, b and c.
      // Thanks stackOverflow for the math <.<
      /*  
      The values calculated correspond to their position in a row/column state
      , for xample, if position a is 5, then Math.floor(5 / 3) results in 1(row index)
      and 5 % 3 results in 2 (column index)
      */
      const valueA = currentBoard[Math.floor(a / 3)][a % 3].getValue()
      const valueB = currentBoard[Math.floor(b / 3)][b % 3].getValue()
      const valueC = currentBoard[Math.floor(c / 3)][c % 3].getValue()

      // Check if all three values are the same, and not empty
      if (valueA !== "" && valueA === valueB && valueA == valueC) {
        return true
      }
    }
    // if no win state has been found. Keep going.
    return false
  }
  const playRound = (row, col) => {
    board.printBoard()
    console.log(`${currentPlayer().name}'s turn`)

    //Console only
    if (board.placeCell(row, col, currentPlayer().token)) {
      if (checkWinState()) {
        console.log(`${currentPlayer().name} wins!`)
      } else {
        nextTurn()
        printBoardRound()
      }
    } else {
      console.log("invalid move, cell occupied, try again")
    }
  }
  printBoardRound()
  return { playRound, currentPlayer }
}

//Simulated game for testing
function game() {
  // Example usage:
  const ticTacToe = gameController("Alice", "Joe")

  // Simulate some rounds for testing
  ticTacToe.playRound(0, 0)
  ticTacToe.playRound(1, 1)
  ticTacToe.playRound(0, 1)
  ticTacToe.playRound(1, 0)
  ticTacToe.playRound(2, 2)
  // Try placing in an already occupied cell
  ticTacToe.playRound(2, 0)
  ticTacToe.playRound(0, 2)
}

// Start the game
game()
