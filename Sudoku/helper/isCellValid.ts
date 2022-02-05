export const isCellValid = (
  posX: number,
  posY: number,
  board: number[][]
): boolean => {
  //check if the input position is valid
  if (posX > 8 || posX < 0 || posY > 8 || posY < 0) return false;
  const currentCellValue = board[posX][posY];

  //empty cell is always valid
  if (currentCellValue === 0) return true;

  //check the cell's row
  for (let column = 0; column < 9; column++) {
    const testTargetValue = board[posX][column];
    //if the selected cell has the same value as another cell in the same row
    //return false
    if (currentCellValue === testTargetValue && column !== posY) {
      return false;
    }
  }

  //check the cell's column
  for (let row = 0; row < 9; row++) {
    const testTargetValue = board[row][posY];
    //if the selected cell has the same value as another cell in the same row
    //return false
    if (currentCellValue === testTargetValue && row !== posX) {
      return false;
    }
  }

  //check the cell's 3x3 area around it
  let cornerX = Math.floor(posX / 3) * 3; //top left x coordinate of the 3x3
  let cornerY = Math.floor(posY / 3) * 3; //top left y coordinate of the 3x3

  //scan through the 3x3 areas begin from the corner coordinates
  for (let xOffset = 0; xOffset < 3; xOffset++) {
    for (let yOffset = 0; yOffset < 3; yOffset++) {
      const targetX = cornerX + xOffset;
      const targetY = cornerY + yOffset;
      const testTargetValue = board[targetX][targetY];
      if (
        currentCellValue === testTargetValue &&
        posX !== targetX &&
        posY !== targetY
      ) {
        return false;
      }
    }
  }
  return true;
};
