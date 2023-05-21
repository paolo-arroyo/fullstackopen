const Header = (props) => {
  return (
    <h1> {props.course} </h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].part} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].part} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].part} exercises={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p> Number of exercises {props.total} </p>
  )
}

const Part = (props) => {
  return (
    <p> {props.part} {props.exercises} </p>
  )
}
const App = () => {
  const course = "Half Stack Application Development"
  const content = [
    {part: "Fundamentals of React", exercises: 10},
    {part: "Using Props to Pass Data", exercises: 7},
    {part: "State of a Component", exercises: 14}
  ]
  const total = content[0].exercises + content[1].exercises + content[2].exercises

  return (
    <div>
      <Header course={course} />
      <Content parts={content} />
      <Total total={total} />
    </div>
  )
}

export default App