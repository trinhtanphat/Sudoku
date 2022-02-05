export const getAffectedCells = (
  posX: number,
  posY: number
): [{ posX: number; posY: number }] => {
  const cornerLeftX = Math.floor(posX / 3) * 3;
  const cornerLeftY = Math.floor(posY / 3) * 3;
  const affectedCoordinates: [{ posX: number; posY: number }] = [
    { posX, posY },
  ];
  affectedCoordinates.pop();
  //3x3 areas
  for (let i = 0; i < 3; i++) {
    //update 1 col at a time
    affectedCoordinates.push({ posX: cornerLeftX, posY: cornerLeftY + i });
    affectedCoordinates.push({ posX: cornerLeftX + 1, posY: cornerLeftY + i });
    affectedCoordinates.push({ posX: cornerLeftX + 2, posY: cornerLeftY + i });
  }
  for (let i = 0; i < 9; i++) {
    //cols
    affectedCoordinates.push({ posX, posY: i });
    //rows
    affectedCoordinates.push({ posX: i, posY });
  }
  return affectedCoordinates;
};
