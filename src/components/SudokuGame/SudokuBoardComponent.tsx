import React, { useEffect, useState } from "react";
import { SudokuBoard } from "../../Sudoku/SudokuBoard/SudokuBoard";
import { SudokuCell } from "./SudokuCell";
import { BoardProvider } from "./BoardContext/BoardContext";
import { getAffectedCells, isCellInList } from "../../Sudoku/helper";
import fireworks from "fireworks";
const randColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};
const fireEndingFireworks = (_number: number) => {
  let range = (n: number) => [...new Array(n)];
  range(_number).map(() =>
    fireworks({
      x: Math.random() * (window.innerWidth / 1.2),
      y: Math.random() * (window.innerHeight / 1.2),
      colors: [randColor(), randColor(), randColor(), randColor(), randColor()],
      bubbleSizeMinimum: 30,
    })
  );
};

type SudokuBoardProps = {
  board: SudokuBoard;
};

export const SudokuBoardComponent = ({ board }: SudokuBoardProps) => {
  const [gameBoardArray, setGameBoardArray] = useState(
    board.getArrayGameState()
  );
  const [selectedCell, setSelectedCell] = useState({
    posX: -1,
    posY: -1,
    value: 0,
  });
  const [affectedCellsList, setAffectedCellsList] = useState(
    getAffectedCells(selectedCell.posX, selectedCell.posY)
  );
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    if (selectedCell.posX !== -1) {
      const { posX: testPosX, posY: testPosY } = selectedCell;
      const affectedCellsList = getAffectedCells(testPosX, testPosY);
      setAffectedCellsList(affectedCellsList);
    }
  }, [selectedCell]);

  useEffect(() => {
    if (board.isPuzzleSolved()) {
      setGameFinished(true);
      setInterval(() => fireEndingFireworks(10), 500);
    }
  }, [gameBoardArray]);

  return (
    <BoardProvider
      value={{
        boardArray: gameBoardArray,
        setBoardArray: setGameBoardArray,
        board: board,
      }}
    >
      {gameFinished && (
        <div
          style={{ position: "absolute" }}
          className="alert alert-success"
          role="alert"
        >
          You won the game!
          <button
            style={{ fontSize: "16px", width: "100px", marginLeft: "30px" }}
            onClick={() => {
              location.reload();
            }}
          >
            Restart
          </button>
        </div>
      )}

      <table style={{ borderSpacing: "0px" }}>
        {gameBoardArray.map((row, posX) => {
          return (
            <React.Fragment>
              <tr key={posX}>
                {row.map((col, posY) => (
                  <SudokuCell
                    isAffectedByPosition={isCellInList(
                      posX,
                      posY,
                      affectedCellsList
                    )}
                    isAffectedByValue={
                      selectedCell.value === col && selectedCell.value !== 0
                    }
                    selectedCell={selectedCell}
                    setSelectedCell={setSelectedCell}
                    key={posY}
                    posX={posX}
                    posY={posY}
                    value={col}
                  />
                ))}
              </tr>
            </React.Fragment>
          );
        })}
      </table>
    </BoardProvider>
  );
};
