type Coordinate = {
  posX: number;
  posY: number;
};

export const isCoordinatesEqual = (cor1: Coordinate, cor2: Coordinate) => {
  if (cor1.posX === cor2.posX && cor1.posY === cor2.posY) return true;
  return false;
};
