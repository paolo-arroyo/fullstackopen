import { useState } from 'react'

const Button = ({handler, text}) => (<button onClick={handler}> {text} </button>)
const Heading = ({text}) => (<h1> {text} </h1>)
const Top = ({votes, anecdotes}) => {
  const mostVoted = Math.max(...votes)
  const index = votes.indexOf(mostVoted)
  if (mostVoted === 0) {
    return (
      <div>
        <Heading text="Anecdote with Most Votes" />
        <p> No votes yet. </p>
      </div>
    )
  } else {
    return (
      <div>
        <Heading text="Anecdote with Most Votes" />
        {anecdotes[index]} <br />
        <b>Has {votes[index]} votes.</b>
      </div>
    )
  }
  
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const getAnecdote = (data) => {
    const newSelected = Math.floor(Math.random()*(data.length))
    setSelected(newSelected)
  }

  const voteSelected = (selected) => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Heading text="Anecdote of the Day" />
      {anecdotes[selected]} <br />
      <b>Has {votes[selected]} votes.</b>
      <div>
        <Button handler={() => voteSelected(selected)} text="Vote" />
        <Button handler={() => getAnecdote(anecdotes)} text="Next Anecdote →" />
      </div>
      <Top votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App