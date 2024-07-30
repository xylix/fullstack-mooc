const Header = ({course}) => (
    <h1>{course}</h1>
)

const Total = ({parts}) => {
  console.log(parts)
  const amount = parts.reduce((accum, current) => accum + current, 0)
  return <p>Number of exercises {amount}</p>
}

const Content = ({ parts, exercise_counts }) => {
  return <div>
    <Part name={parts[0]} exercises={exercise_counts[0]} />
    <Part name={parts[1]} exercises={exercise_counts[1]} />
    <Part name={parts[2]} exercises={exercise_counts[2]} />
  </div>

}
const Part = ({name, exercises}) => {
  return <p>
    {name} {exercises}
  </p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = [part1, part2, part3]
  const exercise_counts = [exercises1, exercises2, exercises3]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercise_counts={exercise_counts} />
      <Total parts={exercise_counts} />
    </div>
  )
}

export default App
