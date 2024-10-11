import Board from "../Board/Board";
import { useUser } from "../Context/auth";
import { useNavigate } from "react-router-dom"; 

export default function MainPage() {
  const { user } = useUser();
  const navigate = useNavigate(); 

  const handleStartGame = () => {
    if (user) {
      navigate("/game"); 
    } else {
      alert('Нужно зарегистрироваться, чтобы играть');
    }
  };

  return (
    <>
      {!user ? (<h1>No User</h1>) : <h1>Hello, {user?.username}</h1>}
      <button onClick={handleStartGame}>Начать Игру</button>
    </>
  );
}
