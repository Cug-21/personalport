import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import Modal from './Model';
import Leaderboard from './Leaderboard';
import './board.css';

const Board = ({ width, height, mines, difficulty }) => {
    const [isWinModalOpen, setWinModalOpen] = useState(false);
    const [isLoseModalOpen, setLoseModalOpen] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false); 
    const [highScores, setHighScores] = useState([]);
    const [currentRank, setCurrentRank] = useState(null);
    const [currentDifficulty, setCurrentDifficulty] = useState(difficulty);

    const handleCellRightClick = (x, y) => {
        if (isGameOver || board[x][y].isOpen) return;
    
        const newBoard = [...board];
        newBoard[x][y].isFlagged = !newBoard[x][y].isFlagged;
        setBoard(newBoard);
    };

    const checkWinningCondition = (board) => {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (!board[i][j].isMine && !board[i][j].isOpen) {
                    return false;
                }
            }
        }
        return true;
    };

    const logMinePositions = (boardToLog) => {
        let mineCount = 0;
        console.log('Positions of Mines:');
        console.log(boardToLog)
        for(let i = 0; i < boardToLog.length; i++) {
            for(let j = 0; j < boardToLog[i].length; j++) {
                if(boardToLog[i][j].isMine) {
                    console.log(`111Mine at position ${i},${j}`);
                    mineCount++;
                }
            }
        }
        console.log(`Total mines in board: ${mineCount}`);
    };

    // Step 1: Create an empty 2D board
    const createEmptyBoard = () => {
        return Array.from({ length: height }, () => 
            Array.from({ length: width }, () => ({
                isMine: false,
                isOpen: false,
                minesAround: 0,
                isFlagged: false,
            }))
        );
    };
    // Step 2: Randomly place mines on an existing board
    const placeMinesOnBoard = (boardToPlaceMines) => {
        let placedMines  = 0;
        console.log("Placing mines on board...");
        if (mines > width * height) {
            console.error('Board is too small for the number of mines.');
            return boardToPlaceMines;
        }
        
        const allPositions = [];
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                allPositions.push([i, j]);
            }
        }
        
        console.log('ALL POSITIONS', allPositions)

        const shuffledPositions = allPositions.slice().sort(() => Math.random() - 0.5);
        console.log('Shuffled pos', shuffledPositions)
        
        const minePositions = shuffledPositions.slice(0, mines); 

        console.log("Mine placed positions:", minePositions);

        for (let i = 0; i < minePositions.length; i++) {
            const [x, y] = minePositions[i];
            console.log(x, y)
            if (boardToPlaceMines[x][y]) {
                console.log('ty', boardToPlaceMines[x][y])
                boardToPlaceMines[x][y].isMine = true;
                console.log("Lets see this", boardToPlaceMines)
                placedMines++;
            } else {
                console.warn(`Invalid mine position: ${x}, ${y}`);
            }
        }
        console.log(`Number of mines actually placed: ${placedMines}`);
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
        if (isGameOver || board[x][y].isOpen) return;

        setIsGameStarted(true);
      
        if (board[x][y].isMine) {
            const newBoard = board.map(row => row.map(cell => {
                if (cell.isMine) {
                    cell.isOpen = true;
                }
                return cell;
            }));
            setBoard(newBoard);
            setLoseModalOpen(true);
            setIsGameOver(true);
            return;
        }
        const newBoard = revealCells(x, y);
        setBoard(newBoard);
    };

    useEffect(() => {
        if (checkWinningCondition(board)) {
            setWinModalOpen(true);
            setIsGameOver(true);
            const savedScores = JSON.parse(localStorage.getItem('highScores') || '[]');
            savedScores.push({ score: timer, name: '' }); // empty name initially
            savedScores.sort((a, b) => a.score - b.score);

            if (savedScores.length > 5) savedScores.pop();

            const rank = savedScores.findIndex(score => score.score === timer) + 1;

            localStorage.setItem(`highScores-${currentDifficulty}`, JSON.stringify(savedScores));
            setHighScores(savedScores);
            setCurrentRank(rank);
            }
    }, [board, checkWinningCondition, currentDifficulty, timer]);

    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem(`highScores-${currentDifficulty}`) || '[]');
        setHighScores(savedScores);
      }, [currentDifficulty]);

    const handleNameSubmit = (name) => {
        const newHighScores = highScores.map(score => {
          if (score.score === timer && !score.name) {
            return { ...score, name };
          }
          return score;
        });
        localStorage.setItem('highScores', JSON.stringify(newHighScores));
        setHighScores(newHighScores);
    };
            

    useEffect(() => {
        let myInterval;
        if (!isGameOver && isGameStarted) {
          myInterval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
          }, 1000);
        } else {
          clearInterval(myInterval);
        }
        return () => {
          clearInterval(myInterval);
        };
      }, [isGameOver, isGameStarted]); // Add isGameStarted to dependency array
    
      const startNewGame = () => {
        setBoard(generateBoard());
        setWinModalOpen(false);
        setLoseModalOpen(false);
        setIsGameOver(false);
        setIsGameStarted(false);
        setTimer(0);
      };
    


    return (
        <div className="board-container">
            {/* Timer */}
            <div className="timer">Time: {timer} seconds</div>
    
            {/* Board */}
            <div className="board">
                {board.map((row, i) => 
                    row.map((cell, j) => (
                        <Cell 
                            className="cell" // Applying the .cell style
                            key={`${i}-${j}`} 
                            {...cell}
                            onClick={() => handleCellClick(i, j)}
                            onRightClick={() => handleCellRightClick(i, j)}
                        />
                    ))
                )}
            </div>
    
            {/* Start Game Over Button */}
            <button className="start-button" onClick={startNewGame}>Start Game Over</button>
    
            {/* You Win Modal */}
            <Modal isOpen={isWinModalOpen} onClose={startNewGame}>
                <div className="modal-content">
                    <h1 className="modal-title">You Win!</h1>
                    <p>You are ranked {currentRank} on the leaderboard.</p>
                    <label>
                        Enter your name:
                        <input type="text" id="playerName" />
                    </label>
                    <button onClick={() => {
                        const name = document.getElementById('playerName').value;
                        handleNameSubmit(name);
                        startNewGame(); 
                    }}>Submit</button>
                </div>
            </Modal>
    
            {/* You Lose Modal */}
            <Modal isOpen={isLoseModalOpen} onClose={startNewGame}>
                <div className="modal-content">
                    <h1 className="modal-title">You Lose!</h1>
                </div>
            </Modal>
    
            {/* Leaderboard */}
            <Leaderboard difficulty={currentDifficulty} scores={highScores}/>
        </div>
        );
    };
    
    export default Board;