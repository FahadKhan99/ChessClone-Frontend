import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../assets/messages";

interface BoardProps {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];

  socket: WebSocket;
  chess: any;
  setBoard: any;
  isBlack: boolean;
}

const ChessBoard = ({
  board,
  socket,
  setBoard,
  chess,
  isBlack,
}: BoardProps) => {
  const [from, setFrom] = useState<null | Square>(null);

  const handleClick = (squareRepresentation: Square) => {
    if (!from) {
      setFrom(squareRepresentation);
    } else {
      socket.send(
        JSON.stringify({
          type: MOVE,
          payload: {
            move: {
              from,
              to: squareRepresentation,
            },
          },
        })
      );

      // update the board to see the updated board on the frontend
      chess.move({
        from,
        to: squareRepresentation,
      }); // make the move
      setBoard(chess.board()); // then update the board with the new state after the move

      setFrom(null);
    }
  };

  return (
    <div className={`flex flex-col ${isBlack ? "rotate-180" : ""}`}>
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;
              return (
                <div
                  key={j}
                  className={`w-32 h-32 ${
                    (i + j) % 2 === 0 ? "bg-slate-400" : "bg-slate-600"
                  }`}
                  onClick={() => handleClick(squareRepresentation)}
                >
                  <div className="flex justify-center h-full">
                    <div className="flex items-center text-3xl font-bold font-sans">
                      {square ? (
                        <img
                          className={`w-16 ${isBlack ? "rotate-180" : null}`}
                          src={`/peicesIcon/${
                            square?.color === "b"
                              ? square?.type
                              : `${square?.type?.toUpperCase()} Copy`
                          }.png `}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
