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
    {parts.map(element => {
        console.log("test");
        return <Part part={element} key={element.name} />
    })}
  </div>

}
const Part = ({part}) => {
  return <p>
    {part.name} {part.exercises}
  </p>
}

const Course = ({course}) => {
    return <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>

}

export default Course
