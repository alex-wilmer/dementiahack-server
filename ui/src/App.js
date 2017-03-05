import React from 'react'
import styled from 'styled-components'
import { compose, withState, lifecycle, withProps } from 'recompose'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'

import Icon from './Icon'

let api = `http://localhost:3002`
let deviceId = `35001a001447343432313031`
let userId = `12345`

let post = async (endpoint, body) => await fetch(`${api}/${endpoint}`, {
  method: `POST`,
  headers: { 'Content-Type': `application/json` },
  body: JSON.stringify(body),
}).then(r => r.json())

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
  withRouter,
  withProps(({ history: { push } }) => ({
    postId: async () => {
      let r = await post(`registerDevice`, {
        userId,
        deviceId,
      })

      if (r.success) push(`/configure`)
    },
  }))
)(({ postId }) => (
  <Col style={{ padding: `2rem` }}>
    <Text>Enter the device ID found on your Lassie.</Text>
    <Input type='text' onKeyDown={e => e.key === `Enter` && postId()} />
  </Col>
))

let Configure = compose(
  withRouter,
  withProps(({ history: { push } }) => ({
    setDeviceThreshold: async () => {
      let { value } = await fetch(`${api}/deviceStatus/${deviceId}`).then(r => r.json())

      await post(`registerDeviceThreshold`, {
        deviceId,
        threshold: value,
      })

      push(`/setAlarm`)
    },
  }))
)(({ setDeviceThreshold }) => (
  <Col style={{ padding: `2rem` }}>
    <Text>
      Please place the device on the LED of your applicance, then turn both the
      appliance and the device on. Then press OKAY.
    </Text>
    <Row style={{ marginTop: `15px` }}>
      <Button onClick={setDeviceThreshold}>OKAY</Button>
    </Row>
  </Col>
))

let SetAlarm = compose(
  withRouter,
  withProps(({ history: { push } }) => ({
    setAlarm: async value => {
      let r = await post(`registerDevice`, {
        userId,
        deviceId,
        time: +value,
      })

      if (r.success) push(`/status`)
    },
  }))
)(({ setAlarm }) => (
  <Col style={{ padding: `2rem` }}>
    <Text>
      <div>Great! Make sure to turn off your appliance.</div>
      <div>How many minutes before Lassie calls for help?</div>
    </Text>
    <Row style={{ marginTop: `15px` }}>
      <Input type='text' onKeyDown={e => e.key === `Enter` && setAlarm(e.target.value)} />
    </Row>
  </Col>
))

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
      <Route path='/setAlarm' component={SetAlarm} />
      <Route path='/status' component={() => <div>thingy</div>} />
    </Wrapper>
  </Router>
))

export default App
