import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./board.css";

export default function Row() {
  const [category, setCategory] = useState("");
  const [content, setContent] = useState([]);
  const [currentContent, setCurrentContent] = useState({})
  const [userAnswer, setUserAnswer] = useState("")
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8000/game/api/questions", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setContent(data);
          setCategory(data[0].category.name);
        } else {
          throw new Error("NO QUESTIONS");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getQuestions();
  }, []);

  const handleOpenModal = (oneQuest, oneAnswer) => {
    setShowModal(true);
    setCurrentContent({
      question: oneQuest,
      answer: oneAnswer  
    })
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentContent({})
    setUserAnswer("")
  }; 

  const userAnswerHandler = (event) => {
    setUserAnswer(event.target.value)
  }

  const compareAnswerHandler =  () => {
    if(userAnswer === currentContent.answer) {
      alert('Правильно')
    } else {alert('Неверно')}
  }

  return (
    <div className="rowContainer">
      <h5>{category}</h5>
      {content.map((oneContent) => (
          <button key={oneContent.id} className="questionBtn" onClick={() => handleOpenModal(oneContent.question, oneContent.answer)}>
            {oneContent.value}
          </button>
      ))}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form name="questionSet" onSubmit={compareAnswerHandler}>
              <p>{currentContent.question}</p>
              <input value={userAnswer} onChange={userAnswerHandler} type="text" placeholder="Ответ" />
              <button type="submit">Ответить</button>
            </form>
            <button onClick={handleCloseModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}
