import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../actions/actions'

export class App extends Component {
  render() {
    return (
      <div className="app">
        <form onSubmit={event => this.submit(this, event)}>
          <div><input name="phrase" placeholder="enter a phrase" /></div>
          <div><input type="submit" /></div>
        </form>
        <ul>
          {this.mapLanguages(this.sortLanguages(this.props.languages))}
        </ul>
      </div>
    )
  }

  sortLanguages(languages) {
      console.log("likelihood: ", this.props.likelihood)

      // let map = new Map()
      let map = {}

      if (!languages) return {}
      for (let i = 0; i < languages.length; i++) {
          const likelihood = this.formatPercentage(this.props.likelihood[languages[i]])
          // console.log('lang:', languages[i], ' has likelihood ', likelihood)
          if (likelihood) {
              console.log('adding likelihood of ',likelihood,' for ', languages[i])
              map[likelihood] = languages[i]
              // map.set(likelihood, languages[i])
          }
      }
      if (Object.keys(map).length > 0) {
          console.log('new unsorted map=', map)
          let keys = Object.keys(map)
          console.log('keys=', keys)
          let sortedMap = {}
          if (keys.size > 1) {
              console.log('sorting map')
              keys = data.sort(function(a,b) {
                  return a.foo - b.foo;
              }).map(function(elem, index, arr) {
                  return Object.keys(elem)[0];
              });
          }
          console.log('sorted map=', sortedMap)
      }
      // return sortedMap
      return languages
  }

  mapLanguages(languages) {
    return languages.map((language, key) => {
        const likelihood = this.formatPercentage(this.props.likelihood[language])
        return <li key={key} onClick={event => this.click(language, this)}>{language} {likelihood}</li>
    })
  }

  formatPercentage(number) {
      if (number === undefined) {
          return ''
      }
      return (number*100).toFixed(2) + ' %'
  }

  click(language, component) {
      this.props.dispatch(actions.getLikelihood(this.state.phrase,language))
  }

  submit(component, event) {
      event.preventDefault()
      const phrase = event.target.phrase.value
      component.setState({phrase: phrase});
      this.props.dispatch(actions.getLanguages(phrase))
  }
}

export default connect(store => store)(App)

