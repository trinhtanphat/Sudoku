import { parseGameStateToString } from "./parseGameStateToString";
import { boardArray, boardString } from "../../_global";
it("Can parse 2D array to string board", () => {
  const receivedResult = parseGameStateToString(boardArray);
  expect(receivedResult).toBe(boardString);
});
