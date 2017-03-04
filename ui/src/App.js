import React from 'react'
import styled from 'styled-components'
import { compose, withState, lifecycle } from 'recompose'

let api = `http://localhost:3002`
let id = `35001a001447343432313031`

let Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FC412F;
  color: white;
`

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
  <Wrapper>
    <h1>current resistor value: {value}</h1>
  </Wrapper>
))

export default App
