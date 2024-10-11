import React, { createContext } from 'react'

import { useUser } from "../Context/auth";
import Row from './Row'
import { useScore } from '../Context/ScoreContext';

const scoreContext = createContext()

export default function Board() {
  const { user } = useUser(); 
  const {score} = useScore();
  return (
    <>
    <div>{user?.username} счет: {score}</div>
    <Row/>
    </>
  )
}
