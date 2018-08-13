import React from 'react'
import ReactDOM from 'react-dom'
import Logo from './images/logo.svg'

import './app.sass'
import '../public/favicon.ico'

class App extends React.Component {
  state = {
    await: ''
  }

  setTime = () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 5000)
    })

  componentDidMount = async () => {
    await this.setTime()

    this.setState({
      await: 'with Async Await'
    })
  }

  render = () => {
    return (
      <React.Fragment>
        <img src={Logo} />
        <h1>It's work</h1>
        <p>{this.state.await}</p>
      </React.Fragment>
    )
  }
}

const element = document.getElementById('app')
ReactDOM.render(<App />, element)

if (module.hot) module.hot.accept()
