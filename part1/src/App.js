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
  )
}

export default App