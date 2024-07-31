import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
  }
  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }

  const incrementBad = () => {
    setBad(bad+ 1)
  }


  return (
    <div>
      <h1> give feedback </h1>
      <div>

        <button onClick={incrementGood}> good</button>
        <button onClick={incrementNeutral}> neutral</button>
        <button onClick={incrementBad}> bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}
const Statistics = (props) => {
  const amount = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / amount
  const positive = (props.good / amount)
  if (amount <= 0) return <div>No feedback given</div>
    else return <>
      <h1> statistics </h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={props.good} />
          <StatisticsLine text="neutral" value={props.neutral} />
          <StatisticsLine text="bad" value={props.bad} />
          <StatisticsLine text="all" value={amount} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive * 100 + "%"} />
        </tbody>
      </table>
    </>
}

const StatisticsLine = (props) => {
  return <tr> 
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
