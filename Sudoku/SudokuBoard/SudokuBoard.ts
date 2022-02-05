import { sudokuSolver } from "../SudokuSolver/sudokuSolver";
import {
  parseGameStateToArray,
  parseGameStateToString,
  isCellValid,
  randomNumbersGenerator,
} from "../helper";
export class SudokuBoard {
  //getter methods: 🥖
  //checker methods: 🏁
  //manipulate methods: 🧰
  //constructor / maker methods: 🏗️
  //props: 🏬

  originalArrayGameState: number[][] = [];
  actionHistory: string[] = []; //main timeline 🏬
  undoedHistory: string[] = []; //use for history mechanism 🏬
  stringGameState: string = ""; //game state in string form 🏬
  arrayGameState: number[][] = []; //game state in array form 🏬
  arraySolutionState: number[][] = []; //solution state in array form 🏬
  stringSolutionState: string = ""; //solution state in string form 🏬

  //initiate board 🏗️
  constructor(initialBoard: string) {
    //if no input board found, make an empty board
    if (initialBoard === "") {
      this.generateEmptyBoard();
    } else {
      //else update it according to input board
      this.stringGameState = initialBoard;
      this.arrayGameState = parseGameStateToArray(this.stringGameState);
      this.originalArrayGameState = parseGameStateToArray(this.stringGameState);
    }

    //parse string to array
    if (initialBoard !== "")
      //if it's not empty, solve it
      this.arraySolutionState = sudokuSolver(this.arrayGameState);
  }

  //display full board 🥖
  // renderBoard = () => {
  //   this.arraySolutionState.map((row) => {
  //     row.map((col) => process.stdout.write(col.toString()));
  //     console.log("");
  //   });
  // };

  //getter for history 🥖
  getActionHistory = () => {
    return this.actionHistory;
  };
  //getter for original game 🥖
  getOriginalArray = () => {
    return this.originalArrayGameState;
  };

  //getter for undoed history 🥖
  getUndoedHistory = () => {
    return this.undoedHistory;
  };

  //getter for array solution🥖
  getArraySolutionState = () => {
    return this.arraySolutionState;
  };
  //getter for string solution 🥖
  getStringSolutionState = () => {
    return this.stringSolutionState;
  };

  //getter for string game state 🥖
  getStringGameState = (): string => {
    return this.stringGameState;
  };
  //getter for array game state 🥖
  getArrayGameState = (): number[][] => {
    return this.arrayGameState;
  };
  //check if a cell is valid 🏁
  isCellValid = (posX: number, posY: number): boolean => {
    return isCellValid(posX, posY, this.arrayGameState);
  };

  //check if board is empty (full of 0's) 🏁
  isEmptyBoard = () => {
    const emptyBoardPattern = new RegExp("([0]{9}\n){8}[0]{9}");
    if (emptyBoardPattern.test(this.stringGameState)) {
      return true;
    } else {
      return false;
    }
  };

