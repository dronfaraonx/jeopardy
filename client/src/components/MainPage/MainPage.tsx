import Board from "../Board/Board";
import { useUser } from "../Context/auth";
import { useNavigate } from "react-router-dom"; 


// import Navbar from "./NavigationBar";

export default function MainPage() {
  const { user } = useUser();
    const navigate = useNavigate(); 
  const handleStartGame = () => {
    navigate("/game"); 
  };

  return (
    <>
      {!user ? (<h1>No User</h1>) : <h1>Hello, {user?.username}</h1>}
      <button onClick={handleStartGame}>Начать Игру</button>
    </>
  );
}
