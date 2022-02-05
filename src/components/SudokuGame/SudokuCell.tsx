import React, { useEffect, useContext } from "react";
import { FaPencilAlt, FaEraser } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import { Media } from "react-breakpoints";
import { Planet } from "react-planet";
import { useState } from "react";
import BoardContext from "./BoardContext/BoardContext";
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
const fireFireworks = () => {
  let range = (n: number) => [...new Array(n)];
  range(6).map(() =>
    fireworks({
      x: Math.random() * (window.innerWidth / 1.5),
      y: Math.random() * (window.innerHeight / 1.5),
      colors: [randColor(), randColor(), randColor(), randColor(), randColor()],
    })
  );
};

type SudokuCellProps = {
  value: number;
  posX: number;
  posY: number;
  setSelectedCell: Function;
  selectedCell: { posX: number; posY: number; value: number };
  isAffectedByPosition: boolean;
  isAffectedByValue: boolean;
};

export const SudokuCell = ({
  selectedCell,
  setSelectedCell,
  value,
  posX,
  posY,
  isAffectedByPosition,
  isAffectedByValue,
}: SudokuCellProps) => {
  const { boardArray, setBoardArray, board } = useContext(BoardContext);
  const [doRenderOption, setDoRenderOption] = useState(false);
  const [isCorrectValue, setIsCorrectValue] = useState(
    board.getArraySolutionState()[posX][posY] === boardArray[posX][posY] &&
      board.getOriginalArray()[posX][posY] === 0
  );

  useEffect(() => {
    const result =
      board.getArraySolutionState()[posX][posY] === boardArray[posX][posY] &&
      board.getOriginalArray()[posX][posY] === 0;
    setIsCorrectValue(result);
  }, [boardArray, board.getArrayGameState()]);

  const isCellOriginal = board.getOriginalArray()[posX][posY] !== 0;
  const isSelected = selectedCell.posX === posX && selectedCell.posY === posY;
  const areaBorderColor = "#219F94";
  const cellSize = "53px";
  const defaultCellColor = "#FBF8F1";
  const numberColor = "black";
  const cellBorder = "#041562";

  const getCellColor = () => {
    if (isSelected) return "#aed892";
    if (isAffectedByValue) return "#C1DEAE";
    if (isAffectedByPosition) return "#F2F5C8";
    return defaultCellColor;
  };

  //Circular option

  const SatelitesOption = ({ option }: { option: number }) => {
    const shownValue =
      option === 10 ? <FaPencilAlt /> : option === 0 ? <FaEraser /> : option;
    return (
      <div
        onClick={() => {
          switch (option) {
            case 0:
              board.eraseCell(posX, posY);
              break;
            default:
              board.fillCell(posX, posY, option);
              if (board.getArraySolutionState()[posX][posY] === option) {
                fireFireworks();
              }
              break;
          }
          const tempBoard = JSON.parse(
            JSON.stringify(board.getArrayGameState())
          );
          setDoRenderOption(false);
          setBoardArray(tempBoard);
        }}
        style={{
          color: "black",
          height: 50,
          width: 50,
          borderRadius: "50%",
          border: "thin solid ",
        }}
        className="satelites"
      >
        {shownValue}
      </div>
    );
  };

  //Circular options
  const renderOptions = () => {
    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          setDoRenderOption(false);
        }}
      >
        <div style={{ position: "relative" }}>
          <Planet
            orbitRadius={80}
            hideOrbit
            centerContent={
              <div
                className="pointer"
                style={{
                  zIndex: -1,
                  width: cellSize,
                  height: cellSize,
                }}
              ></div>
            }
            open
          >
            <SatelitesOption option={1} />
            <SatelitesOption option={2} />
            <SatelitesOption option={3} />
            <SatelitesOption option={4} />
            <SatelitesOption option={5} />
            <SatelitesOption option={6} />
            <SatelitesOption option={7} />
            <SatelitesOption option={8} />
            <SatelitesOption option={9} />
            <SatelitesOption option={0} />
            {/* <SatelitesOption option={10} /> */}
          </Planet>
        </div>
      </OutsideClickHandler>
    );
  };

  //Render cell
  return (
    <Media>
      {({
        breakpoints,
        currentBreakpoint,
      }: {
        breakpoints: [];
        currentBreakpoint: number;
      }) => {
        const breakpoint = breakpoints[currentBreakpoint];
        return (
          <td
            onDoubleClick={(event) => {
              !isCellOriginal && setDoRenderOption(!doRenderOption);
            }}
            onClick={() => {
              if (isCorrectValue) {
                let range = (n: number) => [...new Array(n)];
                range(6).map(() =>
                  fireworks({
                    x: Math.random() * (window.innerWidth / 1.5),
                    y: Math.random() * (window.innerHeight / 1.5),
                    colors: [
                      randColor(),
                      randColor(),
                      randColor(),
                      randColor(),
                      randColor(),
                    ],
                  })
                );
              }
              setSelectedCell({ posX, posY, value });
            }}
            onMouseDown={(e) => {
              if (e.detail > 1) {
                e.preventDefault();
              }
            }}
            className={"cell " + `${!isCellOriginal && "pointer"}`}
            style={{
              color: isCellOriginal
                ? numberColor
                : isCorrectValue
                ? "blue"
                : "red",
              backgroundColor: getCellColor(),
              display: "inline-block",
              width: breakpoint < 400 ? "40px" : cellSize,
              height: breakpoint < 400 ? "40px" : cellSize,
              border: "thin solid " + cellBorder,
              borderBottom: `${posX === 8 && "thick solid " + areaBorderColor}`,
              borderTop: `${
                (posX === 0 || posX === 3 || posX === 6) &&
                "thick solid " + areaBorderColor
              }`,
              borderLeft: `${
                (posY === 0 || posY === 3) && "thick solid " + areaBorderColor
              }`,
              borderRight: `${
                (posY === 8 || posY === 5) && "thick solid " + areaBorderColor
              }`,
              textAlign: "center",
              fontSize: breakpoint < 400 ? "16px" : "22px",
              lineHeight: breakpoint < 400 ? "32px" : "50px",
            }}
          >
            {!isCellOriginal && doRenderOption && renderOptions()}
            <span>{value !== 0 && value}</span>
          </td>
        );
      }}
    </Media>
  );
};