  //check if sudoku is solved 🏁
  isPuzzleSolved = () => {
    //iterate and check if every single cell valid
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (
          //if a single cell is invalid or empty, then it's not solved
          this.arrayGameState[row][col] === 0 ||
          !isCellValid(row, col, this.arrayGameState)
        )
          return false;
      }
    }
    return true;
  };
  //make empty board🏗️️
  generateEmptyBoard = () => {
    for (let i = 0; i < 9; i++) {
      if (i === 8) {
        //remove \n at last iteration
        this.stringGameState = this.stringGameState + "000000000";
        break;
      }
      this.stringGameState = this.stringGameState + "000000000\n";
    }
    this.arrayGameState = parseGameStateToArray(this.stringGameState);
    this.originalArrayGameState = parseGameStateToArray(this.stringGameState);
  };
  //generate a random board game based on difficulty 🏗️️
  generateRandomBoard = (difficulty: number = 0.6) => {
    this.resetGame(); //reset everything

    //deep clone array
    const tempSolutionArray = JSON.parse(JSON.stringify(this.arrayGameState));

    //1. Fill 3 diagonal 3x3 areas randomly
    for (let i = 0; i <= 6; i += 3) {
      const randomArray = randomNumbersGenerator();
      for (let colOffset = 0; colOffset < 3; colOffset++) {
        //make sure not getting undefined
        const num = randomArray.pop();
        const num2 = randomArray.pop();
        const num3 = randomArray.pop();
        if (num && num2 && num3) {
          //set 1 row at a time
          tempSolutionArray[i][i + colOffset] = num;
          tempSolutionArray[i + 1][i + colOffset] = num2;
          tempSolutionArray[i + 2][i + colOffset] = num3;
        }
      }
    }
    //2. Solve for the rest of the board and update to solution state
    this.arraySolutionState = sudokuSolver(tempSolutionArray);
    this.stringSolutionState = parseGameStateToString(this.arraySolutionState);

    //3. Remove based on difficulty
    const easiest = 38; //amount of shown cells in easiest mode
    const hardest = 20; //amount of shown cells in hardest mode
    const removeAmount =
      9 * 9 - (hardest - Math.floor(difficulty * (hardest - easiest))); //amount of cells to be removed

    //board after deleted cells randomly
    const tempUnsolvedPuzzle: number[][] = JSON.parse(
      JSON.stringify(this.arraySolutionState)
    );

    //remove the cells randomly
    for (let i = 0; i < removeAmount; i++) {
      const row = Math.floor(Math.random() * 9); //random number in [1-9]
      const col = Math.floor(Math.random() * 9);

      //delete once more if the same cell is deleted twice
      if (tempUnsolvedPuzzle[row][col] === 0) i--;
      tempUnsolvedPuzzle[row][col] = 0;
    }

    this.arrayGameState = tempUnsolvedPuzzle;
    this.stringGameState = parseGameStateToString(this.arrayGameState);
    this.originalArrayGameState = parseGameStateToArray(this.stringGameState);
  };
  //🧰 return action and postion based on input string
  parseHistoryMove = (stringAct: string) => {
    //2 number mean delete and its coordinates, 3 number mean fill value and its coordinates
    const pattern = new RegExp("[0-9][0-9][1-9]|[0-9][0-9]");
    if (!pattern.test(stringAct)) return null;
    //coordinates to number
    const posX = parseInt(stringAct[0]);
    const posY = parseInt(stringAct[1]);

    //value or not depend on if it's a fill or remove
    const value = stringAct.length === 3 ? parseInt(stringAct[2]) : null;
    return { posX, posY, value };
  };
  //🧰
  fillCell = (
    posX: number,
    posY: number,
    value: number,
    updateHistory = true
  ) => {
    //validate number
    if (value > 9 || value < 1) return;

    //move
    this.arrayGameState[posX][posY] = value;
    this.stringGameState = parseGameStateToString(this.arrayGameState);

    if (!updateHistory) return; //stopped if no need to update history

    //update history
    const actString = posX.toString() + posY.toString() + value.toString();
    if (this.undoedHistory.length === 0) {
      //if previous move is a fresh move (not undoed by other moves), update casually
      this.actionHistory.push(actString);
    } else {
      //in case previous move is undoed by other move, which need proper history update
      this.updateHistory(actString);
    }
  };

  //🧰
  updateHistory = (latestMove: string) => {
    //special case: only 1 move done
    if (this.actionHistory.length === 0 && this.undoedHistory.length === 1) {
      //get the only move coordinates
      const onlyMove = this.undoedHistory[0];
      const parsedHistory = this.parseHistoryMove(onlyMove);
      if (parsedHistory) {
        const { posX, posY } = parsedHistory;

        // the history has form [before undoed move, undo (erase) move, latest move ]
        const actString = posX.toString() + posY.toString();
        this.actionHistory = [onlyMove, actString, latestMove];

        //clean undoed history
        this.undoedHistory.pop();
        return;
      }
    }
    //normal case:
    //algorithm to append the undoed history to mainline when new move is made
    const latestHistoryMove = this.actionHistory[this.actionHistory.length - 1];
    const tempArray = JSON.parse(JSON.stringify(this.undoedHistory)); //deep copy 2 arrays
    const tempArray2 = JSON.parse(JSON.stringify(this.undoedHistory));

    tempArray.push(latestHistoryMove);
    tempArray.reverse();
    tempArray.pop();

    //the updated one has form [  reversed undoed list, undoed list ,latest item in mainline]
    // more specific explain [the ones before undos, the undoed ones, newest one which isn't undo ]
    this.actionHistory = [
      ...this.actionHistory.slice(0, this.actionHistory.length - 1),
      ...tempArray,
      ...tempArray2,
      latestHistoryMove,
    ];

    this.actionHistory.push(latestMove); //finally add the just made move
    this.undoedHistory.splice(0, this.undoedHistory.length); //delete undoed items
  };

  //🧰
  eraseCell = (posX: number, posY: number, updateHistory = true) => {
    //move
    this.arrayGameState[posX][posY] = 0;
    this.stringGameState = parseGameStateToString(this.arrayGameState);

    if (!updateHistory) return; //stop if no need to update history

    //update history
    const actString = posX.toString() + posY.toString();
    if (this.undoedHistory.length === 0) {
      //if previous move is a fresh move (not undoed by other moves), update casually
      this.actionHistory.push(actString);
    } else {
      //in case previous move is undoed by other move, which need proper history update
      this.updateHistory(actString);
    }
  };

  //🧰
  undo = () => {
    //if no history, do nothing
    if (this.actionHistory.length === 0) return;

    //special case: only 1 move made -> clear that move whatever
    if (this.actionHistory.length === 1) {
      //get move info
      const parsedHistory = this.parseHistoryMove(this.actionHistory[0]);

      //update history
      const undoedMove = this.actionHistory.pop();
      undoedMove && this.undoedHistory.push(undoedMove); //prevent null when popped

      if (parsedHistory) {
        const { posX, posY } = parsedHistory;
        //do the history action
        return this.eraseCell(posX, posY, false);
      }
    }

    //normal case: (at least 2 moves)
    //get previous move
    const prevMove = this.actionHistory[this.actionHistory.length - 2];

    //get move info
    const parsedHistory = this.parseHistoryMove(prevMove);
    if (parsedHistory === null) throw Error("invalid action in history");
    const { value, posX, posY } = parsedHistory;

    //update history
    const undoedMove = this.actionHistory.pop();
    undoedMove && this.undoedHistory.push(undoedMove); //prevent null when popped

    //do the history action
    if (value) return this.fillCell(posX, posY, value, false);
    return this.eraseCell(posX, posY);
  };

  //🧰
  forward = () => {
    //cant move forward if no undoed moves
    if (this.undoedHistory.length === 0) return;

    //get the most recent undoed move
    const mostRecentUndoed = this.undoedHistory.pop();
    const parsedHistory =
      mostRecentUndoed && this.parseHistoryMove(mostRecentUndoed);
    if (parsedHistory) {
      const { posX, posY, value } = parsedHistory;

      //reupdate history
      this.actionHistory.push(mostRecentUndoed);

      //do action
      if (value) return this.fillCell(posX, posY, value, false);
      return this.eraseCell(posX, posY, false);
    }
  };

  //🧰
  resetGame = () => {
    //reset everything
    this.stringGameState = "";
    this.stringSolutionState = "";
    //properly remove the same adress data for array
    this.arrayGameState.splice(0, this.arrayGameState.length);
    this.actionHistory.splice(0, this.actionHistory.length);
    this.undoedHistory.splice(0, this.undoedHistory.length);
    this.originalArrayGameState.splice(0, this.originalArrayGameState.length);
    this.arraySolutionState.splice(0, this.arraySolutionState.length);

    //make empty board
    this.generateEmptyBoard();
  };
}
