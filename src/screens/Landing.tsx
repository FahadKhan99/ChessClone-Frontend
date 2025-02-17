import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/game");
  };
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-center">
            <img src="chessImg2.jpeg" alt="ChessBoard" className="max-w-96" />
          </div>

          <div className="pt-16 flex-col justify-center mt-10">
            <div className="flex justify-center text-center ">
              <h1 className="font-bold text-white text-4xl ">
                Play Chess Online at the #2 Site!
              </h1>
            </div>

            <div className="flex justify-center mt-5">
              <Button onClick={handleClick}>Play Game</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
