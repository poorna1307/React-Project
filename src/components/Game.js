import React, { useEffect, useState } from "react";
import { calculateWinner } from "../Helper";
import {useForm} from 'react-hook-form';
import {useSelector,useDispatch} from 'react-redux';
import Board from "./Board";
import { addPlayHistory } from "../slices/userSlice";
import axios from "axios";

function Game(){
  let checking=true;
  const dispatch=useDispatch();
  const [playerDetails,setPalyerDetails]=useState({})
const {register,handleSubmit,formState:{errors}}=useForm()
const onFormSubmit=(PData)=>{
  setPalyerDetails(PData)
}
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";
  let {userObj}= useSelector((state)=>state.userData)
  useEffect(()=>{
    if(winner!==null){
    let Details={...playerDetails,won:winner}
    dispatch(addPlayHistory(Details));
    let user=userObj.username;
    axios.put('/user-api/update-user',{user,Details})
    .then(response=>{
      console.log(response)
     })
    .catch(error=>{
      console.log(error)
    })
    }
  },[winner])

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const restartGame=()=>{
    checking=false;
    setHistory([Array(9).fill(null)])
    setStepNumber(0)
    setXisNext(true)
  }

  return (
    <>
    <div className="game"> 
      <h1>React Tic Tac Toe - With Hooks</h1>
      <form onSubmit={handleSubmit(onFormSubmit)} className="m-3">
        <div className="mb-3">
          <input type="text" placeholder="Player-1" className="form-control" {...register("player1",{required:true})} />
        </div>
        <div className="mb-3">
          <input type="text" placeholder="Player-2" className="form-control" {...register("player2",{required:true})}/>
        </div>
        <div className="text-center">
        <button type="submit" className="btn btn-info mx-auto">Start</button>
        </div>
      </form>
      <Board squares={history[stepNumber]} onClick={handleClick}/>
      <div className="info-wrapper">
        <div className="mt-1">
          <button onClick={restartGame}>Restart</button>
        </div>
        <h3>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
      </div>
      </div>
    </>
  );
};

export default Game;