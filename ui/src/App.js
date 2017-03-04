import React from 'react'
import { compose, withState, lifecycle } from 'recompose'

let api = `http://localhost:3002`
let id = `35001a001447343432313031`

let App = compose(
  withState(`state`, `setState`, { value: 0 }),
  lifecycle({
    componentDidMount() {
      setInterval(async () => {
        let value = await fetch(`${api}/value/${id}`).then(r => r.json())
        this.props.setState(() => ({ value }))
      }, 500)
    },
  })
)(({
  state: { value },
}) => (
  <div>
    <h1>current resistor value: {value}</h1>
  </div>
))

export default App
