import { useState } from "react";

const initialBoardState = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const winningCombinations = [
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
];

export default function GameBoard({
  currentPlayer,
  currentPlayerName,
  onUpdatePlayerDetails,
}) {
  const [boardState, setBoardState] = useState(initialBoardState);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleCellClick = (rowIndex, cellIndex) => {
    if (gameOver || boardState[rowIndex][cellIndex]) return;

    // Update board
    const newBoard = [...boardState.map((row) => [...row])];
    newBoard[rowIndex][cellIndex] = currentPlayer;
    setBoardState(newBoard);

    // Check for win or draw
    const result = checkGameStatus(newBoard);
    if (result.winner) {
      setWinner(currentPlayerName);
      setGameOver(true);
    } else if (result.isDraw) {
      setGameOver(true);
    } else {
      onUpdatePlayerDetails(); // Switch player only if game continues
    }
  };

  const checkGameStatus = (board) => {
    // Flatten board for easier indexing
    const flatBoard = board.flat();
    console.log("flatBoard", flatBoard);

    // const winningCombinations = [
    //     // Rows
    //     [0, 1, 2], [3, 4, 5], [6, 7, 8],
    //     // Columns
    //     [0, 3, 6], [1, 4, 7], [2, 5, 8],
    //     // Diagonals
    //     [0, 4, 8], [2, 4, 6]
    //   ];

    // Check for winner
    for (const [a, b, c] of winningCombinations) {
      console.log("a,b,c", a, b, c);
      console.log(
        "flatBoard[a], flatBoard[b], flatBoard[c]",
        flatBoard[a],
        flatBoard[b],
        flatBoard[c]
      );
      if (
        flatBoard[a] &&
        flatBoard[a] === flatBoard[b] &&
        flatBoard[b] === flatBoard[c]
      ) {
        return { winner: flatBoard[a], isDraw: false };
      }
    }

    // Check for draw
    const isDraw = flatBoard.every((cell) => cell !== null);
    return { winner: null, isDraw };
  };

  const resetGame = () => {
    setBoardState(initialBoardState);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <>
      {gameOver && (
        <div>
          {winner ? <p>Winner: {winner}</p> : <p>Draw!</p>}
          <button onClick={resetGame}>Reset</button>
        </div>
      )}
      <ol id='game-board'>
        {boardState.map((rowArray, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {rowArray.map((playerSymbol, cellIndex) => (
                <li key={cellIndex}>
                  <button
                    disabled={gameOver || playerSymbol}
                    onClick={() => {
                      handleCellClick(rowIndex, cellIndex);
                      onUpdatePlayerDetails();
                    }}>
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
