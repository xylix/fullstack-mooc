import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Content = (props) => {
  return <div>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
    <Part part={props.parts[2]} />
  </div>

}
const Part = (props) => {
  return <p>
    {props.part.name} {props.part.exercises}
  </p>
}

const Total = (props) => {
  const amount = props.parts.reduce((accum, current) => accum + current.exercises, 0)
  return <p>Number of exercises {amount}</p>
}
ReactDOM.render(<App />, document.getElementById('root'))
