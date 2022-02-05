import { isCellInList } from "./isCellInList";
import { getAffectedCells } from "./getAffectedCells";
it("can check if a cell is in list", () => {
  const receivedAffectedList = getAffectedCells(0, 0);
  isCellInList(5, 0, receivedAffectedList);
});
