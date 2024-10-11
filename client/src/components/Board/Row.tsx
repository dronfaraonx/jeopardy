import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./board.css";
import { useScore } from "../Context/ScoreContext";
import { useUser } from "../Context/auth";

interface ContentItem {
  id: number;
  question: string;
  answer: string;
  value: string;
  category: {
    name: string;
  };
}

export default function Row() {
  const { user } = useUser();
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [currentContent, setCurrentContent] = useState<ContentItem | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  
  const { score, addPoints } = useScore();

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

  const handleOpenModal = (oneQuest: string, oneAnswer: string, oneValue: string) => {
    setShowModal(true);
    setCurrentContent({
      question: oneQuest,
      answer: oneAnswer,
      value: oneValue,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentContent(null);
    setUserAnswer("");
  };

  const userAnswerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const compareAnswerHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentContent && userAnswer.trim().toLowerCase() === currentContent.answer.trim().toLowerCase()) {
      addPoints(currentContent.value);
      alert("Верно");
    } else {
      alert("Неверно");
    }
  };

  return (
    <div className="rowContainer">
      {user ? (
        <>
          <h5 className="me-2">{category}</h5>
          {content.map((oneContent) => (
            <button
              key={oneContent.id}
              className="questionBtn me-2"
              onClick={() => handleOpenModal(oneContent.question, oneContent.answer, oneContent.value),
                style= {{background-color='red'}}
              }
            >
              {oneContent.value}
            </button>
          ))}
        </>
      ) : (
        <h3>Log in to play</h3>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form name="questionSet" onSubmit={compareAnswerHandler}>
              <p>{currentContent?.question}</p>
              <input
                value={userAnswer}
                onChange={userAnswerHandler}
                type="text"
                placeholder="Ответ"
              />
              <button type="submit">Ответить</button>
            </form>
            <button onClick={handleCloseModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}
