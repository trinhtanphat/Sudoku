import { sudokuBoardBuilder } from "..";
import {
  solvedBoardString,
  boardString,
  invalidBoardString,
} from "../../_global";
const emptyBoard = sudokuBoardBuilder();
const initializedBoard = sudokuBoardBuilder(boardString);

//checker : 🏁
//manipulate : 🧰
//maker : 🏗️

//🏗️
it("Can make empty board ", () => {
  const stringBoard = emptyBoard?.getStringGameState();

  expect(stringBoard).toBe(
    "000000000\n000000000\n000000000\n000000000\n000000000\n000000000\n000000000\n000000000\n000000000"
  );
  const arrayBoard = emptyBoard?.getArrayGameState();
  expect(arrayBoard).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

//🏗️
it("Can generate empty board if input is invalid", () => {
  const invalidBoard = sudokuBoardBuilder(invalidBoardString);
  expect(invalidBoard.isEmptyBoard()).toBe(true);
});

//🏗️
it("Can generate board according to input if input board valid", () => {
  expect(initializedBoard?.getStringGameState()).toBe(boardString);
  expect(initializedBoard.getArraySolutionState()[0].length).toBe(9);
  // expect(initializedBoard.getStringSolutionState()).toBe();
});

//🏗️
// it("Can generate solution according to input if input board valid", () => {}); //maker

//🏗️
it("Can make random board with solutions", () => {
  //string pattern
  const newBoard = sudokuBoardBuilder();
  newBoard.generateRandomBoard();
  expect(newBoard.getArrayGameState()[0].length).toBe(9);
  // expect(newBoard.getStringGameState()).toBe();
  expect(newBoard.getArraySolutionState()[0].length).toBe(9);
  // expect(newBoard.getStringSolutionState()).toBe("");
});

//🏁
it("Can check if board is empty", () => {
  expect(emptyBoard.isEmptyBoard()).toBe(true);
  expect(initializedBoard.isEmptyBoard()).toBe(false);
});

//🏁
it("Can check if the sudoku is solved", () => {
  const solvedBoard = sudokuBoardBuilder(solvedBoardString);
  expect(solvedBoard.isPuzzleSolved()).toBe(true);
  expect(initializedBoard.isPuzzleSolved()).toBe(false);
});

//🏁
// it("Can check if a cell is valid", () => { //after append features //checker
//   const invalidBoard = sudokuBoardBuilder(invalidBoardString);
//   expect(invalidBoard?.isCellValid(0, 1)).toBe(false); //row check
//   expect(invalidBoard?.isCellValid(3, 2)).toBe(false); //3x3 check
//   expect(invalidBoard?.isCellValid(3, 2)).toBe(false); //column check
//   expect(invalidBoard?.isCellValid(0, 0)).toBe(true); //empty cell check
//   expect(invalidBoard?.isCellValid(7, 0)).toBe(true); //valid check
// });

//🧰
//append to a specific cell
it("Can fill a cell", () => {
  const board = sudokuBoardBuilder(boardString);
  board.fillCell(0, 0, 1);
  const expected =
    "190000006\n" +
    "000960485\n" +
    "000581000\n" +
    "004000000\n" +
    "517200900\n" +
    "602000370\n" +
    "100804020\n" +
    "706000810\n" +
    "300090000";
  expect(board.getStringGameState()).toBe(expected);
});

//🧰
//erase a specific cell
it("Can erase a specific cell", () => {
  const board = sudokuBoardBuilder(boardString);
  board.eraseCell(0, 1);
  const expected =
    "000000006\n" +
    "000960485\n" +
    "000581000\n" +
    "004000000\n" +
    "517200900\n" +
    "602000370\n" +
    "100804020\n" +
    "706000810\n" +
    "300090000";
  expect(board.getStringGameState()).toBe(expected);
});

//🧰
//forward last move
it("Can forward moves", () => {
  const board = sudokuBoardBuilder(boardString);
  let expected =
    "190000006\n" +
    "000960485\n" +
    "000581000\n" +
    "004000000\n" +
    "517200900\n" +
    "602000370\n" +
    "100804020\n" +
    "706000810\n" +
    "300090000";

  board.fillCell(0, 0, 1);
  board.undo();
  board.forward();
  expect(board.getStringGameState()).toBe(expected);
  expect(board.getActionHistory()).toEqual(["001"]);
  expect(board.getUndoedHistory()).toEqual([]);
});

//🧰
//undo last moves
it("Can undo moves", () => {
  const board = sudokuBoardBuilder(boardString);
  let expected =
    "090000006\n" +
    "000960485\n" +
    "000581000\n" +
    "004000000\n" +
    "517200900\n" +
    "602000370\n" +
    "100804020\n" +
    "706000810\n" +
    "300090000";

  //move 3 times, undo once
  board.fillCell(0, 0, 1);
  board.fillCell(0, 0, 2);
  board.fillCell(0, 0, 3);
  board.undo();
  expected = "2" + expected.substring(1);
  expect(board.getStringGameState()).toBe(expected);
  expect(board.getActionHistory()).toEqual(["001", "002"]);
  expect(board.getUndoedHistory()).toEqual(["003"]);

  //move 3 times, undo once, move 1 more
  board.fillCell(0, 0, 4);
  expect(board.getActionHistory()).toEqual(["001", "002", "003", "002", "004"]);
  expect(board.getUndoedHistory()).toEqual([]);

  //move once, and undo once
  const moveOnceBoard = sudokuBoardBuilder(boardString);
  moveOnceBoard.fillCell(0, 0, 1);
  moveOnceBoard.undo();
  expected = "0" + expected.substring(1);
  expect(moveOnceBoard.getStringGameState()).toBe(expected);

  //move once undo one and move again
  moveOnceBoard.fillCell(0, 0, 1);
  expect(moveOnceBoard.getActionHistory()).toEqual(["001", "00", "001"]);
  expect(moveOnceBoard.getUndoedHistory()).toEqual([]);
});
