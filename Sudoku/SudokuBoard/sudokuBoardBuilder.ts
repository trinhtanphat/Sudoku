import { SudokuBoard } from "./SudokuBoard";
import { isCellValid, parseGameStateToArray } from "../helper";
//function that make sure input is valid

export function sudokuBoardBuilder(initialBoard: string = "") {
  //empty input make empty board
  if (initialBoard === "") {
    return new SudokuBoard("");
  }

  //regex validation for input board string
  const boardPattern = new RegExp("([0-9]{9}\n){8}[0-9]{9}");
  if (!boardPattern.test(initialBoard)) return new SudokuBoard("");

  //sudoku validation for input board string
  const tempArrayBoard = parseGameStateToArray(initialBoard);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!isCellValid(i, j, tempArrayBoard)) return new SudokuBoard("");
    }
  }
  return new SudokuBoard(initialBoard);
}
