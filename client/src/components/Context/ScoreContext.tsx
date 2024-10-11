import React, {useState, useContext, createContext, ReactNode} from 'react';
import { useUser } from "../Context/auth";



interface ScoreContextType {
  score: number;
  addPoints: (points: number) => void;
  resetScore: () => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined)


export const ScoreProvider = ( { children }: {children:ReactNode}):JSX.Element => {
  const { user } = useUser()
  const [score, setScore] = useState<number>(0);

  const addPoints = (points: number) => {
    setScore((prevScore) => prevScore + points)
  }

  const resetScore = ():void => {
    setScore(0)
  }

  return (
    <ScoreContext.Provider value={{ score, addPoints, resetScore }}>
      {children}
    </ScoreContext.Provider>
  )
}
  
export const useScore = () => {
  const context = useContext(ScoreContext)
  return context
}

