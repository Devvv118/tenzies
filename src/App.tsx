import { useEffect, useState } from "react"
import Die from "./Die"

export default function App() {

  const [newDice,setNewDice] = useState([{id:0,value:0,freeze:0}])
  const [frozen,setFrozen] = useState(0)
  const [rolls,setRolls] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  if(newDice.length===1)
    createnewDice()

  useEffect(()=> {
    if(frozen===8)
      allFrozen()
  },[frozen])

  function newValue(value: number) {
    let oldVal=value
    value=Math.ceil(Math.random()*6)
    if(oldVal===value)
      value=newValue(value)
    return value
  }

  function createnewDice() {
    for(let i=0;i<8;i++) {
      setNewDice((die) => [
        ...die,
        {
          id: i+1,
          value: Math.ceil(Math.random()*6),
          freeze: 0
        }
      ])   
    }
    //removing 0th ele
    setNewDice(oldDice => {
      const newArray = [...oldDice];
      newArray.shift();
      return newArray;
    })
  }

  function toggle(id: number,prevFreeze: number) {
    prevFreeze?setFrozen(x=>x-1):setFrozen(x=>x+1)
    setNewDice(dice => {
      return dice.map(die=> {
        if (die.id===id) {
          return {
            ...die,
            freeze: prevFreeze?0:1
          }
        }
        return die
      })
    })
    
  }  

  function rollDice() {    
    setNewDice(dice => {
      return dice.map(die=> {
        if (die.freeze===0) {
          return {
            ...die,
            value: newValue(die.value),
          }
        }
        return die
      })
    })
    setRolls((rolls)=>rolls+1)
  }

  function allFrozen() {
    setGameOver(true)
    for(let i=0;i<7;i++) {
      console.log(newDice[i].value)
      if(newDice[i].value!==newDice[i+1].value)
        setGameOver(false)
    }
  }
 
  function restartGame() {
    setNewDice([{id:0,value:0,freeze:0}])
    setFrozen(0)
    setRolls(0)
    if(gameOver===true)
      setGameOver(false)  
  }

  const dice = newDice.map((x: any)=> <Die key={x.id} id={x.id} value={x.value} freeze={x.freeze} toggle={toggle}/>)
 
  return(
    <main>
      <h1>Tenzies</h1>      
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <h3 className="stats--rolls">Rolls: {rolls}</h3>
      <div className="dice">{dice}</div>      
      <button onClick={gameOver?restartGame:rollDice}>{gameOver?<b>Play Again</b>:<b>Roll Dice</b>}</button>
    </main>
  )
}