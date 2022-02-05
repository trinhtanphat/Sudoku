import { isCoordinatesEqual } from "./isCoordinatesEqual";

export const isCellInList = (
  posX: number,
  posY: number,
  corList: [{ posX: number; posY: number }]
) => {
  for (let i = 0; i < 27; i++) {
    if (corList[i].posX === posX && corList[i].posY === posY) return true;
  }
  return false;
};
