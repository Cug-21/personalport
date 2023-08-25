import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const Board = ({ width, height, mines }) => {
    const [data, setData] = useState([]);

    const logMinePositions = (boardToLog) => {
        console.log('Positions of Mines:');
        console.log(boardToLog)
        for(let i = 0; i < boardToLog.length; i++) {
            for(let j = 0; j < boardToLog[i].length; j++) {
                if(boardToLog[i][j].isMine) {
                    console.log(`111Mine at position ${i},${j}`);
                }
            }
        }
    };

    // Step 1: Create an empty 2D board
    const createEmptyBoard = () => {
        return Array(height).fill().map(() => Array(width).fill({
            isMine: false,
            isOpen: false,
            minesAround: 0,
        }));
    };

    // Step 2: Randomly place mines on an existing board
    const placeMinesOnBoard = (boardToPlaceMines) => {
        if (mines > width * height) {
            console.error('Board is too small for the number of mines.');
            return boardToPlaceMines;
        }

         
        // const shuffleArray = (array) => {
        //     for (let i = array.length - 1; i > 0; i--) {
        //         const j = Math.floor(Math.random() * (i + 1));
        //         [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        //     }
        //     console.log("test" ,array)
        //     return array;
        // };
        
        const allPositions = [];
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                allPositions.push([i, j]);
            }
        }
        
        console.log('ALL POSITIONS', allPositions)

        


        const shuffledPositions = allPositions.slice().sort(() => Math.random() - 0.5);
        console.log('', shuffledPositions)
        

        
        
        
        const minePositions = shuffledPositions.slice(0, mines); 
        

        console.log("Mine placed positions:", minePositions);

        for (let i = 0; i < minePositions.length; i++) {
            const [x, y] = minePositions[i];
            console.log(x, y)
            if (boardToPlaceMines[x][y]) {
                console.log('ty', boardToPlaceMines[x][y])
                boardToPlaceMines[x][y].isMine = true;
            } else {
                console.warn(`Invalid mine position: ${x}, ${y}`);
            }
        }
        
        console.log("boardToPlaceMines placed positions:", boardToPlaceMines);
        return boardToPlaceMines;
    };

    const generateBoard = () => {
        let board = createEmptyBoard();
        board = placeMinesOnBoard(board);

        // Calculate mines around each cell
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (board[i][j].isMine) continue;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        const newX = i + dx, newY = j + dy;
                        if (newX >= 0 && newX < height && newY >= 0 && newY < width && board[newX][newY].isMine) {
                            board[i][j].minesAround++;
                        }
                    }
                }
            }
        }
    
        logMinePositions(board);
        return board;
    };

    const [board, setBoard] = useState(generateBoard);

    const revealCells = (x, y) => {
        const newBoard = board.map(row => row.slice());

        const recursiveReveal = (x, y) => {
            if (x < 0 || x >= height || y < 0 || y >= width || newBoard[x][y].isOpen || newBoard[x][y].isMine) return;

            newBoard[x][y].isOpen = true;
            if (newBoard[x][y].minesAround === 0) {
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        recursiveReveal(x + dx, y + dy);
                    }
                }
            }
        };

        recursiveReveal(x, y);
        return newBoard;
    };

    const handleCellClick = (x, y) => {
        if (board[x][y].isOpen) return;

        if (board[x][y].isMine) {
            alert("Boom! Game Over.");
            setBoard(generateBoard());
            return;
        }

        const newBoard = revealCells(x, y);
        setBoard(newBoard);
    };

    useEffect(() => {
        console.log('Board re-rendered');
    }, [board]);

    return (
        <div className="board">
            {board.map((row, i) => 
                row.map((cell, j) => (
                    <Cell 
                        key={`${i}-${j}`} 
                        {...cell}
                        onClick={() => handleCellClick(i, j)}
                    />
                ))
            )}
        </div>
    );
};

export default Board;