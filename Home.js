import React from 'react'
import { compose, withState, lifecycle } from 'recompose'
import ReactDOMServer from 'react-dom/server'


let Home = compose(
  withState(`state`, `setState`, { value: 0 }),
  lifecycle({
    componentDidMount() {
      setInterval(() => {
        console.log('>>>', thingy)
      }, 1000)
    },
  })
)(({
  state: { value },
}) => (
  <div>
    <h1>current resistor value: {value}</h1>
  </div>
))


export default
ReactDOMServer.renderToStaticMarkup(<Home />)
