import React from 'react'

import { useUser } from "../Context/auth";
import Row from './Row'

export default function Board() {
  const { user } = useUser(); 
  return (
    <>
    <div>{user.username} счет: 0</div>
    <Row/>
    </>
  )
}
