const Header = ({ course }) => <h1>{course}</h1>
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
    <b>Total of {parts.reduce((sum,part) => sum + part.exercises, 0 )} exercises </b>
  </>

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course