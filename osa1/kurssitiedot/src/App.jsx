const Header = ({course}) => (
    <h1>{course}</h1>
)

const Total = ({parts}) => {
  console.log(parts)
  const amount = parts.reduce((accum, current) => accum + current.exercises, 0)
  return <p>Number of exercises {amount}</p>
}

const Content = ({ parts }) => {
  return <div>
    <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} />
  </div>

}
const Part = ({part}) => {
  return <p>
    {part.name} {part.exercises}
  </p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const parts = [part1, part2, part3]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
