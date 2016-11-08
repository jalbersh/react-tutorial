import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../actions/actions'

export class App extends Component {
  render() {
    return (
      <div className="app">
        <form onSubmit={event => this.submit(event)}>
          <div><input name="phrase" placeholder="enter a phrase" /></div>
          <div><input type="submit" /></div>
        </form>
        <ul>
          {this.mapLanguages(this.props.languages)}
        </ul>
      </div>
    )
  }

  mapLanguages(languages) {
    return languages.map((language, key) => <li key={key}>{language}</li>)
  }

  submit(event) {
    event.preventDefault()
    const phrase = event.target.phrase.value
    
  }
}

export default connect(store => store)(App)
