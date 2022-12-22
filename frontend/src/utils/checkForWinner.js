const checkForWinner = (squares) => {
  let winner;

  let combos = {
    across: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ],
    down: [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ],
    diagnol: [
      [0, 4, 8],
      [2, 4, 6],
    ],
  };

  for (let combo in combos) {
    combos[combo].forEach((pattern) => {
      if (
        squares[pattern[0]] === null ||
        squares[pattern[1]] === null ||
        squares[pattern[2]] === null
      ) {
        // do nothing
      } else if (
        squares[pattern[0]] === squares[pattern[1]] &&
        squares[pattern[1]] === squares[pattern[2]]
      ) {
        winner = squares[pattern[0]] === "x" ? "x" : "o";
      }
    });
  }

  return winner;
};

export default checkForWinner;
