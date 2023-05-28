import { useState } from 'react'

const Heading = ({text}) => (<h1> {text} </h1>)
const Button = ({handler, text}) => (<button onClick={handler}> {text} </button>)
const Statistic = ({rating, label, unit}) => (<p> {label}: {rating} {unit} </p>)
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)

  const getAvg = (good,bad,all) => (good-bad)/all
  const getPos = (good, all) => (good/all)
  const handleGood = () => {
    const newGood = good+1
    setGood(newGood)
    const newAll = newGood + neutral + bad
    setAll(newAll)
    const newAvg = getAvg(newGood,bad,newAll)
    setAvg(newAvg)
    const newPos = getPos(newGood, newAll)
    setPos(newPos)
  }
  const handleNeutral = () => {
    const newNeutral = neutral+1
    setNeutral(newNeutral)
    const newAll = newNeutral + bad + good
    setAll(newAll)
    const newAvg = getAvg(good,bad,newAll)
    setAvg(newAvg)
    const newPos = getPos(good, newAll)
    setPos(newPos)
  }
  const handleBad = () => {
    const newBad = bad+1
    setBad(newBad)
    const newAll = newBad + neutral + good
    setAll(newAll)
    const newAvg = getAvg(good,newBad,newAll)
    setAvg(newAvg)
    const newPos = getPos(good, newAll)
    setPos(newPos)
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
      <Statistic label="All" rating={all} />
      <Statistic label="Average" rating={avg} />
      <Statistic label="Positive" rating={pos*100} unit="%" />
    </div>
  )
}

export default App