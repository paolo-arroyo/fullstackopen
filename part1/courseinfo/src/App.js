const Header = (props) => {
  return (
    <h1> {props.course} </h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1.name} exercises={props.part1.exercises} />
      <Part part={props.part2.name} exercises={props.part2.exercises} />
      <Part part={props.part3.name} exercises={props.part3.exercises} />
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
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10
  }
  const part2 = {
    name: "Using Props to Pass Data",
    exercises: 7
  }
  const part3 = {
    name: "State of a Component",
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App