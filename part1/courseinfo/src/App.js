const Header = (props) => {
  return (
    <h1> {props.course} </h1>
  )
}

const Content = (props) => {
  return (
    <p> {props.part} {props.exercises}</p>
  )
}

const Total = (props) => {
  return (
    <p> Number of exercises {props.total} </p>
  )
}

const App = () => {
  const course = "Half Stack Application Development"
  const part1 = "Fundamentals of React"
  const content = [
    {part: "Fundamentals of React", exercises: 10},
    {part: "Using Props to Pass Data", exercises: 7},
    {part: "State of a Component", exercises: 14}
  ]
  const total = content[0].exercises + content[1].exercises + content[2].exercises

  return (
    <div>
      <Header course={course} />
      <Content part={content[0].part} exercises={content[0].exercises} />
      <Content part={content[1].part} exercises={content[1].exercises} />
      <Content part={content[2].part} exercises={content[2].exercises} />
      <Total total={total} />
    </div>
  )
}

export default App