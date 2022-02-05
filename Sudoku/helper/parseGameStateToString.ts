export const parseGameStateToString = (arrayGameState: number[][]) => {
  return arrayGameState
    .map((row) => row.join("") + "\n")
    .join("")
    .slice(0, -1);
};
