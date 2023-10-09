import React, { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

const Game = () => {
  return (
    <div className="game">
      Tic - Tac - Toe
      <Board />
    </div>
  );
};
const Board = () => {
  const initialValue=[
    null, null, null,
    null, null, null,
    null, null, null
  ]
  const [square, setSquare]=useState(initialValue);
  const [xIsNext, setXIsNext]=useState(true)
  
  const handleClickEvent=(i)=>{
    // alert(`Square ${i} clicked`)
    const newSquare=[...square]

    const winnerDeclared= Boolean(winnerOfGame(newSquare));
    const squareFilled= Boolean(newSquare[i]);
    if (squareFilled){
      return status= 'Game Over';
    }
    else if (winnerDeclared || squareFilled){
      return;
    }
    
    newSquare[i]= xIsNext ? 'X' : 'O';
    setSquare(newSquare);
    setXIsNext(!xIsNext);
  }

  const winnerOfGame=(square)=>{
    const lines=[[0,1,2], [3,4,5], [6,7,8],
                 [0,3,6], [1,4,7], [2,5,8],
                 [0,4,8], [2,4,6]]
    for(let line of lines){
      const [a, b, c] = line;
      if(square[a] && square[a]===square[b] && square[a]===square[c])
      {
        return square[a];
      }
    }
    return null;
  }
  const renderSquare=(i)=>{
    return(
      <Square value={square[i]} onSquareClick={()=>handleClickEvent(i)} />
    )
  }
  const winner= winnerOfGame(square);
  let status= winner  ? `Winner: ${winner}` : `Next-Player : ${xIsNext ? 'X' : 'O'}`;
  //const finalStatus= squareFilled ? `Game Over` : {status}
  return (
    <div className="board">
      <div className="status">{status}</div>
      <div className="pieces">
        {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
      </div>
      <div className="pieces">
      {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
      </div>
      <div className="pieces">
      {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
      </div>
    </div>
  );
};
const Square = (props) => {
  
  return (
  <button className="square" onClick={()=>{props.onSquareClick()}}>{props.value}</button>
  );
};
export default App;
