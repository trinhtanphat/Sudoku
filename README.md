# Sudoku with fireworks effects

- A sudoku game to play at Tết ( Lunar New Year :D )
- Included sudoku class written in typescript inside that manages the whole game, which can be reused in other apps (as long as it supports typescript, js)
- Link to site: https://khuongduy354.github.io/sudoku-fe/

# Install source code

1. git clone
2. yarn install

# How to play

1. Select Single Player
2. Choose difficulty -> Start game
3. Double click on squares to fill it

### Notes: click on correct filled cell trigger fireworks effects

# The SudokuBoard object

- Made with typescript
- path: src/Sudoku/SudokuBoard

## How to use:

1. Import the sudokuBoardBuilder function (in SudokuBoard folder, path above) to intialize game:

```typescript
const newBoard = sudokuBoardBuilder(); //initialize empty board
//or
const newBoard = sudokuBoardBuilder(intializedBoard); //take a string form to make board as wanted
newBoard.generateRandomBoard(); //reset and generate a new random board
newBoard.getArrayGameState(); //get game progress in 2D array form
```

2. Changing value:

```typescript
newBoard.fillCell(0, 0, 1); //fill in square (x,y,value)
newBoard.eraseCell(0, 0); //erase the square (x,y)

//Untested Feature: History
newBoard.undo(); //undo last move
newBoard.forward(); //undo the last undone move
```

3. Other methods:

```typescript
.getStringGameState() // get game progress in string form
.isEmptyBoard() // check if a board is empty (0 means empty )
.isPuzzleSolved() // check if current puzzle is solved (all squares filled and valid)
.getArraySolutionState() //get solution for current game
```

# Lacking features

- Taking notes
- History

# Algorithms

## Solver

- Take in a sudoku board -> Output a solved board (2D array)

1. Get a list of empty squares in board, iterate through it
2. For every square fill from 1-9, stop at lowest one that fit (obey sudoku rules)
3. Go to next square
4. If 1 to 9 doesnt fit any, go back to previous empty square, and raise it 1, go back to 2
5. If cant go back anymore (the first empty square cant be filled with any from 1-9), return null as it's unsolveable

## Generator

1. Randomly generate 3x3 areas (due to them not being affected to each other), from top left to bottom right, with a total of 27 squares filled
2. Solved the rest using the solver algorithm
3. Randomly remove squares based on difficulties
