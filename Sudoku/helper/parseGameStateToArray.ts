export const parseGameStateToArray = (stringBoard: string): number[][] => {
  //split into array of sudoku rows
  const splittedRows = stringBoard.split("\n");
  //in case string ends with \n, remove the last empty string "" after splitted
  if (splittedRows[splittedRows.length - 1] === "") splittedRows.pop();

  //for each string, format it into a nested array of numbers
  // result is a 2 dimensional array, with rows and columns
  const arrayGameState = splittedRows.map((row) => {
    let tempArray = [];
    for (const char of row) {
      tempArray.push(parseInt(char));
    }
    return tempArray;
  });
  return arrayGameState;
};
