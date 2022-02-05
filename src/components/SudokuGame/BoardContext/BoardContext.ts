import React from "react";
import { SudokuBoard } from "../../../Sudoku/SudokuBoard/SudokuBoard";
import { sudokuBoardBuilder } from "../../../Sudoku";
import { Dispatch, SetStateAction /* and others */ } from "react";

type BoardContextType = {
  boardArray: number[][];
  setBoardArray: Dispatch<SetStateAction<number[][]>>;
  board: SudokuBoard;
};

const BoardContextDefault: BoardContextType = {
  boardArray: [],
  setBoardArray: () => {},
  board: sudokuBoardBuilder(),
};

const BoardContext = React.createContext(BoardContextDefault);
export const BoardProvider = BoardContext.Provider;
export const BoardConsumer = BoardContext.Consumer;
export default BoardContext;
