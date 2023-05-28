import { useState } from 'react'

const Heading = ({text}) => (<h1> {text} </h1>)
const Button = ({handler, text}) => (<button onClick={handler}> {text} </button>)
const Statistic = ({rating, label}) => (<p> {label}: {rating} </p>)
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newGood = good+1
    setGood(newGood)
  }
  const handleNeutral = () => {
    const newNeutral = neutral+1
    setNeutral(newNeutral)
  }
  const handleBad = () => {
    const newBad = bad+1
    setBad(newBad)
  }

  return (
    <div>
      <Heading text="Give Feedback" />
      <Button handler={handleGood} text="Good" />
      <Button handler={handleNeutral} text="Neutral" />
      <Button handler={handleBad} text="Bad" />
      <Heading text="Statistics" />
      <Statistic label="Good" rating={good} />
      <Statistic label="Neutral" rating={neutral} />
      <Statistic label="Bad" rating={bad} />
    </div>
  )
}

export default App