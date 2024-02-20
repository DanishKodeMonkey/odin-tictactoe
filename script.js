/* REMEMBER, keep the project in factories, no globals(or atleast only 1) allowed */
/* UI overhaaul

Object factory will handle display/DOM logic.
  Include function to render gameBoard array to the webpage. 
    divs created in for loops, then displayed in grid?
    (just filled with xs and os for now)

Write functions that allow players to mark a specific psot on the boardd by interacting
with appropriate dom elements.
  Create event listeners(click) and assign them to the divs.

Clean up interface to allow players to put in their names, include a button to start/restart game
  Start/restart button should create modus that accepts two inputs (player1 player2)
      Check if ongoing game is going on, if so, clear everything
    once submitted, invoke gameController(player1, player2)
    render gameBoard using DOM manipulation object
    change text of button to restart
  display that shows the current active player, or a winner if conditions are met.
*/

// gameBoard handles the board state, creating the board and maintaining it.
const gameBoard = () => {
  // Game board settings
  // size of square grid
  const size = 3
  //Form linear array, fill each index with a cell()
  const board = []
  for (let i = 0; i < size * size; i++) {
    board.push(cell())
  }
  //We now have a 3x3 grid gameboard.

  //A function to check if a cell is available, using its methods, if it is, add player token
  // The function is used by calling the location(index) of the array, and the players token
  const placeCell = (index, playerToken) => {
    const targetCell = board[index]
    if (targetCell.getValue() === "") {
      targetCell.addToken(playerToken)
      return true
    } else {
      return false
    }
  }

  // Print the board in a 3 x 3 grid, showing each grid index cells value. (for console part)
  const printBoard = () => {
    for (let i = 0; i < size; i++) {
      let rowValues = board
        .slice(i * size, (i + 1) * size)
        .map((cell) => cell.getValue())
      console.log(rowValues)
    }
  }
  const getBoard = () => board
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
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
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
      const valueA = currentBoard[a].getValue()
      const valueB = currentBoard[b].getValue()
      const valueC = currentBoard[c].getValue()

      // Check if all three values are the same, and not empty
      if (valueA !== "" && valueA === valueB && valueA == valueC) {
        return true
      }
    }
    // if no win state has been found. Keep going.
    return false
  }
  const playRound = (index) => {
    console.log(`${currentPlayer().name}'s turn`)

    //Console state round
    if (board.placeCell(index, currentPlayer().token)) {
      if (checkWinState()) {
        console.log(`${currentPlayer().name} wins!`)
        board.printBoard()
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

// Simulated game for testing
function game() {
  // Example usage:
  const ticTacToe = gameController("Alice", "Joe")

  // Simulate some rounds for testing
  ticTacToe.playRound(0)
  ticTacToe.playRound(4)
  ticTacToe.playRound(1)
  ticTacToe.playRound(3)
  ticTacToe.playRound(8)
  ticTacToe.playRound(5)
}

// Start the game
game()
