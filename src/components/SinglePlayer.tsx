import { SudokuBoardComponent } from "./SudokuGame/SudokuBoardComponent";
import { sudokuBoardBuilder } from "../Sudoku";
import React, { useState } from "react";

export const SinglePlayer = () => {
  const [doStartGame, setDoStartGame] = useState(false);
  const [tough, setTough] = useState(0.7);
  const [board, setBoard] = useState(sudokuBoardBuilder());
  const backgroundColor = "#e2737e";

  const renderDifficultyOption = () => {
    return (
      <React.Fragment>
        Difficult{" "}
        <input
          style={{ border: "none", maxWidth: "500px", margin: "0 30px" }}
          type="range"
          className="form-range"
          min="0"
          max="1"
          step="0.1"
          defaultValue={tough}
          onChange={(e) => setTough(parseInt(e.target.value))}
        ></input>{" "}
        Easy
        <button
          style={{ marginLeft: "30px" }}
          onClick={() => {
            board.generateRandomBoard(tough);
            setBoard(board);
            setDoStartGame(true);
          }}
        >
          Start Game
        </button>
      </React.Fragment>
    );
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
        backgroundImage: "linear-gradient(315deg, #3f0d12 0%, #e2737e 0%)",
      }}
    >
      {!doStartGame && renderDifficultyOption()}
      {doStartGame && <SudokuBoardComponent board={board} />}
    </div>
  );
};
