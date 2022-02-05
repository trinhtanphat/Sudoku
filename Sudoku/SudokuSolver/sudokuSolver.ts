import { isCellValid, getEmptyPositions } from "../helper";
export function sudokuSolver(inputBoard: number[][]): number[][] {
  //get deep copy of input
  inputBoard = JSON.parse(JSON.stringify(inputBoard));

  //get all emptyPos
  const emptyPos = getEmptyPositions(inputBoard);
  if (emptyPos.length === 0) return inputBoard; //return the board if it's full

  let i = 0;
  while (i < emptyPos.length) {
    //get empty cell
    const row = emptyPos[i][0];
    const col = emptyPos[i][1];
    let foundCell = false; //marker to know if empty cell is found and filled
    let value = 1; //value to be filled

    // //this only for cases where the new cell is failed to solve and return to old cell
    const targetValue = inputBoard[row][col];
    if (targetValue !== 0) {
      value = targetValue + 1;
    }

    //try to fill value from [1-9]
    while (value <= 9) {
      inputBoard[row][col] = value;
      if (isCellValid(row, col, inputBoard)) {
        //if one valid, proceed to next empty cell
        i++;
        foundCell = true;
        break;
      } else {
        inputBoard[row][col] = 0;
        value++;
      }
    }

    //erase & go to previous filled cell, if new cell cant be filled
    if (!foundCell) {
      inputBoard[row][col] = 0;
      i--;
    }
  }
  return inputBoard;
}
