import React from 'react'
import styled from 'styled-components'
import { compose, withState, lifecycle } from 'recompose'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'

import Icon from './Icon'

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

let Title = styled.span`
  font-family: 'Pacifico', cursive;
  font-size: 50px;
`

let Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

let Row = styled.div`
  display: flex;
  align-items: center;
`

let Input = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  margin-top: 3rem;
  font-size: 24px;
  color: white;
  padding: 4px;
  outline: none;
`

let Text = styled.span`
  font-size: 24px;
`

let Button = styled.button`
  color: white;
  padding: 6px;
  font-size: 18px;
  border-radius: 8px;
  background-color: transparent;
  border: 2px solid white;
  outline: none;
`

let Splash = () => (
  <Link to='/new'>
    <Col>
      <Icon />
      <Title>Lassie</Title>
    </Col>
  </Link>
)

let New = compose(
  withRouter
)(({ history: { push } }) => (
  <Col style={{ padding: `2rem` }}>
    <Text>Enter the device ID found on your Lassie.</Text>
    <Input type='text' onKeyDown={e => e.key === `Enter` && push(`/configure`)} />
  </Col>
))

let Configure = () => (
  <Col>
    <Text>Is your appliance turned on now?</Text>
    <Row style={{ marginTop: `15px` }}>
      <Button>YES</Button>
      <Button style={{ marginLeft: `15px` }}>NO</Button>
    </Row>
  </Col>
)

let App = compose(
  withState(`state`, `setState`, { value: 0 }),
  lifecycle({
    componentDidMount() {
      // setInterval(async () => {
        // let value = await fetch(`${api}/value/${id}`).then(r => r.json())
        // this.props.setState(() => ({ value }))
      // }, 500)
    },
  })
)(({
  state: { value },
}) => (
  <Router>
    <Wrapper>
      <Route exact path='/' component={Splash} />
      <Route path='/new' component={New} />
      <Route path='/configure' component={Configure} />
    </Wrapper>
  </Router>
))

export default App
