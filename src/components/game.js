import { useState, useMemo, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import CustomDialog from "./CustomDialog";



const pieceValues = {
  'p': -1, 'r': -7, 'n': -5, 'b': -5, 'q': -20, 'k': -100,
  'P': 1, 'R': 7, 'N': 5, 'B': 5, 'Q': 20, 'K': 100
};

function evaluateBoard(board) {
  let value = 0;
  board.forEach(row => {
    row.forEach(piece => {
      if (piece) {
        value += pieceValues[piece];
      }
    });
  });
  return value;
}

function quiescenceSearch(chessInstance, alpha, beta) {
  let standPat = evaluateBoard(chessInstance.board());
  if (standPat >= beta) {
      return beta;
  }
  if (alpha < standPat) {
      alpha = standPat;
  }

  const moves = chessInstance.moves({ verbose: true })
      .filter(move => chessInstance.get(move.from) && chessInstance.get(move.to) && chessInstance.get(move.from).color !== chessInstance.get(move.to).color); // filter only capturing moves

  for (let move of moves) {
      chessInstance.move(move);
      const score = -quiescenceSearch(chessInstance, -beta, -alpha);
      chessInstance.undo();

      if (score >= beta) {
          return beta;
      }
      if (score > alpha) {
          alpha = score;
      }
  }
  
  return alpha;
  
}

function minimax(chessInstance, depth, alpha, beta) {
  const currentPlayer = chessInstance.turn();
  

  if (depth === 0) {
    return quiescenceSearch(chessInstance, alpha, beta);
  }
  
  const moves = chessInstance.moves({ verbose: true });
  

  if (currentPlayer === 'b') {  // Black is the maximizing player in this setup
      let maxEval = -Infinity;
      for (let move of moves) {
          chessInstance.move(move);
          const evalValue = minimax(chessInstance, depth - 1, alpha, beta);

          // This is where you insert the logging code for maxEval:
          if (evalValue > maxEval) {
              
              maxEval = evalValue;
          }

          chessInstance.undo();
          alpha = Math.max(alpha, evalValue);
          if (beta <= alpha) {
              break;
          }
      }
      return maxEval;

  } else {  // White is the minimizing player in this setup
      let minEval = Infinity;
      for (let move of moves) {
          chessInstance.move(move);
          const evalValue = minimax(chessInstance, depth - 1, alpha, beta);

          // This is where you insert the logging code for minEval:
          if (evalValue < minEval) {
              
              minEval = evalValue;
          }

          chessInstance.undo();
          beta = Math.min(beta, evalValue);
          if (beta <= alpha) {
              break;
          }
      }
      return minEval;
  }
}

function getBestMove(chessInstance) {
  let bestValue = -Infinity; // Initialize to positive infinity for minimizing
  let bestMoveFound = null;

  const moves = chessInstance.moves({ verbose: true });
  console.log(moves)

  if (moves.length === 0) return null; // Ensure there are legal moves available

  for (let move of moves) {
    chessInstance.move(move);
    
    const boardValue = minimax(chessInstance, 5, -Infinity, Infinity); 
    console.log(boardValue)
    chessInstance.undo();
    if (boardValue > bestValue) {
      bestValue = boardValue;
      bestMoveFound = move;
  }
  }

  // If no best move is found using the minimax evaluation
  

  console.log(bestMoveFound);
  return bestMoveFound;
}

function Game({ players, room, orientation, cleanup }) {
  const chess = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(chess.fen());
  const [over, setOver] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const makeAMove = useCallback((move) => {
    try {
      const result = chess.move(move);
      setFen(chess.fen());
      console.log(chess);

      if (chess.isGameOver()) {
        if (chess.in_checkmate()) {
          setOver(`Checkmate! ${chess.turn() === "w" ? "black" : "white"} wins!`);
        } else if (chess.in_draw()) {
          setOver("Draw");
        } else {
          setOver("Game over");
        }
      }
      console.log(result)
      return result;
      
    } catch (e) {
      console.log(e)
      return null;
    }
  }, [chess]);

  const initiateAIBlackMove = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("AI thinking...");
      const bestMoveForBlack = getBestMove(chess);
      console.log("AI's best move:", bestMoveForBlack);
      if (bestMoveForBlack) {
        makeAMove({
          from: bestMoveForBlack.from,
          to: bestMoveForBlack.to,
          color: "b"
      });
      }
      setIsLoading(false);
    }, 500);
  }, [chess, makeAMove]);
  
  useEffect(() => {
    if (chess.turn() === "b") {
      initiateAIBlackMove();
    }
  }, [chess, initiateAIBlackMove]);
  
  function onDrop(sourceSquare, targetSquare) {
    // Only allow White pieces to be moved by the user
    if (chess.get(sourceSquare) && chess.get(sourceSquare).color === 'w') {
      const moveData = {
        from: sourceSquare,
        to: targetSquare,
        color: "w"
      };
  
      const move = makeAMove(moveData);
  
      // If it's now Black's turn, let the AI make its move
      if (move && chess.turn() === "b") {
        initiateAIBlackMove();
      }
  
      if (move === null) return false;
      return true;
    }
    return false; // reject if not a white piece
  }



  return (
    <>
      {isLoading && (
        <div className="loader"></div>
      )}
      <div className="Game">
        <Chessboard position={fen} onPieceDrop={onDrop} draggable={!isLoading} />
      </div>

      <CustomDialog
        open={Boolean(over)}
        title={over}
        contentText={over}
        handleContinue={() => {
          setOver("");
        }}
      />
    </>
  );
}

export default Game;