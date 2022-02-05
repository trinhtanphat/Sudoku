export function getEmptyPositions(board: number[][]) {
  const emptyPositions = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) emptyPositions.push([row, col]);
    }
  }
  return emptyPositions;
}
