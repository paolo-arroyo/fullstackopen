<<<<<<< HEAD
import { useState } from "react"

const History = (props) => {
  if (props.data.length === 0) {
    return (
      <div>
        The app is used by pressing the buttons.
      </div>
    )
  }
  return (
    <div>
      History: {props.data.join(' ')}
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}> {text} </button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    let updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    let updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="Left" />
      <Button handleClick={handleRightClick} text="Right" />
      {right}
      <History data={allClicks}/>
      <p>Total: {total}</p>
    </div>
=======
import {useState} from 'react'

const Display = ({counter}) => <div> {counter} </div>
const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const App = () => {
  const [counter,setCounter] = useState(0)
  console.log("Rendering with counter value", counter)
  const plusOne = () => {
    console.log("Increase by 1; Value before: ", counter)
    setCounter(counter+1)
  }
  const minusOne = () => {
    console.log("Decrese by 1; Value before: ", counter)
    setCounter(counter-1)
  }
  const reset = () => {
    console.log("Reset to 0; Value before: ", counter)
    setCounter(0)
  }

  return (
    <>
      <Display counter={counter} />
      <Button handleClick={plusOne} text="+"/>
      <Button handleClick={minusOne} text="-"/>
      <Button handleClick={reset} text="Reset"/>
    </>
>>>>>>> c8c1229f5058a709c252bffff5652ffeba6600cd
  )
}

export default App