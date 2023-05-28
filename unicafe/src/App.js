import { useState } from 'react'

const Heading = ({text}) => (<h1> {text} </h1>)
const Button = ({handler, text}) => (<button onClick={handler}> {text} </button>)
const Statistic = ({rating, label, unit}) => (
  <tr>
    <td> {label} </td>
    <td> {rating} {unit} </td>
  </tr>
)
const Statistics = ({data}) => {
  let all = data[3].rating
  if (all != 0) {
    return (
      <div>
        <Heading text="Statistics" />
        <table>
          <tbody>
            <Statistic label={data[0].label} rating={data[0].rating} unit={data[0].unit} />
            <Statistic label={data[1].label} rating={data[1].rating} unit={data[1].unit} />
            <Statistic label={data[2].label} rating={data[2].rating} unit={data[2].unit} />
            <Statistic label={data[3].label} rating={data[3].rating} unit={data[3].unit} />
            <Statistic label={data[4].label} rating={data[4].rating} unit={data[4].unit} />
            <Statistic label={data[5].label} rating={data[5].rating} unit={data[5].unit} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <Heading text="Statistics" />
        <p> No Feedback Given </p>
      </div>
    ) 
  }
}

//Just adding a comment so I can commit and push exercise 1.9; no changes necessary
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)

  const ratings=[
    {label: "Good", rating: good},
    {label: "Neutral", rating: neutral},
    {label: "Bad", rating: bad},
    {label: "All", rating: all},
    {label: "Average", rating: avg},
    {label: "Positive", rating: pos, unit: "%"}
  ]

  const getAvg = (good,bad,all) => ((good-bad)/all).toFixed(2)
  const getPos = (good, all) => (good/all*100).toFixed(2)
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
      <Statistics data={ratings} />
    </div>
  )
}

export default App