import React, {useState, useEffect} from 'react';
import './css/app.css';
import Die from './components/Die';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti'

function App() {

  const generateNewDie = () =>{return {value:Math.floor(Math.random()*(6))+1, isHeld:false, id:nanoid()}};
  const [tenzies, setTenzies] = useState(false);

  const allNewDice = () =>{
    const array= [];
    for(let i=1; i<=10; i++){
      array.unshift(generateNewDie());
    }
    return array;
  }

  const [dices, setDice] = useState(allNewDice());

  useEffect(()=>{
    const allHeld = (dices.every(die => {
      return (die.isHeld);
    }))
    const firstValue = dices[0].value;
    const allSameValue = dices.every((die) => die.value === firstValue);
    if(allHeld && allSameValue){
      setTenzies(true);
    }
  }, [dices])


  const holdDice = (id)=> {
    setDice((pre) => {
      return pre.map(dice => {return dice.id === id ? {...dice, isHeld:!dice.isHeld} : dice})
    })
  }


  const rollNewDice = () => {
    setDice(pre => {
      return pre.map(dice => {
        return dice.isHeld? dice : generateNewDie();
    })
  })}

  const reset = () => {
    setTenzies(false);
    setDice(allNewDice());
  }

  const diceElements = dices.map(item => {return <Die hold={() => holdDice(item.id)} isHeld={item.isHeld} key={item.id} value={item.value}/>})
  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">{tenzies? "Congratz ! You won the game." : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button onClick={tenzies? reset : rollNewDice} className='roll-btn'>{tenzies? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
