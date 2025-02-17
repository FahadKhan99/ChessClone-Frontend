import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "../assets/messages";

const Game = () => {
  const socket = useSocket();
  const [chess, _] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [isStarted, setIsStarted] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  // white or black pieces
  const [isBlack, setIsBlack] = useState(false);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setIsBlack(message.payload.color === "black"); // to flip the board
          console.log("Game initialized");
          setIsWaiting(false); // from the other end
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move made");
          break;
        case GAME_OVER:
          console.log("Game over");
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;

  const handleClick = () => {
    //  start or wait for game
    socket.send(
      JSON.stringify({
        type: INIT_GAME,
      })
    );
    setIsStarted(true);
    setIsWaiting(true);
  };

  return (
    <div className="flex justify-center">
      <div className="pt-8 w-auto">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-4 flex justify-center ">
            <ChessBoard
              board={board}
              socket={socket}
              setBoard={setBoard}
              chess={chess}
              isBlack={isBlack}
            />
          </div>

          <div className="flex justify-center rounded-xl col-span-2 bg-slate-800 w-full">
            {!isStarted ? (
              <div className="pt-8">
                <Button onClick={handleClick}>Play</Button>
              </div>
            ) : isWaiting ? (
              <p className="font-bold text-2xl text-slate-300 mt-8 ">
                Waiting for Other Player...
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
